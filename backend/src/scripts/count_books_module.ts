
import fs from 'fs';

const files = [
    'e:/Desktop/College Management/frontend/src/pages/BooksPage.tsx',
    'e:/Desktop/College Management/frontend/src/pages/LibraryPage.tsx',
    'e:/Desktop/College Management/backend/src/models/Book.ts',
    'e:/Desktop/College Management/backend/src/models/BookCopy.ts',
    'e:/Desktop/College Management/backend/src/controllers/book.ts',
    'e:/Desktop/College Management/backend/src/routes/book.ts'
];

let totalLines = 0;

console.log('--- Line Count Analysis for Books Module ---');

for (const file of files) {
    try {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf-8');
            const lines = content.split('\n').filter(line => line.trim() !== '').length;
            console.log(`${file.split('/').pop()}: ${lines} lines`);
            totalLines += lines;
        } else {
            console.log(`${file.split('/').pop()}: File not found`);
        }
    } catch (e) {
        console.error(`Error reading ${file}:`, e);
    }
}

console.log('-------------------------------------------');
console.log(`Core Module Code: ${totalLines} lines`);
// Estimated shared code removal (Sidebar links, Route entries, Index imports)
console.log(`Shared Config (Est): ~30 lines`);
console.log(`TOTAL REDUCTION: ~${totalLines + 30} lines`);
