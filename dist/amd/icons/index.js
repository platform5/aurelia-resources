define(["require", "exports", "./cube", "./delivery", "./restocking", "./shops", "./stock", "./supplier", "./supplyorder"], function (require, exports, cube_1, delivery_1, restocking_1, shops_1, stock_1, supplier_1, supplyorder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Supplyorder = exports.Supplier = exports.Stock = exports.Shops = exports.Restocking = exports.Delivery = exports.Cube = void 0;
    Object.defineProperty(exports, "Cube", { enumerable: true, get: function () { return cube_1.default; } });
    Object.defineProperty(exports, "Delivery", { enumerable: true, get: function () { return delivery_1.default; } });
    Object.defineProperty(exports, "Restocking", { enumerable: true, get: function () { return restocking_1.default; } });
    Object.defineProperty(exports, "Shops", { enumerable: true, get: function () { return shops_1.default; } });
    Object.defineProperty(exports, "Stock", { enumerable: true, get: function () { return stock_1.default; } });
    Object.defineProperty(exports, "Supplier", { enumerable: true, get: function () { return supplier_1.default; } });
    Object.defineProperty(exports, "Supplyorder", { enumerable: true, get: function () { return supplyorder_1.default; } });
});
