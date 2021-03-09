System.register([], function (exports_1, context_1) {
    "use strict";
    var ConfirmDialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ConfirmDialog = /** @class */ (function () {
                function ConfirmDialog() {
                }
                ConfirmDialog.prototype.canActivate = function (params) {
                    if (!params.title || !params.text) {
                        throw new Error('Missing title or text');
                    }
                };
                ConfirmDialog.prototype.activate = function (params) {
                    this.title = params.title;
                    this.text = params.text;
                };
                return ConfirmDialog;
            }());
            exports_1("ConfirmDialog", ConfirmDialog);
        }
    };
});
