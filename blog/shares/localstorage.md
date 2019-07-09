# localStorage关于ios10以下隐私模式不可用的问题

## 问题
最近老项目会员中心上报了一个问题，报错如下：

![](/images/shares/share2/pic1.png)

部分用户在登录时会出现报错的情况，出现频率大概是每三天有一两个。 根据报错，很明显是setItem的问题。查看[web docs](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)没有说有兼容性问题
![](/images/shares/share2/pic2.png)

继续了解，发现localstorage对ios11以下隐私模式有兼容问题，调用setItem会报错。即ios11以下的隐私模式不支持localstorage

## 解决办法
思路是在不兼容的浏览器（模式）下使用cookies来替代localstorage

```js
const _isLocalStorageSupported = function() {    
    try {        
        window.localStorage.setItem('test', 1)        
        window.localStorage.removeItem('test')        
        return true    
    }catch(err) {        
        return false    
    }
}

const getStorage = function(key) { ///localStorage.getItem / cookies    
    let res = ''    
    if(_isLocalStorageSupported()) {        
        res = window.localStorage.getItem(key)    
    }else { ///cookie        
        let name = `${key}=`        
        let ca = document.cookie.split(';')        
        for(let i=0; i<ca.length; i++) {            
            let c = ca[i].trim()            
            if (c.indexOf(name) === 0) {                 
                res = c.substring(name.length, c.length)            
            }        
        }    
    }    
    return res
}

const setStorage = function(key, val) { ///localStorage.setItem / cookies    
    if(_isLocalStorageSupported()) {        
        window.localStorage.setItem(key, val)    
    }else { ///cookie        
        let d = new Date();        
        d.setTime(d.getTime()+(30*24*60*60*1000));        
        let expires = `expires=${d.toGMTString()}`;        
        document.cookie = `${key}=${val}; ${expires}`;    
    }
}
```

封装set和get的全局公共方法

## 补充
关于为啥 unhandled promise rejection 我有点不理解

![](/images/shares/share2/pic3.png)

我是做了catch处理的，这个setItem是在.then()回调里执行的，应该被正常catch而不至于最后被进程捕获。很奇怪，有没有大佬知道原因的，欢迎评论告诉我，谢谢。

## 完

<Vssue title="localstorage" />
