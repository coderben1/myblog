set -e
if [ -n "$1" ];
then
    npm run blog:build
    cd /Users/ben-macbook/Desktop/www/myblog_build
    rm -rf ./*
    cp -r /Users/ben-macbook/Desktop/www/myblog_source/blog/.vuepress/dist/ ./
    git add .
    git commit -m $1
    git push origin master
    cd -
else
    echo '需要填写commit参数！'
fi
