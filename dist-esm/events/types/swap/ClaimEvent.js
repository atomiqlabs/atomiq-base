import { isSwapEvent, SwapEvent, SwapEventType } from "./SwapEvent.js";
/**
 * Type guard for escrow swap claim events
 *
 * @param event
 * @category Events
 */
export function isClaimEvent(event) {
    if (!isSwapEvent(event))
        return false;
    const claimEvent = event;
    return claimEvent.eventType === SwapEventType.CLAIM && typeof (claimEvent.result) === "string";
}
/**
 * Escrow swap Claim event representation, claimer claimed funds from the escrow
 *
 * @category Events
 */
export class ClaimEvent extends SwapEvent {
    constructor(escrowHash, result, contractVersion) {
        super(escrowHash, contractVersion);
        this.eventType = SwapEventType.CLAIM;
        this.result = result;
    }
}
