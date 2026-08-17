import {SwapData} from "../../swaps/SwapData.js";
import {Message, MessageType} from "./Message.js";

/**
 * Type guard for swap claim witness messages
 *
 * @param message
 * @category Messenger
 */
export function isSwapClaimWitnessMessage<T extends SwapData>(message: unknown): message is SwapClaimWitnessMessage<T> {
    if(message==null || typeof(message)!=="object") return false;
    const claimWitnessMessage = message as Partial<SwapClaimWitnessMessage<T>>;
    return claimWitnessMessage.type===MessageType.SWAP_CLAIM_WITNESS &&
        claimWitnessMessage.swapData!=null &&
        typeof(claimWitnessMessage.swapData)==="object" &&
        typeof(claimWitnessMessage.witness)==="string" &&
        (claimWitnessMessage.chainId==null || typeof(claimWitnessMessage.chainId)==="string");
}

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
    /**
     * Optional smart chain chainId on which the escrow should be claimed
     */
    readonly chainId?: string;

    constructor(swapData: T, witness: string, chainId?: string) {
        super();
        this.swapData = swapData;
        this.witness = witness;
        this.chainId = chainId;
    }

    /**
     * @inheritDoc
     */
    serialize(): any {
        return {
            ...super.serialize(),
            swapData: this.swapData.serialize(),
            witness: this.witness,
            chainId: this.chainId
        }
    }

    /**
     * @internal
     */
    static deserialize<T extends SwapData>(obj: any): SwapClaimWitnessMessage<T> {
        if(obj==null || typeof(obj.witness)!=="string" || typeof(obj.swapData)!=="object") {
            throw new Error("Invalid format!");
        }
        return new SwapClaimWitnessMessage(SwapData.deserialize(obj.swapData), obj.witness, obj.chainId);
    }

}

// Deserializer registration must stay in this module (registering from Message.ts would create a circular
//  import, as this class extends Message). This module is therefore listed in the package.json "sideEffects"
//  array so bundlers keep this top-level registration even when no export of this module is referenced.
//  Note: Rollup/webpack honor sideEffects arrays (verified, incl. Vite dev + production paths); raw esbuild
//  ignores array form and may still drop this module if no export of it is used.
Message.deserializers[MessageType.SWAP_CLAIM_WITNESS] = SwapClaimWitnessMessage.deserialize;
