@echo off
title HERETHERE COFFEE Dev Server
echo ========================================================
echo   啟動 HERETHERE COFFEE 精品咖啡品牌網站開發伺服器
echo ========================================================
echo.
cd /d "%~dp0"
echo 正在啟動 Vite...
npm run dev
pause
