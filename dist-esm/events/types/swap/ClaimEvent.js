import { SwapEvent, SwapEventType } from "./SwapEvent";
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
