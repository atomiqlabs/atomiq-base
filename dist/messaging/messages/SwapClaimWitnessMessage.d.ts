import { SwapData } from "../../swaps/SwapData";
import { Message, MessageType } from "./Message";
export declare class SwapClaimWitnessMessage<T extends SwapData> extends Message {
    readonly type = MessageType.SWAP_CLAIM_WITNESS;
    swapData: T;
    witness: string;
    constructor(swapData: T, witness: string);
    serialize(): any;
    static deserialize<T extends SwapData>(obj: any): SwapClaimWitnessMessage<T>;
}
