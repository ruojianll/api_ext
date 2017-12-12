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
                    case 'uiinput':
                        var iUIInput = this._getUIModuleSingleton('UIInput');
                        iUIInput.open({
                            rect: $api.getRectOf(ele),
                            fixedOn: api.frameName
                        });
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
