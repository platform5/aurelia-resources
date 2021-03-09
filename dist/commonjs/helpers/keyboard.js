"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeybordHelper = /** @class */ (function () {
    function KeybordHelper() {
        this.keydowns = {};
        this.codedowns = {};
        this.listeningKeys = [
            'Shift',
            'Control',
            'Meta',
            'Alt',
        ];
        this.listeningCodes = [
            'ShiftLeft',
            'ShiftRight',
            'ControlLeft',
            'ControlRight',
            'MetaLeft',
            'MetaRight',
            'AltLeft',
            'AltRight',
        ];
    }
    KeybordHelper.prototype.start = function () {
        document.addEventListener('keydown', this);
        document.addEventListener('keyup', this);
    };
    KeybordHelper.prototype.dispose = function () {
        document.removeEventListener('keydown', this);
        document.removeEventListener('keyup', this);
    };
    KeybordHelper.prototype.handleEvent = function (event) {
        if (this.listeningKeys.includes(event.key)) {
            this.keydowns[event.key] = event.type === 'keydown';
        }
        if (this.listeningCodes.includes(event.code)) {
            this.codedowns[event.code] = event.type === 'keydown';
        }
    };
    return KeybordHelper;
}());
exports.KeybordHelper = KeybordHelper;
