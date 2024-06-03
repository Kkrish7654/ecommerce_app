"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
function sendResponse(statusCode, message, data, res) {
    return res.json({
        statusCode: statusCode,
        message: message,
        data: data,
    });
}
exports.sendResponse = sendResponse;
