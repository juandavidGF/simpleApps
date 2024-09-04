const fs = require('fs');
const path = require('path');

function getFiles(dir) {
    const result = {};

    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            result[item] = getFiles(fullPath);
        } else if (item === 'index.html') {
            result['index'] = path.relative(__dirname, fullPath);
        } else if (item.endsWith('.html')) {
            result[item] = path.relative(__dirname, fullPath);
        }
    });

    return result;
}

const rootDir = __dirname;
const indexedFiles = getFiles(rootDir);

// Save the indexed files to a JSON file
fs.writeFileSync('indexedFiles.json', JSON.stringify(indexedFiles, null, 2), 'utf-8');

console.log('Indexed files saved to indexedFiles.json');
