import { SwapData } from "../../swaps/SwapData";
import { Message, MessageType } from "./Message";
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
