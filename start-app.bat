@echo off
cd /d %~dp0

:: Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo Starting Vite dev server...
start "" http://localhost:5173
npm run dev
pause 