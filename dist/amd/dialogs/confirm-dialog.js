define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConfirmDialog = /** @class */ (function () {
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
    exports.ConfirmDialog = ConfirmDialog;
});
