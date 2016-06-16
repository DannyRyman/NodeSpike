@echo off

call yaml2json ./api/swagger/swagger.yaml --pretty --save

call swagger project test

