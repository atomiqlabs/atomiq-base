"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapClaimWitnessMessage = void 0;
const SwapData_js_1 = require("../../swaps/SwapData.js");
const Message_js_1 = require("./Message.js");
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
