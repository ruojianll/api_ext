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
                case 'string':
                    str += p;
                    break;
                case 'object':
                    str += JSON.stringify(p);
                    break;
            }
            if (i < arguments.length - 1) {
                str += '\r\n---\r\n';
            }
        }
        console_log_.call(aim.console, str);
    }
}
