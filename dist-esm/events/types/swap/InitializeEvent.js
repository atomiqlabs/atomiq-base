import { isSwapEvent, SwapEvent, SwapEventType } from "./SwapEvent.js";
import { ChainSwapType } from "../../../swaps/ChainSwapType.js";
/**
 * Type guard for escrow swap initialization events
 *
 * @param event
 * @category Events
 */
export function isInitializeEvent(event) {
    if (!isSwapEvent(event))
        return false;
    const initializeEvent = event;
    return initializeEvent.eventType === SwapEventType.INITIALIZE &&
        typeof (initializeEvent.swapType) === "number" &&
        Object.values(ChainSwapType).includes(initializeEvent.swapType) &&
        typeof (initializeEvent.swapData) === "function";
}
/**
 * Escrow swap Initialization event representation, emitted when an escrow is created
 *
 * @category Events
 */
export class InitializeEvent extends SwapEvent {
    constructor(escrowHash, swapType, swapData, contractVersion) {
        super(escrowHash, contractVersion);
        this.eventType = SwapEventType.INITIALIZE;
        this.swapType = swapType;
        this.swapData = swapData;
    }
}
