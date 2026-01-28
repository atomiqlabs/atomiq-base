"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimEvent = void 0;
const SwapEvent_1 = require("./SwapEvent");
/**
 * Escrow swap Claim event representation, claimer claimed funds from the escrow
 *
 * @category Events
 */
class ClaimEvent extends SwapEvent_1.SwapEvent {
    constructor(escrowHash, result) {
        super(escrowHash);
        this.eventType = SwapEvent_1.SwapEventType.CLAIM;
        this.result = result;
    }
}
exports.ClaimEvent = ClaimEvent;
