
for /l %%i in (1,1,9) do (
    for /l %%j in (1,1,1) do (
        rem @date 2016-%%i-%%j
        echo %random% | >> update
        rem git add update
        rem git commit -m "update"
    )
)
pause
