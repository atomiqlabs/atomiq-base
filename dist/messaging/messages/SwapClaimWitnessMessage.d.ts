import { SwapData } from "../../swaps/SwapData.js";
import { Message, MessageType } from "./Message.js";
/**
 * Representation of an HTLC claim message, providing a swap pre-image in the `witness` field for a specific
 *  escrow {@link SwapData}
 *
 * @category Messenger
 */
export declare class SwapClaimWitnessMessage<T extends SwapData> extends Message {
    readonly type = MessageType.SWAP_CLAIM_WITNESS;
    /**
     * Swap data of the escrow to claim
     */
    readonly swapData: T;
    /**
     * A witness allowing the claim of the escrow (i.e. a hash pre-image)
     */
    readonly witness: string;
    constructor(swapData: T, witness: string);
    /**
     * @inheritDoc
     */
    serialize(): any;
    /**
     * @internal
     */
    static deserialize<T extends SwapData>(obj: any): SwapClaimWitnessMessage<T>;
}
