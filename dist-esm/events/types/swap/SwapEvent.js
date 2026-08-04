import { ChainEvent } from "../ChainEvent.js";
/**
 * Enum of the different types of escrow-swap specific events
 *
 * @category Events
 */
export var SwapEventType;
(function (SwapEventType) {
    SwapEventType[SwapEventType["INITIALIZE"] = 0] = "INITIALIZE";
    SwapEventType[SwapEventType["REFUND"] = 1] = "REFUND";
    SwapEventType[SwapEventType["CLAIM"] = 2] = "CLAIM";
})(SwapEventType || (SwapEventType = {}));
/**
 * Type guard for escrow-specific on-chain events
 *
 * @param event
 * @category Events
 */
export function isSwapEvent(event) {
    if (event == null || typeof (event) !== "object")
        return false;
    const swapEvent = event;
    return typeof (swapEvent.escrowHash) === "string" &&
        (swapEvent.eventType === SwapEventType.INITIALIZE ||
            swapEvent.eventType === SwapEventType.REFUND ||
            swapEvent.eventType === SwapEventType.CLAIM);
}
/**
 * Represents an escrow-specific event
 *
 * @category Events
 */
export class SwapEvent extends ChainEvent {
    constructor(escrowHash, contractVersion) {
        super(contractVersion);
        this.escrowHash = escrowHash;
    }
}
