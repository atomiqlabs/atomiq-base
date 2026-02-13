"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapData = void 0;
/**
 * Represents full escrow swap data and parameters
 *
 * @category Chains
 */
class SwapData {
    /**
     * Deserializer parsing the chain-specific escrow swap data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize(data) {
        const deserializer = SwapData.deserializers[data.type];
        if (deserializer != null) {
            return new deserializer(data);
        }
        throw new Error(`No deserializer found for swap data type: ${data.type}`);
    }
    /**
     * Retrieves a hint providing an HTLC hash from the extra data provided, or `null` if no extra data
     *  has been provided when creating the escrow
     */
    getHTLCHashHint() {
        return null;
    }
    /**
     * Checks whether the escrow contains an execution action (swap+)
     */
    hasSuccessAction() {
        return false;
    }
}
exports.SwapData = SwapData;
/**
 * A mapping of deserializers for different escrow swap data types coming from different smart chain implementations
 */
SwapData.deserializers = {};
