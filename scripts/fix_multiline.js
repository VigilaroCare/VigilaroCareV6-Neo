const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            getFiles(path.join(dir, file), fileList);
        } else if (file.endsWith('.js')) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const allFiles = getFiles(path.join(__dirname, '..', 'screens'));
let fixedFiles = 0;

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to find t('key', 'string with newlines')
    // It looks for t( '...', ' ... \n ... ' )
    // We use a regex that matches the start of the string, any characters including newlines, up to the closing quote.
    // However, JS regex for multiline matching is easier with replace using a callback.
    
    let modified = false;
    
    // Simple regex: t\('([^']+)',\s*'([^']*?\n[^']*?)'\)
    const regex = /t\('([^']+)',\s*'([\s\S]*?)'\)/g;
    
    content = content.replace(regex, (match, key, text) => {
        if (text.includes('\n')) {
            modified = true;
            console.log(`Fixing multiline string in ${path.basename(filePath)}`);
            // Escape any existing backticks and unescape single quotes if needed
            const newText = text.replace(/`/g, '\\`').replace(/\\'/g, "'");
            return `t('${key}', \`${newText}\`)`;
        }
        return match;
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedFiles++;
    }
});

console.log(`Fixed ${fixedFiles} files with multiline string syntax errors.`);
