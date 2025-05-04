@echo off
REM Cambiar a la carpeta venv\Scripts
cd /d "%~dp0\src\app\services\python\venv\Scripts"

REM Activar el entorno virtual
call activate

REM Volver a la raíz del proyecto (asume que venv está directamente en la raíz)
cd ../..

REM Ejecutar uvicorn (ajusta el nombre del archivo y el parámetro --reload según necesites)
uvicorn api:app --reload

pause