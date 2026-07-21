"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimEvent = void 0;
const SwapEvent_js_1 = require("./SwapEvent.js");
/**
 * Escrow swap Claim event representation, claimer claimed funds from the escrow
 *
 * @category Events
 */
class ClaimEvent extends SwapEvent_js_1.SwapEvent {
    constructor(escrowHash, result, contractVersion) {
        super(escrowHash, contractVersion);
        this.eventType = SwapEvent_js_1.SwapEventType.CLAIM;
        this.result = result;
    }
}
exports.ClaimEvent = ClaimEvent;
