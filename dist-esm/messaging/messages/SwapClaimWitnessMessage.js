import { SwapData } from "../../swaps/SwapData.js";
import { Message, MessageType } from "./Message.js";
/**
 * Type guard for swap claim witness messages
 *
 * @param message
 * @category Messenger
 */
export function isSwapClaimWitnessMessage(message) {
    if (message == null || typeof (message) !== "object")
        return false;
    const claimWitnessMessage = message;
    return claimWitnessMessage.type === MessageType.SWAP_CLAIM_WITNESS &&
        claimWitnessMessage.swapData != null &&
        typeof (claimWitnessMessage.swapData) === "object" &&
        typeof (claimWitnessMessage.witness) === "string";
}
/**
 * Representation of an HTLC claim message, providing a swap pre-image in the `witness` field for a specific
 *  escrow {@link SwapData}
 *
 * @category Messenger
 */
export class SwapClaimWitnessMessage extends Message {
    constructor(swapData, witness) {
        super();
        this.type = MessageType.SWAP_CLAIM_WITNESS;
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
        return new SwapClaimWitnessMessage(SwapData.deserialize(obj.swapData), obj.witness);
    }
}
Message.deserializers[MessageType.SWAP_CLAIM_WITNESS] = SwapClaimWitnessMessage.deserialize;
