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
