import { SwapEvent, SwapEventType } from "./SwapEvent.js";
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
export class RefundEvent extends SwapEvent {
    constructor() {
        super(...arguments);
        this.eventType = SwapEventType.REFUND;
    }
}
