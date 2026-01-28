"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundEvent = void 0;
const SwapEvent_1 = require("./SwapEvent");
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
class RefundEvent extends SwapEvent_1.SwapEvent {
    constructor() {
        super(...arguments);
        this.eventType = SwapEvent_1.SwapEventType.REFUND;
    }
}
exports.RefundEvent = RefundEvent;
