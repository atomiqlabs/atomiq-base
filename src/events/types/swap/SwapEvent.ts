import {SwapData} from "../../../swaps/SwapData.js";
import {ChainEvent} from "../ChainEvent.js";

/**
 * Enum of the different types of escrow-swap specific events
 *
 * @category Events
 */
export enum SwapEventType {
    INITIALIZE = 0,
    REFUND = 1,
    CLAIM = 2
}

/**
 * Type guard for escrow-specific on-chain events
 *
 * @param event
 * @category Events
 */
export function isSwapEvent<T extends SwapData>(event: unknown): event is SwapEvent<T> {
    if(event==null || typeof(event)!=="object") return false;
    const swapEvent = event as Partial<SwapEvent<T>>;
    return typeof(swapEvent.escrowHash)==="string" &&
        (swapEvent.eventType===SwapEventType.INITIALIZE ||
            swapEvent.eventType===SwapEventType.REFUND ||
            swapEvent.eventType===SwapEventType.CLAIM);
}

/**
 * Represents an escrow-specific event
 *
 * @category Events
 */
export abstract class SwapEvent<T extends SwapData, C extends SwapEventType = SwapEventType> extends ChainEvent<T> {
    abstract readonly eventType: C;

    /**
     * Identifier of the escrow, usually a hash of the full escrow swap data
     */
    escrowHash: string;

    constructor(escrowHash: string, contractVersion?: string) {
        super(contractVersion);
        this.escrowHash = escrowHash;
    }

}
