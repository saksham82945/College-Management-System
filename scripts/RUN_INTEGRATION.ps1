#!/usr/bin/env pwsh
# College Management System - PDF Integration Automation (PowerShell Version)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PDF Diagram Integration - PowerShell" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set location
$workDir = "d:\collegemanagementMERN\College Management"
Set-Location $workDir

Write-Host "📍 Working directory: $workDir" -ForegroundColor Green

# Check Python
Write-Host ""
Write-Host "🔍 Checking Python installation..." -ForegroundColor Yellow
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python not found. Please install Python 3.8+" -ForegroundColor Red
    Write-Host "   Download from: https://www.python.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Python found: $pythonCheck" -ForegroundColor Green

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
python -m pip install reportlab pillow PyPDF2 --quiet

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# Create directories
Write-Host ""
Write-Host "📁 Creating directories..." -ForegroundColor Yellow
$diagramsDir = Join-Path $workDir "diagrams"
$outputDir = Join-Path $workDir "output"

if (-not (Test-Path $diagramsDir)) {
    New-Item -ItemType Directory -Path $diagramsDir -Force | Out-Null
    Write-Host "✅ Created: diagrams/" -ForegroundColor Green
} else {
    Write-Host "✅ diagrams/ folder exists" -ForegroundColor Green
}

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "✅ Created: output/" -ForegroundColor Green
} else {
    Write-Host "✅ output/ folder exists" -ForegroundColor Green
}

# Check for diagram files
Write-Host ""
Write-Host "🖼️  Checking for diagram files..." -ForegroundColor Yellow
$diagramCount = (Get-ChildItem -Path $diagramsDir -Filter "*.png" -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "✅ Found $diagramCount diagram files in diagrams/" -ForegroundColor Green

if ($diagramCount -lt 7) {
    Write-Host "⚠️  Note: Expected 7 diagrams, found $diagramCount" -ForegroundColor Yellow
    Write-Host "   Missing diagrams will be created as placeholders" -ForegroundColor Yellow
}

# Run Python script
Write-Host ""
Write-Host "🚀 Running integration script..." -ForegroundColor Yellow
Write-Host "   This may take a moment..." -ForegroundColor Gray

python INTEGRATE_DIAGRAMS.py

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Integration failed" -ForegroundColor Red
    exit 1
}

# Check output
Write-Host ""
Write-Host "✅ Integration successful!" -ForegroundColor Green
Write-Host ""

$finalPdf = Join-Path $outputDir "College_Management_System_Final_Report.pdf"
if (Test-Path $finalPdf) {
    $fileSize = (Get-Item $finalPdf).Length / 1MB
    Write-Host "📄 Final PDF created: College_Management_System_Final_Report.pdf" -ForegroundColor Green
    Write-Host "   Size: $($fileSize)MB" -ForegroundColor Green
    Write-Host "   Location: $outputDir" -ForegroundColor Green
    Write-Host ""
    
    # Ask to open
    $response = Read-Host "🎉 Open the output folder now? (Y/n)"
    if ($response -ne 'n' -and $response -ne 'N') {
        Start-Process explorer $outputDir
    }
} else {
    Write-Host "❌ Final PDF not found at: $finalPdf" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ PROCESS COMPLETE!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Review the final PDF" -ForegroundColor Gray
Write-Host "   2. Check diagram placement" -ForegroundColor Gray
Write-Host "   3. Add any additional captions if needed" -ForegroundColor Gray
Write-Host "   4. Submit your professional PDF!" -ForegroundColor Gray
Write-Host ""
