# api_ext
APICloud API 进行规范和扩展。
所有的扩展功能不能在`apiready`运行前使用，但可以在运行中或运行后使用。

## 如何使用
将js文件引入到页面的任意位置。

## 内容
### $api
#### $api.objectToJson = $api.jsonToStr

#### $api.jsonToObject = $api.strToJson

#### $api.addEvent = $api.addEvt

#### $api.removeEvent = $api.rmEvt

#### $api.attribute = $api.attr

#### $api.addClass = $api.addCls

#### $api.removeClass = $api.removeCls

#### $api.hasClass = $api.hasCls

#### $api.toggleClass = $api.toggleCls

#### $api.value = $api.val

#### $api.cssValue = $api.cssVal

#### $api.removeStorage = $api.rmStorage

#### $api.previous = $api.prev

#### $api.equals = $api.eq

#### $api.getRectOf(_ELEMENT_)
获取元素的offset并转换为x,y,w,h的形式。

### api
暂无。

### global
#### alert()
支持传入对象，支持传入多个参数

#### console.log()
支持传入对象，支持传入多个参数

### api_ext
#### registerCustomerApiExt(yourExtFn)
对api对象注册你自己的扩展功能。
```
api_ext.registerCustomerApiExt(function(aim){
  aim.yourExtension = function(){...}
})
```
#### registerCustomer$ApiExt(yourExtFn)
对$api对象注册你自己的扩展功能。
```
api_ext.registerCustomer$ApiExt(function(aim){
  aim.yourExtension = function(){...}
})
```
