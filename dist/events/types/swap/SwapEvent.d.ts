import { SwapData } from "../../../swaps/SwapData";
import { ChainEvent } from "../ChainEvent";
/**
 * Enum of the different types of escrow-swap specific events
 *
 * @category Events
 */
export declare enum SwapEventType {
    INITIALIZE = 0,
    REFUND = 1,
    CLAIM = 2
}
/**
 * Represents an escrow-specific event
 *
 * @category Events
 */
export declare abstract class SwapEvent<T extends SwapData, C extends SwapEventType = SwapEventType> extends ChainEvent<T> {
    abstract readonly eventType: C;
    /**
     * Identifier of the escrow, usually a hash of the full escrow swap data
     */
    escrowHash: string;
    constructor(escrowHash: string);
}
