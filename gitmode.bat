@echo off
for /l %%a in (1,1,9) do (
    for /l %%b in (1,1,9) do (
        for /l %%c in (1,1,9) do (
            echo %%a%%b%%c>>1.txt
        )
    )
)
pause
