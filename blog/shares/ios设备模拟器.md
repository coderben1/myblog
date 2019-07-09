# **web测试-ios设备模拟器(iOS Simulator)**
## 前言
虽然 Chrome DevTools 可以模拟手机的环境，但与真实环境差别比较大，所以一般会用真机调试，或者就是用模拟器了。这篇文章主要就是介绍下在mac上如何使用模拟器来调试页面。

## 安装
ios simulator捆绑于xcode，直接上appStore 搜索[Xcode](https://apps.apple.com/cn/app/xcode/id497799835?mt=12)进行安装

![](/images/shares/share1/pic1.png)

## 如何使用
### 1.打开xcode，需要新建一个项目，通过”Xcode-Open Developer Tool-Simulator“选项启动模拟器。
![](/images/shares/share1/pic2.png)

会加载一个默认的ios设备，并在程序坞中出现Simulator的图标（可以将图标保留在程序坞中，下次就可以直接打开，不需要再通过打开xcode这么麻烦），然后就可以使用模拟设备的safari浏览器进行测试了。

### 2.打开调试窗口
打开mac上的safari浏览器，选择”开发-模拟器-待调试网页“，就可以打开控制台了。
![](/images/shares/share1/pic3.png)

注：如果没有开发选项，需要在“safari的偏好设置-高级”中打开

![](/images/shares/share1/pic4.png)
（效果图）

### 3.切换不同设备及不同IOS系统
通过simulator图标打开模拟器，默认加载的是上次退出时的模拟设备，可以在"Hardware-Device"选项中更换，也可以更换不同的ios版本测试兼容性
![](/images/shares/share1/pic5.png)

不同版本的ios系统需要下载，打开xcode，下载入口在下图位置。
![](/images/shares/share1/pic6.png)

## 完

<Vssue title="simulator" />




