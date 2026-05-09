const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'locales');
const languages = ['pt-BR', 'pt-PT', 'en', 'es'];

const newKeys = require('./generated_keys.json');

languages.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    if (!data.headersFirst) {
        data.headersFirst = {};
    }
    
    for (const key in newKeys) {
        if (!data.headersFirst[key]) {
            data.headersFirst[key] = newKeys[key];
        }
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Updated ${lang}/common.json`);
});
