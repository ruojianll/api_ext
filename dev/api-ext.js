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
