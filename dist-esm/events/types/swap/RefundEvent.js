import { isSwapEvent, SwapEvent, SwapEventType } from "./SwapEvent.js";
/**
 * Type guard for escrow swap refund events
 *
 * @param event
 * @category Events
 */
export function isRefundEvent(event) {
    return isSwapEvent(event) && event.eventType === SwapEventType.REFUND;
}
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
