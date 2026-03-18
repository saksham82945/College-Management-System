"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Dynamically resolve paths relative to this script: scripts/ -> src/ -> backend/ -> College Management/
const projectRoot = path_1.default.resolve(__dirname, '../../..');
const rootDirs = [
    path_1.default.join(projectRoot, 'backend', 'src'),
    path_1.default.join(projectRoot, 'frontend', 'src')
];
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];
let totalLines = 0;
let fileCount = 0;
const byExt = {};
function countLines(filePath) {
    try {
        const content = fs_1.default.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '').length;
        return lines;
    }
    catch (e) {
        return 0;
    }
}
function walkDir(dir) {
    const files = fs_1.default.readdirSync(dir);
    for (const file of files) {
        const fullPath = path_1.default.join(dir, file);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        }
        else {
            const ext = path_1.default.extname(fullPath).toLowerCase();
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
    if (fs_1.default.existsSync(dir)) {
        walkDir(dir);
        console.log(`Scanned ${dir}`);
    }
    else {
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
