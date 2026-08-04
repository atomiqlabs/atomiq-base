"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundEvent = exports.isRefundEvent = void 0;
const SwapEvent_js_1 = require("./SwapEvent.js");
/**
 * Type guard for escrow swap refund events
 *
 * @param event
 * @category Events
 */
function isRefundEvent(event) {
    return (0, SwapEvent_js_1.isSwapEvent)(event) && event.eventType === SwapEvent_js_1.SwapEventType.REFUND;
}
exports.isRefundEvent = isRefundEvent;
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
class RefundEvent extends SwapEvent_js_1.SwapEvent {
    constructor() {
        super(...arguments);
        this.eventType = SwapEvent_js_1.SwapEventType.REFUND;
    }
}
exports.RefundEvent = RefundEvent;
