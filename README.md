> 本项目是基于Vue2的实战项目，高仿饿了么的商家详情页。

### 项目技术栈
***
* vue-cli
* vue
* vue-router
* better-scroll
* axios
* scss
* webpack

### 演示
[在线demo地址](https://jiaoxin2005.github.io/eleme-vue/#/) （请用chrome的手机模式预览）
#### 手机扫一扫
![二维码](http://omqf40tss.bkt.clouddn.com/%E4%B8%8B%E8%BD%BD.png)

### 项目截图
***

* 商品模块

![评论模块](http://omqf40tss.bkt.clouddn.com/ratings.gif)

* 评论模块

![评论模块](http://omqf40tss.bkt.clouddn.com/ratings.gif)

* 商家模块

![商家模块](http://omqf40tss.bkt.clouddn.com/seller.gif)

![商家模块](http://omqf40tss.bkt.clouddn.com/goods.gif)
**玄学分割线**
![商家模块](http://omqf40tss.bkt.clouddn.com/goods-2.gif)


### 安装步骤
```
# install dependencies
npm install

# serve with hot reload at localhost:8090
npm run dev

# build for production with minification
npm run build
```
### 如何全局注册filter
**filter.js**

```
let formatDate = (date,fmt) => {
    fmt = fmt || 'YYYY-MM-dd hh:mm:ss';
    if(!date || date == '' || date == 0){ //date判空
        return '';
    }
    date = new Date(date);
    if(/(y+)/gi.test(fmt)){ //RegExp.$1匹配正则第一个括号的内容
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + ''; // 先将匹配到的时间转成字符串
            fmt = fmt.replace(RegExp.$1,(RegExp.$1).length === 1 ? str : padLeftZero(str));
        }
    }
    function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
    return fmt;
}

export default {
    formatDate
}

```
在filter.js下管理所有的filter函数

```
import Vue from 'vue'
import filter from './common/js/filter'

Object.keys(filter).forEach((key,index,arr) => { // Object.keys返回遍历的key数组
    Vue.filter(key,filter[key]); //全局注册filter函数
})
```
