# element-table组件实现excel导出（踩坑）

## 前情提要：
项目是基于vue和element组件开发的后台管理系统，在实现数据统计相关功能的时候，要求实现表格导出。纯前端实现功能的基本思路有两条 ① 拼接csvString, 设置a标签再模拟a链接点击 。② 使用插件。
当然思路② 看起来更简单，而且导出内容更接近所见即所得的要求，所以我也选择了②

## 1.简单实现
主要安装了两个依赖：
```
npm install --save xlsx file-saver
```
在组件中引入
```
import FileSaver from 'file-saver'import XLSX from 'xlsx'
```
具体方法（建议写成全局方法）

```js
export const exportExcel = function(tableid, filename='default') {    
    /* generate workbook object from table */    
    let wb = XLSX.utils.table_to_book(document.querySelector(`#${tableid}`))    
    /* get binary string as output */    
    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })    
    try {        
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${filename}.xlsx`)    
    } catch(e) {         
        console.log(e)    
    }    
    return
}
```
## 2.两个注意点★
◆对于有分页(前端分页)的表格，在导出操作前需要先去除分页，之后再改回来

![](/images/shares/share3/pic1.png)

比如像这样：
```js
exportTable(tableid, name) {    
    let tpage1 = this.$deepCopy(this.page1)//// 先去除分页    
    let tpage2 = this.$deepCopy(this.page2)    
    this.page1 = {}    
    this.page2 = {}    
    this.$nextTick(function() {        
        exportExcel(tableid, `${name}${this.start_date}~${this.end_date}`)        
        this.page1 = tpage1        
        this.page2 = tpage2    
    }
)}
```
☆需要注意的是去除分页之后表格的导出操作需要在nextTick回调中执行，因为dom操作是异步的，所以导出操作必须放在下一个宏任务循环。

◆对于有固定列(fixed)的表格，需要先将固定列的fixed属性设置为false，

![](/images/shares/share3/pic2.png)

否则会导出两个同样的表格，这个坑和fixed实现有关，element的实现是将表格渲染两遍，再隐藏一个。

![](/images/shares/share3/pic3.png)

比如像这样：
```js
exportTable(tableid, name) {    
    if(tableid === 'list_table') { 
        ////有fixed属性的表格会渲染两遍        
        this.teacherFixed = false    
    }    
    this.$nextTick(function() {        
        exportExcel(tableid, `${name}${this.start_date}~${this.end_date}`)        
        this.teacherFixed = true    
    }
)}
```
当然nextTick的注意点同上一个坑

## 完
