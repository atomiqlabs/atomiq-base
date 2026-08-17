"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimEvent = exports.isClaimEvent = void 0;
const SwapEvent_js_1 = require("./SwapEvent.js");
/**
 * Type guard for escrow swap claim events
 *
 * @param event
 * @category Events
 */
function isClaimEvent(event) {
    if (!(0, SwapEvent_js_1.isSwapEvent)(event))
        return false;
    const claimEvent = event;
    return claimEvent.eventType === SwapEvent_js_1.SwapEventType.CLAIM && typeof (claimEvent.result) === "string";
}
exports.isClaimEvent = isClaimEvent;
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
