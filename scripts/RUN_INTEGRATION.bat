@echo off
REM College Management System - PDF Integration Automation
REM This script automates the entire diagram integration process

echo.
echo ========================================
echo PDF Diagram Integration - Setup
echo ========================================
echo.

REM Set working directory
cd /d "d:\collegemanagementMERN\College Management"

echo Step 1: Installing Python dependencies...
python -m pip install reportlab pillow PyPDF2 --quiet
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo Step 2: Creating required directories...
if not exist "diagrams" mkdir diagrams
if not exist "output" mkdir output
echo ✅ Directories created

echo.
echo Step 3: Running PDF integration script...
python INTEGRATE_DIAGRAMS.py

if errorlevel 1 (
    echo.
    echo ❌ Integration failed. Check errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ INTEGRATION COMPLETE!
echo ========================================
echo.
echo 📁 Output folder: output\
echo 📄 Final PDF: College_Management_System_Final_Report.pdf
echo.
echo Opening output folder...
start "" explorer "output"

echo.
pause
