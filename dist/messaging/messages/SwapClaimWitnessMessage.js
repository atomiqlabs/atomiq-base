"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapClaimWitnessMessage = exports.isSwapClaimWitnessMessage = void 0;
const SwapData_js_1 = require("../../swaps/SwapData.js");
const Message_js_1 = require("./Message.js");
/**
 * Type guard for swap claim witness messages
 *
 * @param message
 * @category Messenger
 */
function isSwapClaimWitnessMessage(message) {
    if (message == null || typeof (message) !== "object")
        return false;
    const claimWitnessMessage = message;
    return claimWitnessMessage.type === Message_js_1.MessageType.SWAP_CLAIM_WITNESS &&
        claimWitnessMessage.swapData != null &&
        typeof (claimWitnessMessage.swapData) === "object" &&
        typeof (claimWitnessMessage.witness) === "string";
}
exports.isSwapClaimWitnessMessage = isSwapClaimWitnessMessage;
/**
 * Representation of an HTLC claim message, providing a swap pre-image in the `witness` field for a specific
 *  escrow {@link SwapData}
 *
 * @category Messenger
 */
class SwapClaimWitnessMessage extends Message_js_1.Message {
    constructor(swapData, witness) {
        super();
        this.type = Message_js_1.MessageType.SWAP_CLAIM_WITNESS;
        this.swapData = swapData;
        this.witness = witness;
    }
    /**
     * @inheritDoc
     */
    serialize() {
        return {
            ...super.serialize(),
            swapData: this.swapData.serialize(),
            witness: this.witness
        };
    }
    /**
     * @internal
     */
    static deserialize(obj) {
        if (obj == null || typeof (obj.witness) !== "string" || typeof (obj.swapData) !== "object") {
            throw new Error("Invalid format!");
        }
        return new SwapClaimWitnessMessage(SwapData_js_1.SwapData.deserialize(obj.swapData), obj.witness);
    }
}
exports.SwapClaimWitnessMessage = SwapClaimWitnessMessage;
Message_js_1.Message.deserializers[Message_js_1.MessageType.SWAP_CLAIM_WITNESS] = SwapClaimWitnessMessage.deserialize;
