"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_logging_1 = require("aurelia-logging");
var log;
log = aurelia_logging_1.getLogger('helpers:image');
var ImageUtils = /** @class */ (function () {
    function ImageUtils() {
    }
    ImageUtils.loadB64 = function (src) {
        log.warn('ImageUtils is deprecated, use ImageHelpers instead');
        return new Promise(function (resolve, reject) {
            var instance = new ImageUtils();
            instance.image = new Image();
            instance.image.onload = function () {
                instance.initImage();
                resolve(instance);
            };
            instance.image.src = src;
        });
    };
    ImageUtils.loadFile = function (file) {
        log.warn('ImageUtils is deprecated, use ImageHelpers instead');
        return new Promise(function (resolve, reject) {
            try {
                var instance_1 = new ImageUtils();
                var reader = new FileReader();
                reader.onload = function (e) {
                    var src = e.target.result;
                    instance_1.image = new Image();
                    instance_1.image.onload = function () {
                        instance_1.initImage();
                        resolve(instance_1);
                    };
                    instance_1.image.src = src;
                };
                reader.readAsDataURL(file);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    ImageUtils.loadFileUrl = function (url) {
        log.warn('ImageUtils is deprecated, use ImageHelpers instead');
        return Promise.reject('Not yet implemented');
    };
    ImageUtils.prototype.initImage = function () {
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
    };
    ImageUtils.prototype.cover = function (width, height) {
        if (!this.image || !this.image.width || !this.image.height)
            throw new Error('Image not ready for cover');
        var originalRatio = this.image.width / this.image.height;
        var finalRatio = width / height;
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
        var ctx = this.canvas.getContext('2d');
        var x = 0;
        var y = 0;
        var sx = 0;
        var sy = 0;
        var swidth = 0;
        var sheight = 0;
        if (originalRatio === finalRatio) {
            // only resize
            swidth = this.image.width;
            sheight = this.image.height;
        }
        else if (originalRatio > finalRatio) {
            // keep height, crop width
            sheight = this.image.height;
            swidth = width * this.image.height / height;
            sx = (this.image.width - swidth) / 2;
        }
        else {
            // keep width, crop height
            swidth = this.image.width;
            sheight = height * this.image.width / width;
            sy = (this.image.height - sheight) / 2;
        }
        this.imageWidth = width;
        this.imageHeight = height;
        ctx.drawImage(this.image, sx, sy, swidth, sheight, x, y, width, height);
    };
    ImageUtils.prototype.resize = function (width, height) {
        if (width === ImageUtils.AUTO && height === ImageUtils.AUTO) {
            throw new Error('Width and height cannot be AUTO together');
        }
        if (height === ImageUtils.AUTO) {
            height = width / this.image.width * this.image.height;
        }
        if (width === ImageUtils.AUTO) {
            width = height / this.image.heigth * this.image.width;
        }
        return this.cover(width, height);
    };
    ImageUtils.prototype.toDataUrl = function () {
        return this.canvas.toDataURL('image/png');
    };
    return ImageUtils;
}());
exports.ImageUtils = ImageUtils;
var ImageHelpers = /** @class */ (function () {
    function ImageHelpers() {
        this.mimetype = 'image/png';
    }
    ImageHelpers.open = function (file) {
        var promise;
        if (typeof file === 'string') {
            if (file.indexOf('data:image/') === 0) {
                promise = ImageHelpers.openB64(file);
            }
            else {
                promise = ImageHelpers.openFileUrl(file);
            }
        }
        else if (file instanceof File || file instanceof Blob) {
            promise = ImageHelpers.openFile(file);
        }
        else {
            promise = Promise.reject('Invalid file');
        }
        return promise.then(function (instance) {
            var ctx = instance.createCtx(null, null);
            ctx.drawImage(instance.image, 0, 0);
            instance.imageAsCanvas = ctx.canvas;
            return instance;
        });
    };
    ImageHelpers.openB64 = function (src) {
        return new Promise(function (resolve, reject) {
            var instance = new ImageHelpers();
            instance.image = new Image();
            instance.image.onload = function () {
                resolve(instance);
            };
            instance.mimetype = ImageHelpers.mimetypeFromB64(src);
            if (instance.mimetype === null) {
                return reject(new Error('Undetectable mimetype'));
            }
            instance.image.src = src;
        });
    };
    ImageHelpers.openFile = function (file) {
        return new Promise(function (resolve, reject) {
            try {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var src = e.target.result;
                    var instance = new ImageHelpers();
                    instance.image = new Image();
                    instance.image.onload = function () {
                        ImageHelpers.mimetypeFromFile(file).then(function (mimetype) {
                            if (mimetype === null)
                                return reject(new Error('Undetectable mimetype'));
                            resolve(instance);
                        });
                    };
                    instance.image.src = src;
                };
                reader.readAsDataURL(file);
            }
            catch (e) {
                reject(e);
            }
        });
    };
    ImageHelpers.openFileUrl = function (url) {
        return Promise.reject('Not yet implemented');
    };
    ImageHelpers.mimetypeFromB64 = function (src) {
        var match = src.match(/(.*)image\/([a-z]{3,4})(.*)/);
        if (match) {
            return 'image/' + match[2];
        }
        else {
            return null;
        }
    };
    ImageHelpers.mimetypeFromFile = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var type = '';
                var dv = new DataView(e.target.result);
                var nume1 = dv.getUint8(0);
                var nume2 = dv.getUint8(1);
                var hex = nume1.toString(16) + nume2.toString(16);
                switch (hex) {
                    case '8950':
                        type = 'image/png';
                        break;
                    case '4749':
                        type = 'image/gif';
                        break;
                    case '424d':
                        type = 'image/bmp';
                        break;
                    case 'ffd8':
                        type = 'image/jpeg';
                        break;
                    default:
                        type = null;
                        break;
                }
                resolve(type);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    ImageHelpers.exifRotation = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) != 0xFFD8) {
                    return resolve(-2);
                }
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                    if (view.getUint16(offset + 2, false) <= 8)
                        return resolve(-1);
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) {
                            return resolve(-1);
                        }
                        var little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++) {
                            if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                                return resolve(view.getUint16(offset + (i * 12) + 8, little));
                            }
                        }
                    }
                    else if ((marker & 0xFF00) != 0xFF00) {
                        break;
                    }
                    else {
                        offset += view.getUint16(offset, false);
                    }
                }
                return resolve(-1);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    ImageHelpers.exifRotation2Degrees = function (rotation) {
        switch (rotation) {
            case 1: return 0;
            case 2: return 0;
            case 3: return -180;
            case 4: return -180;
            case 5: return 90;
            case 6: return 90;
            case 7: return -90;
            case 8: return -90;
            default: return 0;
        }
    };
    ImageHelpers.prototype.createCtx = function (width, height) {
        if (width === null)
            width = this.image.width;
        if (height === null)
            height = this.image.height;
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', width.toString());
        canvas.setAttribute('height', height.toString());
        var ctx = canvas.getContext('2d');
        if (this.mimetype === 'image/jpeg' || this.mimetype === 'image/jpg') {
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(0, 0, width, height);
        }
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        return ctx;
    };
    ImageHelpers.prototype.cover = function (width, height) {
        if (!this.imageAsCanvas || !this.imageAsCanvas.width || !this.imageAsCanvas.height)
            throw new Error('Image not ready for cover');
        var originalRatio = this.imageAsCanvas.width / this.imageAsCanvas.height;
        var finalRatio = width / height;
        var ctx = this.createCtx(width, height);
        var x = 0;
        var y = 0;
        var sx = 0;
        var sy = 0;
        var swidth = 0;
        var sheight = 0;
        if (originalRatio === finalRatio) {
            // only resize
            swidth = this.imageAsCanvas.width;
            sheight = this.imageAsCanvas.height;
        }
        else if (originalRatio > finalRatio) {
            // keep height, crop width
            sheight = this.imageAsCanvas.height;
            swidth = width * this.imageAsCanvas.height / height;
            sx = (this.imageAsCanvas.width - swidth) / 2;
        }
        else {
            // keep width, crop height
            swidth = this.imageAsCanvas.width;
            sheight = height * this.imageAsCanvas.width / width;
            sy = (this.imageAsCanvas.height - sheight) / 2;
        }
        /*this.imageAsCanvas.width = width;
        this.imageAsCanvas.height = height;*/
        ctx.drawImage(this.imageAsCanvas, sx, sy, swidth, sheight, x, y, width, height);
        this.imageAsCanvas = ctx.canvas;
    };
    ImageHelpers.prototype.resize = function (width, height) {
        if (!this.imageAsCanvas || !this.imageAsCanvas.width || !this.imageAsCanvas.height)
            throw new Error('Image not ready for resize');
        if (width === ImageHelpers.AUTO && height === ImageHelpers.AUTO) {
            throw new Error('Width and height cannot be AUTO together');
        }
        if (height === ImageHelpers.AUTO) {
            height = width / this.imageAsCanvas.width * this.imageAsCanvas.height;
        }
        if (width === ImageHelpers.AUTO) {
            width = height / this.imageAsCanvas.height * this.imageAsCanvas.width;
        }
        return this.cover(width, height);
    };
    ImageHelpers.prototype.rotate = function (angle) {
        if (angle === 0)
            return;
        if (!this.imageAsCanvas || !this.imageAsCanvas.width || !this.imageAsCanvas.height)
            throw new Error('Image not ready for cover');
        // only accept 90° rotations
        var mod = Math.abs(angle % 90);
        if (mod !== 0)
            throw new Error('Rotation can only be performed for 90° multiples');
        var flip = false; //(angle % 180 !== 0);
        var width = flip ? this.imageAsCanvas.height : this.imageAsCanvas.width;
        var height = flip ? this.imageAsCanvas.width : this.imageAsCanvas.height;
        var ctx = this.createCtx(width, height);
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.rotate(angle / 180 * Math.PI);
        ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
        ctx.drawImage(this.imageAsCanvas, 0, 0);
        this.imageAsCanvas = ctx.canvas;
    };
    ImageHelpers.prototype.toDataUrl = function () {
        var dataUrl = this.imageAsCanvas.toDataURL(this.mimetype, 0.4);
        return dataUrl;
    };
    ImageHelpers.prototype.toBlob = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.imageAsCanvas.toBlob(function (blob) {
                resolve(blob);
            }, _this.mimetype, 1);
        });
    };
    return ImageHelpers;
}());
exports.ImageHelpers = ImageHelpers;
