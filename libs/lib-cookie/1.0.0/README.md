## cookie 使用说明


```javascript
var cookie = require('../lib-cookie/2.0.0/cookie');//层级自己写明确就好，此处仅作举栗子
```

* cookie('keyname') 获取cookie value
* cookie('keyname','keyvalue') 设置cookie
* cookie('keyname','keyvalue', options) 设置cookie 带参数

```javascript
        options {
            expires : 7,            //cookie生命周期             默认session cookie
            path: '/foo',           //cookie生效路径             默认当前路径
            domain: 'example.com',  //cookie 生效域名            默认当前域名
            secure: true,           //是否是https                默认是false 即http
            raw: true               //是否对cookie进行URI编码     默认是false
        }
```