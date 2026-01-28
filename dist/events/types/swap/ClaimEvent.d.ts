import { SwapEvent, SwapEventType } from "./SwapEvent";
import { SwapData } from "../../../swaps/SwapData";
/**
 * Escrow swap Claim event representation, claimer claimed funds from the escrow
 *
 * @category Events
 */
export declare class ClaimEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.CLAIM> {
    readonly eventType: SwapEventType.CLAIM;
    /**
     * The result of the Claim event, usually either a secret pre-image or transaction hash
     */
    result: string;
    constructor(escrowHash: string, result: string);
}
