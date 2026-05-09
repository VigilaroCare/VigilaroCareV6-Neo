const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '..', 'screens');
const localesDir = path.join(__dirname, '..', 'locales');

// Get all files
function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            getFiles(path.join(dir, file), fileList);
        } else if (file.endsWith('.js') && !file.match(/Radar|MicroBlog|Microblog|BoasVindas/)) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const allFiles = getFiles(screensDir);

let generatedKeys = {};
let filesModified = 0;

function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
}

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has useTranslation
    if (content.includes('useTranslation')) return;

    let modified = false;

    // Pattern to match <H1>Text</H1>, <H2>Text</H2>, <H3>Text</H3>, <Text style={styles.headerTitle}>Text</Text>
    // but only if Text is plain text (doesn't contain '{')
    const regexps = [
        /<(H[123])[^>]*>([^<{]+)<\/\1>/g,
        /<Text[^>]*style=\{styles\.headerTitle\}[^>]*>([^<{]+)<\/Text>/g
    ];

    let matchesFound = [];

    regexps.forEach(regex => {
        let match;
        // Need to reset regex index because we are doing multiple execs
        const matches = [...content.matchAll(regex)];
        matches.forEach(m => {
            const originalTag = m[0];
            const textToTranslate = m[2] ? m[2].trim() : m[1].trim(); // m[2] is for H1, m[1] is for Text
            
            if (textToTranslate.length > 2 && !textToTranslate.includes('{') && !textToTranslate.includes('}')) {
                const key = toCamelCase(textToTranslate);
                generatedKeys[key] = textToTranslate;
                
                // Replace the text inside the tag
                // If it's the H1/H2/H3 case, m[2] is the text. If Text case, m[1] is the text
                const textIndex = originalTag.indexOf(textToTranslate);
                if (textIndex !== -1) {
                    const newTag = originalTag.substring(0, textIndex) + `{t('headersFirst.${key}', '${textToTranslate.replace(/'/g, "\\'")}')}` + originalTag.substring(textIndex + textToTranslate.length);
                    content = content.replace(originalTag, newTag);
                    matchesFound.push(textToTranslate);
                    modified = true;
                }
            }
        });
    });

    if (modified) {
        // Inject import
        if (!content.includes('react-i18next')) {
            content = content.replace(/import React[^;]*;/, "$&\nimport { useTranslation } from 'react-i18next';");
            // fallback if React import not found at top
            if (!content.includes('react-i18next')) {
                content = `import { useTranslation } from 'react-i18next';\n` + content;
            }
        }

        // Inject hook
        const compRegex = /(export default function [a-zA-Z0-9_]+\s*\([^)]*\)\s*{)/;
        if (compRegex.test(content)) {
            content = content.replace(compRegex, "$1\n    const { t } = useTranslation('common');");
            fs.writeFileSync(filePath, content, 'utf8');
            filesModified++;
            console.log(`Updated ${path.basename(filePath)} with keys: ${matchesFound.join(', ')}`);
        } else {
            console.log(`Failed to inject hook in ${path.basename(filePath)}`);
        }
    }
});

console.log(`\nModified ${filesModified} files.`);
console.log(`\nGenerated Keys for locales/pt-BR/common.json (headersFirst):`);
console.log(JSON.stringify(generatedKeys, null, 2));

// Save to a temp file for next step
fs.writeFileSync(path.join(__dirname, 'generated_keys.json'), JSON.stringify(generatedKeys, null, 2));
