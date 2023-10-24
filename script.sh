#!/bin/bash

arg1=$1
# 下载脚本并带参数执行
curl "https://ci.knowyourself.cc/src/outer/run.sh" | bash -s $arg1
