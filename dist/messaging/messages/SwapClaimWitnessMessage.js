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
        typeof (claimWitnessMessage.witness) === "string" &&
        (claimWitnessMessage.chainId == null || typeof (claimWitnessMessage.chainId) === "string");
}
exports.isSwapClaimWitnessMessage = isSwapClaimWitnessMessage;
/**
 * Representation of an HTLC claim message, providing a swap pre-image in the `witness` field for a specific
 *  escrow {@link SwapData}
 *
 * @category Messenger
 */
class SwapClaimWitnessMessage extends Message_js_1.Message {
    constructor(swapData, witness, chainId) {
        super();
        this.type = Message_js_1.MessageType.SWAP_CLAIM_WITNESS;
        this.swapData = swapData;
        this.witness = witness;
        this.chainId = chainId;
    }
    /**
     * @inheritDoc
     */
    serialize() {
        return {
            ...super.serialize(),
            swapData: this.swapData.serialize(),
            witness: this.witness,
            chainId: this.chainId
        };
    }
    /**
     * @internal
     */
    static deserialize(obj) {
        if (obj == null || typeof (obj.witness) !== "string" || typeof (obj.swapData) !== "object") {
            throw new Error("Invalid format!");
        }
        return new SwapClaimWitnessMessage(SwapData_js_1.SwapData.deserialize(obj.swapData), obj.witness, obj.chainId);
    }
}
exports.SwapClaimWitnessMessage = SwapClaimWitnessMessage;
// Deserializer registration must stay in this module (registering from Message.ts would create a circular
//  import, as this class extends Message). This module is therefore listed in the package.json "sideEffects"
//  array so bundlers keep this top-level registration even when no export of this module is referenced.
//  Note: Rollup/webpack honor sideEffects arrays (verified, incl. Vite dev + production paths); raw esbuild
//  ignores array form and may still drop this module if no export of it is used.
Message_js_1.Message.deserializers[Message_js_1.MessageType.SWAP_CLAIM_WITNESS] = SwapClaimWitnessMessage.deserialize;
