@echo off
chcp 65001 >nul
echo Запуск музыкальной странички...
echo.

REM Проверяем, установлен ли Python
python --version >nul 2>&1
if errorlevel 1 (
    echo Ошибка: Python не установлен или не добавлен в PATH
    echo Установите Python с официального сайта: https://python.org
    pause
    exit /b 1
)

REM Запускаем сервер в фоновом режиме
start /B python -m http.server 8000

REM Ждем немного чтобы сервер успел запуститься
timeout /t 2 /nobreak >nul

REM Открываем браузер
start http://localhost:8000

echo Сервер запущен на http://localhost:8000
echo.
echo Чтобы остановить сервер, закройте это окно или нажмите Ctrl+C
echo.
pause
