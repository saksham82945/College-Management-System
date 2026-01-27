const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Regex to match: from 'path.js' or from "path.js"
            // Replaces with: from 'path'
            // Captures the path without extension in group 1.
            // Handles both single and double quotes, normalizes to single quotes in output or keeps original?
            // Let's try to keep original quote style if possible, or just force single.
            // Using replacer function.

            const newContent = content.replace(/from\s+(['"])([^'"]+)\.js\1/g, (match, quote, p1) => {
                return `from ${quote}${p1}${quote}`;
            });

            if (content !== newContent) {
                console.log(`Fixing ${filePath}`);
                fs.writeFileSync(filePath, newContent);
            }
        }
    }
}

console.log('Starting import fix...');
walk(path.join(__dirname, 'src'));
console.log('Finished import fix.');
