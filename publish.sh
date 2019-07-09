set -e
if [ -n "$1" ];
then
    npm run blog:build
    git add .
    git commit -m $1
    git push origin master
else
    echo '需要填写commit参数！'
fi
