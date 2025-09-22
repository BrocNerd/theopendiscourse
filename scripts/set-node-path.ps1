# PowerShell helper: add Node.js installation to the current user's PATH
# Usage: run in an elevated or normal PowerShell session:
#   .\scripts\set-node-path.ps1
# This will set the user PATH to include C:\Program Files\nodejs if that folder exists.

$nodePath = 'C:\Program Files\nodejs'
if (-Not (Test-Path $nodePath)) {
    Write-Host "Node path '$nodePath' not found. Please install Node.js or update this script to point to the correct install path." -ForegroundColor Yellow
    exit 1
}

# Read current user PATH
$current = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($current -like "*${nodePath}*") {
    Write-Host "User PATH already contains Node.js path: $nodePath" -ForegroundColor Green
    exit 0
}

# Append node path to user PATH
$newPath = "$current;$nodePath"
[Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
Write-Host "Added Node.js path to user PATH. New PATH will be available in new PowerShell sessions." -ForegroundColor Green
Write-Host "Note: you may need to restart PowerShell or sign out/in for changes to take effect." -ForegroundColor Yellow
