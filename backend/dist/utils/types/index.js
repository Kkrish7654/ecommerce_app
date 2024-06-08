"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatus = void 0;
var orderStatus;
(function (orderStatus) {
    orderStatus["PENDING"] = "PENDING";
    orderStatus["PROCESSING"] = "PROCESSING";
    orderStatus["SHIPPED"] = "SHIPPED";
    orderStatus["DELIVERED"] = "DELIVERED";
    orderStatus["CANCELLED"] = "CANCELLED";
})(orderStatus || (exports.orderStatus = orderStatus = {}));
