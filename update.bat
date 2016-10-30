@echo off
set s=%random%
set /a  s=s%%24
set m=%random%
set /a  m=m%%60
@time %s%:%m%
set num=%random%
set /a  num=num%%15
for /l %%a in (1,1,%num%) do (
    echo %%a >> update
    git add update
    git commit -m "update"
)
