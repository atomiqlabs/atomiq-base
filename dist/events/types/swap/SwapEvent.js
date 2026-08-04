"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapEvent = exports.isSwapEvent = exports.SwapEventType = void 0;
const ChainEvent_js_1 = require("../ChainEvent.js");
/**
 * Enum of the different types of escrow-swap specific events
 *
 * @category Events
 */
var SwapEventType;
(function (SwapEventType) {
    SwapEventType[SwapEventType["INITIALIZE"] = 0] = "INITIALIZE";
    SwapEventType[SwapEventType["REFUND"] = 1] = "REFUND";
    SwapEventType[SwapEventType["CLAIM"] = 2] = "CLAIM";
})(SwapEventType = exports.SwapEventType || (exports.SwapEventType = {}));
/**
 * Type guard for escrow-specific on-chain events
 *
 * @param event
 * @category Events
 */
function isSwapEvent(event) {
    if (event == null || typeof (event) !== "object")
        return false;
    const swapEvent = event;
    return typeof (swapEvent.escrowHash) === "string" &&
        (swapEvent.eventType === SwapEventType.INITIALIZE ||
            swapEvent.eventType === SwapEventType.REFUND ||
            swapEvent.eventType === SwapEventType.CLAIM);
}
exports.isSwapEvent = isSwapEvent;
/**
 * Represents an escrow-specific event
 *
 * @category Events
 */
class SwapEvent extends ChainEvent_js_1.ChainEvent {
    constructor(escrowHash, contractVersion) {
        super(contractVersion);
        this.escrowHash = escrowHash;
    }
}
exports.SwapEvent = SwapEvent;
