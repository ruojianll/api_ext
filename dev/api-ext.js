//a将这个文件引入到页面的任意位置即可
(function api_ext(global_) {

    //在这里扩展$api
    function $apiExt(aim) {

        aim.objectToJson = $api.jsonToStr;

        aim.jsonToObject = $api.strToJson;

        aim.addEvent = $api.addEvt;

        aim.removeEvent = $api.rmEvt;

        aim.attribute = $api.attr;

        aim.addClass = $api.addCls;

        aim.removeClass = $api.removeCls;

        aim.hasClass = $api.hasCls;

        aim.toggleClass = $api.toggleCls;

        aim.value = $api.val;

        aim.cssValue = $api.cssVal;

        aim.removeStorage = $api.rmStorage;

        aim.previous = $api.prev;

        aim.equals = $api.eq;

        aim.getRectOf = function(ele_) {
            var offset = $api.offset(ele_);
            var rect = {
                x: offset.l,
                y: offset.t,
                w: offset.w,
                h: offset.h,
            };
            return rect;
        }



    };

    //在这里扩展api
    function apiExt(aim) {

    }

    //在这里扩展全局对象
    function globalExt(aim){
        var alert_ = aim.alert;
        aim.alert = function(){
            var str = '';
            for(var i in arguments)
            {
                var p = arguments[i];
                switch (typeof p) {
                    case 'string':
                        str += p;
                        break;
                    case 'object':
                        str += JSON.stringify(p);
                }
                if(i < arguments.length - 1){
                    str += '\r\n------\r\n';
                }
            }
            alert_.call(aim,str);
        }

        var console_log_ = aim.console.log;
        aim.console.log = function(){
            var str = '';
            for(var i in arguments)
            {
                var p = arguments[i];
                switch (typeof p) {
                    case 'string':
                        str += p;
                        break;
                    case 'object':
                        str += JSON.stringify(p);
                }
                if(i < arguments.length - 1){
                    str += '\r\n---\r\n';
                }
            }
            console_log_.call(aim.console,str);
        }
    }
    //--------------------------------------------------------------
    function init() {

        globalExt(global_)

        if (!$api || !(typeof $api === 'object')) {
            global_$api = {};
        }

        function $eapi() {

        }
        $eapi.prototype = $api;
        var $eapi_ = new $eapi();
        global_.$api = $eapi_;
        $apiExt(global_.$api);
        global_.api_ext._initCustomer$ApiExts();

        function eapi() {

        }
        eapi.prototype = api;
        var eapi_ = new eapi();
        global_.api = eapi_;
        apiExt(global_.api);
        global_.api_ext._initCustomerApiExts();
    }

    if (global_.APICloudApiExtLoaded_ === true) {
        return;
    }
    global_.APICloudApiExtLoaded_ = true;

    var apiready_ = global_.apiready;
    if (apiready_ && typeof apiready_ === 'function') { //处理apiready已注册的情况
        global_.apiready = function() {
            init();
            apiready_();
        }
    } else { //处理apiready未注册的情况
        global_.apiready_ = init;
        Object.defineProperty(global_, "apiready", {
            set: function(fn) {
                this.apiready_ = function() {
                    init();
                    fn();
                }
            },
            get: function() {
                return this.apiready_;
            }
        });
    }

    var $apiExts = [];
    var apiExts = [];
    global_.api_ext = {
        parseUIMoudle : function(type){
            filter = 'ui-moudle';
            if(type && typeof type === 'string'){
                filter += '[type="'+ type + '"]'
            }

            var eles = document.querySelectorAll(filter);

            for(var i in eles){
                var ele = eles.item(i);
                type = ele.getAttribute('type');
                type = type.toLowerCase();
                switch (type) {
                    case 'uiinput':
                        var iUIInput = this._getUIModuleSingleton('UIInput');
                        iUIInput.open({
                            rect:$api.getRectOf(ele),
                            fixedOn:api.frameName
                        });
                        break;
                }

            }
        },

        _getUIModuleSingleton : function(type){
            if(!this._singletons[type]){
                this._singletons[type] = api.require(type);
            }
            return this._singletons[type];
        },
        _singletons:{},
        registerCustomerApiExt : function(fn){
            apiExts.push(fn);
        },
        registerCustomer$ApiExt : function(fn){
            $apiExts.push(fn);
        },
        _initCustomerApiExts : function(fn){
            for(var i in apiExts){
                apiExts[i](global_.api);
            }
        },
        _initCustomer$ApiExts : function(fn){
            for(var i in $apiExts){
                $apiExts[i](global_.$api);
            }
        }
    }
})(window);
