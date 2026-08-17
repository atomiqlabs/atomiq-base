import {isSwapEvent, SwapEvent, SwapEventType} from "./SwapEvent.js";
import {SwapData} from "../../../swaps/SwapData.js";

/**
 * Type guard for escrow swap claim events
 *
 * @param event
 * @category Events
 */
export function isClaimEvent<T extends SwapData>(event: unknown): event is ClaimEvent<T> {
    if(!isSwapEvent<T>(event)) return false;
    const claimEvent = event as Partial<ClaimEvent<T>>;
    return claimEvent.eventType===SwapEventType.CLAIM && typeof(claimEvent.result)==="string";
}

/**
 * Escrow swap Claim event representation, claimer claimed funds from the escrow
 *
 * @category Events
 */
export class ClaimEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.CLAIM> {
    readonly eventType: SwapEventType.CLAIM = SwapEventType.CLAIM;

    /**
     * The result of the Claim event, usually either a secret pre-image or transaction hash
     */
    result: string;

    constructor(escrowHash: string, result: string, contractVersion?: string) {
        super(escrowHash, contractVersion);
        this.result = result;
    }

}
