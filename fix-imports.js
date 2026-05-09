const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.js') || file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const allFiles = [...walk('screens'), ...walk('components'), ...walk('navigation')];
const tokens = ['Colors', 'Typography', 'Spacing', 'Shadows', 'BorderRadius', 'Components'];

let fixedCount = 0;

allFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let missingTokens = [];
    
    // Quick check if file already imports everything as default Theme
    const hasDefaultTheme = content.includes('import Theme') && !content.includes('import { Theme');
    
    tokens.forEach(tok => {
        const regex = new RegExp('\\\\b' + tok + '\\\\.');
        if (regex.test(content)) {
            // Check if explicitly imported
            const importRegex = new RegExp('import\\\\s+{[^}]*\\\\b' + tok + '\\\\b[^}]*}\\\\s+from\\\\s+[\'"].*?Theme');
            if (!importRegex.test(content) && !hasDefaultTheme) {
                 missingTokens.push(tok);
            }
        }
    });
    
    if (missingTokens.length > 0) {
        console.log('Fixing ' + f + ' (missing ' + missingTokens.join(', ') + ')');
        
        // Calculate relative path to utils/Theme.js
        const depth = f.split(path.sep).length - 1;
        const relativePrefix = depth === 1 ? '../' : depth === 2 ? '../../' : '../../../';
        const importPath = relativePrefix + 'utils/Theme';
        
        // We will just add a new import at the top for safety and simplicity
        const newImport = 'import { ' + missingTokens.join(', ') + ' } from \'' + importPath + '\';\n';
        
        const firstImportIdx = content.indexOf('import ');
        if (firstImportIdx !== -1) {
            content = content.substring(0, firstImportIdx) + newImport + content.substring(firstImportIdx);
        } else {
            content = newImport + content;
        }
        
        fs.writeFileSync(f, content, 'utf8');
        fixedCount++;
    }
});

console.log('Fixed ' + fixedCount + ' files.');
