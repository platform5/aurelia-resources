System.register(["./cube", "./delivery", "./restocking", "./shops", "./stock", "./supplier", "./supplyorder"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (cube_1_1) {
                exports_1({
                    "Cube": cube_1_1["default"]
                });
            },
            function (delivery_1_1) {
                exports_1({
                    "Delivery": delivery_1_1["default"]
                });
            },
            function (restocking_1_1) {
                exports_1({
                    "Restocking": restocking_1_1["default"]
                });
            },
            function (shops_1_1) {
                exports_1({
                    "Shops": shops_1_1["default"]
                });
            },
            function (stock_1_1) {
                exports_1({
                    "Stock": stock_1_1["default"]
                });
            },
            function (supplier_1_1) {
                exports_1({
                    "Supplier": supplier_1_1["default"]
                });
            },
            function (supplyorder_1_1) {
                exports_1({
                    "Supplyorder": supplyorder_1_1["default"]
                });
            }
        ],
        execute: function () {
        }
    };
});
