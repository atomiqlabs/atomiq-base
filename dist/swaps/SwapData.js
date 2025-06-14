"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapData = void 0;
class SwapData {
    static deserialize(data) {
        if (SwapData.deserializers[data.type] != null) {
            return new SwapData.deserializers[data.type](data);
        }
        throw new Error(`No deserializer found for swap data type: ${data.type}`);
    }
}
exports.SwapData = SwapData;
SwapData.deserializers = {};
