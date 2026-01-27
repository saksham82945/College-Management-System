#!/bin/bash

# Run All Tests Script
# This script runs all backend, frontend, and E2E tests

set -e  # Exit on error

echo "======================================"
echo "Running All Tests - College Management System"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# Backend Tests
echo -e "${YELLOW}[1/3] Running Backend Tests...${NC}"
cd backend

if npm test -- --coverage; then
    echo -e "${GREEN}✓ Backend tests passed${NC}"
else
    echo -e "${RED}✗ Backend tests failed${NC}"
    FAILED=1
fi

echo ""
cd ..

# Frontend Tests
echo -e "${YELLOW}[2/3] Running Frontend Component Tests...${NC}"
cd frontend

if npm test -- --run --coverage; then
    echo -e "${GREEN}✓ Frontend tests passed${NC}"
else
    echo -e "${RED}✗ Frontend tests failed${NC}"
    FAILED=1
fi

echo ""

# E2E Tests
echo -e "${YELLOW}[3/3] Running E2E Tests...${NC}"

# Check if Playwright is installed
if ! npx playwright --version > /dev/null 2>&1; then
    echo -e "${YELLOW}Installing Playwright browsers...${NC}"
    npx playwright install
fi

if npx playwright test; then
    echo -e "${GREEN}✓ E2E tests passed${NC}"
else
    echo -e "${RED}✗ E2E tests failed${NC}"
    FAILED=1
fi

cd ..

# Summary
echo ""
echo "======================================"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed! ✗${NC}"
    exit 1
fi
