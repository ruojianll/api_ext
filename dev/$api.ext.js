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
