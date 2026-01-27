function Get-LOC ($path) {
    if (Test-Path $path) {
        if ((Get-Item $path) -is [System.IO.FileInfo]) {
            return (Get-Content $path | Measure-Object -Line).Lines
        } else {
            $files = Get-ChildItem -Path $path -Recurse -File -Exclude node_modules,dist,build,.git,coverage
            $loc = 0
            foreach ($file in $files) {
                $loc += (Get-Content $file.FullName | Measure-Object -Line).Lines
            }
            return $loc
        }
    }
    return 0
}

$backendPaths = @(
    "backend\src\config", "backend\src\constants", "backend\src\controllers", "backend\src\middleware",
    "backend\src\models", "backend\src\routes", "backend\src\scripts", "backend\src\utils",
    "backend\src\validation", "backend\src\index.js", "backend\index.js", "backend\jest.config.js", "backend\jest.config.cjs"
)

$frontendPaths = @(
    "frontend\src\components", "frontend\src\config", "frontend\src\context", "frontend\src\hooks", "frontend\src\pages",
    "frontend\src\services", "frontend\src\store", "frontend\src\types", "frontend\src\utils",
    "frontend\src\App.jsx", "frontend\src\main.jsx", "frontend\index.html", "frontend\e2e\tests", "frontend\src\__tests__", "frontend\tests"
)

Write-Output "### Backend Lines of Code"
$totalBackend = 0
foreach ($path in $backendPaths) {
    if (Test-Path $path) {
        $loc = Get-LOC $path
        Write-Output "- **$path**: $loc lines"
        $totalBackend += $loc
    }
}
Write-Output "**Total Backend Target LOC**: $totalBackend lines"

Write-Output "`n### Frontend Lines of Code"
$totalFrontend = 0
foreach ($path in $frontendPaths) {
    if (Test-Path $path) {
        $loc = Get-LOC $path
        Write-Output "- **$path**: $loc lines"
        $totalFrontend += $loc
    }
}
Write-Output "**Total Frontend Target LOC**: $totalFrontend lines"

Write-Output "`n**Grand Total for targets**: $($totalBackend + $totalFrontend) lines"
