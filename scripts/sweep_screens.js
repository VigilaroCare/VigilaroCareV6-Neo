const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, '..', 'screens');
const localesDir = path.join(__dirname, '..', 'locales');

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
    
    // Skip if already processed properly (has useTranslation and no obvious hardcoded portuguese text left)
    // Actually we will scan regardless, and only inject useTranslation if we modify something.

    let modified = false;

    // Pattern to match any standard text component containing typical text
    // <Text ...>Some Text</Text>
    // <Body ...>Some Text</Body>
    // <Small ...>Some Text</Small>
    // <Caption ...>Some Text</Caption>
    // <H1 ...>Some Text</H1> (H2, H3)
    // The text shouldn't contain `{` or `}`.
    const regexps = [
        /<(Text|Body|Small|Caption|H[123])[^>]*>([^<{}]+)<\/\1>/g
    ];

    let matchesFound = [];

    regexps.forEach(regex => {
        const matches = [...content.matchAll(regex)];
        matches.forEach(m => {
            const originalTag = m[0];
            const textToTranslate = m[2].trim();
            
            // Heuristic to ignore empty spaces, numbers, or very short punctuation strings
            if (textToTranslate.length > 2 && !/^[0-9\W]+$/.test(textToTranslate) && !textToTranslate.includes('t(')) {
                let key = toCamelCase(textToTranslate);
                if (key.length > 40) key = key.substring(0, 40); // Cap key length
                if (!key) key = "str" + Math.floor(Math.random()*10000);
                
                generatedKeys[key] = textToTranslate;
                
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
            if (!content.includes('react-i18next')) {
                content = `import { useTranslation } from 'react-i18next';\n` + content;
            }
        }

        // Inject hook
        if (!content.includes('const { t } = useTranslation')) {
            const compRegex = /(export default function [a-zA-Z0-9_]+\s*\([^)]*\)\s*{)/;
            if (compRegex.test(content)) {
                content = content.replace(compRegex, "$1\n    const { t } = useTranslation('common');");
            } else {
                // Try arrow function: export const Component = () => {
                const arrowRegex = /(export const [a-zA-Z0-9_]+\s*=\s*\([^)]*\)\s*=>\s*{)/;
                if (arrowRegex.test(content)) {
                    content = content.replace(arrowRegex, "$1\n    const { t } = useTranslation('common');");
                }
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        filesModified++;
        console.log(`Updated ${path.basename(filePath)} with keys: ${matchesFound.length}`);
    }
});

console.log(`\nModified ${filesModified} files.`);

// Update JSON files
const languages = ['pt-BR', 'pt-PT', 'en', 'es'];
languages.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    if (!data.headersFirst) {
        data.headersFirst = {};
    }
    
    for (const key in generatedKeys) {
        if (!data.headersFirst[key]) {
            data.headersFirst[key] = generatedKeys[key];
        }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
});

console.log('Locales updated successfully!');
