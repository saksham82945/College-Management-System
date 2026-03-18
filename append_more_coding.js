const fs = require('fs');
const path = require('path');

const outputFile = path.join(__dirname, 'Section_12_Coding.md');

// We are appending, so we need the existing content
let existingContent = "";
if (fs.existsSync(outputFile)) {
    existingContent = fs.readFileSync(outputFile, 'utf8');
}

// Additional files to include to reach +500 lines
const additionalFilesToInclude = [
    // Backend: Extra Models
    'backend/src/models/Course.js',
    'backend/src/models/Subject.js',
    'backend/src/models/Attendance.js',
    'backend/src/models/Notification.js',
    
    // Backend: Extra Controllers
    'backend/src/controllers/courseController.js',
    'backend/src/controllers/dashboardController.js',
    
    // Backend: Middlewares
    'backend/src/middleware/auth.js',
    'backend/src/middleware/errorHandler.js',

    // Frontend: Main Landing Page and related components (Ensuring they are present and adding more context)
    'frontend/src/components/PublicHeader.jsx',
    'frontend/src/components/AcademicsSection.jsx',
    'frontend/src/components/HeroSection.jsx' // Just in case
];

let addedLines = 0;
let mdContent = "";

function appendFileCode(filePath, relativePath, category) {
    // Prevent adding if it's already exactly in the existing text (simple check by file path comment)
    if (existingContent.includes('### ' + relativePath)) {
        return;
    }
    
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;

    addedLines += lines;
    
    const ext = path.extname(filePath).replace('.', '');
    const lang = ext === 'jsx' ? 'jsx' : (ext === 'js' ? 'javascript' : ext);
    
    mdContent += `### ${relativePath}\n`;
    mdContent += `*Category: ${category}*\n\n`;
    mdContent += '```' + lang + '\n';
    mdContent += content.trim() + '\n';
    mdContent += '```\n\n';
    mdContent += `<div style="page-break-after: always;"></div>\n\n`;
}

for (const relPath of additionalFilesToInclude) {
    const fullPath = path.join(__dirname, relPath);
    let category = 'Additional ' + (relPath.startsWith('backend') ? 'Backend' : 'Frontend') + ' Scripts';
    appendFileCode(fullPath, relPath, category);
}

// Fallback: If we still need more lines, just grab some remaining backend controllers
if (addedLines < 500) {
    const extraDirs = ['backend/src/controllers', 'backend/src/routes'];
    for (const dir of extraDirs) {
        const fullDir = path.join(__dirname, dir);
        if (!fs.existsSync(fullDir)) continue;
        
        const files = fs.readdirSync(fullDir);
        for (const file of files) {
            const fullPath = path.join(fullDir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isFile() && file.endsWith('.js')) {
                const relPath = path.posix.join(dir, file);
                appendFileCode(fullPath, relPath, 'Additional Backend Modules');
            }
            if (addedLines >= 550) break;
        }
        if (addedLines >= 550) break;
    }
}

if (mdContent.length > 0) {
    fs.appendFileSync(outputFile, mdContent);
    console.log('Successfully appended ' + addedLines + ' lines of code to ' + outputFile);
} else {
    console.log('No new lines were appended. Files might already exist in the report.');
    
    // Force append LandingPage again if it's requested explicitly, or just add some comment if needed.
    // The user mentioned landing page, so let's verify if landing page was appended in the first run.
    console.log("Checking LandingPage...");
    const lpPath = path.join(__dirname, 'frontend/src/pages/LandingPage.jsx');
    if (fs.existsSync(lpPath)) {
        const lpContent = fs.readFileSync(lpPath, 'utf8');
        const count = lpContent.split('\\n').length;
        fs.appendFileSync(outputFile, `\\n### frontend/src/pages/LandingPage.jsx\\n*Category: Requested Landing Page Code*\\n\\n\`\`\`jsx\\n${lpContent.trim()}\\n\`\`\`\\n\\n<div style="page-break-after: always;"></div>\\n\\n`);
        console.log('Forcibly appended LandingPage.jsx (' + count + ' lines) per user request.');
    }
}
