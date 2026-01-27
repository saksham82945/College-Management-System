
import fs from 'fs';
import path from 'path';

const rootDirs = [
    'e:/Desktop/College Management/backend/src',
    'e:/Desktop/College Management/frontend/src'
];

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];
let totalLines = 0;
let fileCount = 0;
const byExt: Record<string, number> = {};

function countLines(filePath: string) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '').length;
        return lines;
    } catch (e) {
        return 0;
    }
}

function walkDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (extensions.includes(ext)) {
                const lines = countLines(fullPath);
                totalLines += lines;
                fileCount++;
                byExt[ext] = (byExt[ext] || 0) + lines;
            }
        }
    }
}

console.log('Counting Source Code Lines (excluding whitespace)...\n');

for (const dir of rootDirs) {
    if (fs.existsSync(dir)) {
        walkDir(dir);
        console.log(`Scanned ${dir}`);
    } else {
        console.log(`Directory not found: ${dir}`);
    }
}

console.log('\n-----------------------------');
console.log('Total Codebase Stats');
console.log('-----------------------------');
console.log(`Total Source Files: ${fileCount}`);
console.log(`Total Non-Empty Lines: ${totalLines}`);
console.log('\nBreakdown by Language:');
Object.entries(byExt).forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} lines`);
});
console.log('-----------------------------');
