(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(aim) {
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
}

},{}],2:[function(require,module,exports){
var apiExt = require('./api.ext');
var $apiExt = require('./$api.ext');
var globalExt = require('./global.ext');
var api_extExt = require('./api_ext.ext');
(function api_ext(global_) {

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
    api_extExt(global_);


})(window);

},{"./$api.ext":1,"./api.ext":3,"./api_ext.ext":4,"./global.ext":5}],3:[function(require,module,exports){
module.exports = function(aim) {

}

},{}],4:[function(require,module,exports){
module.exports = function(global_) {
    var $apiExts = [];
    var apiExts = [];
    global_.api_ext = {
        parseUIMoudle: function(type) {
            filter = 'ui-module';
            if (type && typeof type === 'string') {
                filter += '[type="' + type + '"]'
            }
            var eles = document.querySelectorAll(filter);
            for (var i = 0; i < eles.length; i++) {
                var ele = eles.item(i);
                type = ele.getAttribute('type');
                type = type.toLowerCase();
                switch (type) {
                    case 'uimodule/uiinput':
                        var openParam = ele.dataset.openParam;
                        openParam = (new Function('return ' + openParam)).call(ele);
                        var openCallback = ele.dataset.openCallback;
                        openCallback = (new Function('return ' + openCallback)).call(ele);
                        var iUIInput = this._getUIModuleSingleton('UIInput');
                        iUIInput.open(openParam,openCallback);
                        break;
                }

            }
        },

        _getUIModuleSingleton: function(type) {
            if (!this._singletons[type]) {
                this._singletons[type] = api.require(type);
            }
            return this._singletons[type];
        },
        _singletons: {},
        registerCustomerApiExt: function(fn) {
            apiExts.push(fn);
        },
        registerCustomer$ApiExt: function(fn) {
            $apiExts.push(fn);
        },
        _initCustomerApiExts: function(fn) {
            for (var i in apiExts) {
                apiExts[i](global_.api);
            }
        },
        _initCustomer$ApiExts: function(fn) {
            for (var i in $apiExts) {
                $apiExts[i](global_.$api);
            }
        }
    }
}

},{}],5:[function(require,module,exports){
module.exports = function(aim) {

    var alert_ = aim.alert;
    aim.alert = function() {
        var str = '';
        for (var i in arguments) {
            var p = arguments[i];
            switch (typeof p) {
                case 'string':
                    str += p;
                    break;
                case 'object':
                    str += JSON.stringify(p);
                    break;
            }
            if (i < arguments.length - 1) {
                str += '\r\n------\r\n';
            }
        }
        alert_.call(aim, str);
    }

    var console_log_ = aim.console.log;

    aim.console.log = function() {
        var str = '';
        for (var i in arguments) {
            var p = arguments[i];
            switch (typeof p) {
                case 'object':
                    str += JSON.stringify(p);
                    break;
                default:
                    str += p;
                    break;
            }
            if (i < arguments.length - 1) {
                str += '\r\n---\r\n';
            }
        }
        console_log_.call(aim.console, str);
    }
}

},{}]},{},[2]);
