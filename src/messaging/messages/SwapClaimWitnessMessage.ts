import {SwapData} from "../../swaps/SwapData";
import {Message, MessageType} from "./Message";

/**
 * Representation of an HTLC claim message, providing a swap pre-image in the `witness` field for a specific
 *  escrow {@link SwapData}
 *
 * @category Messenger
 */
export class SwapClaimWitnessMessage<T extends SwapData> extends Message {

    readonly type = MessageType.SWAP_CLAIM_WITNESS;
    /**
     * Swap data of the escrow to claim
     */
    readonly swapData: T;
    /**
     * A witness allowing the claim of the escrow (i.e. a hash pre-image)
     */
    readonly witness: string;

    constructor(swapData: T, witness: string) {
        super();
        this.swapData = swapData;
        this.witness = witness;
    }

    /**
     * @inheritDoc
     */
    serialize(): any {
        return {
            ...super.serialize(),
            swapData: this.swapData.serialize(),
            witness: this.witness
        }
    }

    /**
     * @internal
     */
    static deserialize<T extends SwapData>(obj: any): SwapClaimWitnessMessage<T> {
        if(obj==null || typeof(obj.witness)!=="string" || typeof(obj.swapData)!=="object") {
            throw new Error("Invalid format!");
        }
        return new SwapClaimWitnessMessage(SwapData.deserialize(obj.swapData), obj.witness);
    }

}

Message.deserializers[MessageType.SWAP_CLAIM_WITNESS] = SwapClaimWitnessMessage.deserialize;
