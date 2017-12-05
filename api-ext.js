//将这个文件引入到页面的任意位置即可
(function api_ext(global_) {

    //在这里扩展$api
    function $apiExt(aim){

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
    function apiExt(aim){

    }
//--------------------------------------------------------------
    function init(){
        if ($api && typeof $api === 'object') {
            function $eapi(){

            }
            $eapi.prototype = $api;
            var $eapi_ = new $eapi();
            $apiExt($eapi_)
            global_.$api = $eapi_;
        }

        function eapi(){

        }
        eapi.prototype = api;
        var eapi_ = new eapi();
        apiExt(eapi_)
        global_.api = eapi_;
    }

    if(global_.APICloudApiExtLoaded_ === true){
        return;
    }
    global_.APICloudApiExtLoaded_ = true;

    var apiready_ = global_.apiready;
    if(apiready_ && typeof apiready_ === 'function'){//处理apiready已注册的情况
        global_.apiready = function(){
            init();
            apiready_();
        }
    }
    else{//处理apiready未注册的情况
        Object.defineProperty(global_,"apiready",{
            set:function(fn){
                this.apiready_ = function(){
                    init();
                    fn();
                }
            },
            get:function(){
                return this.apiready_;
            }
        });
    }
})(window);
