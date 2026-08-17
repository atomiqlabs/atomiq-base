import { SwapEvent, SwapEventType } from "./SwapEvent.js";
import { SwapData } from "../../../swaps/SwapData.js";
import { ChainSwapType } from "../../../swaps/ChainSwapType.js";
/**
 * Type guard for escrow swap initialization events
 *
 * @param event
 * @category Events
 */
export declare function isInitializeEvent<T extends SwapData>(event: unknown): event is InitializeEvent<T>;
/**
 * Escrow swap Initialization event representation, emitted when an escrow is created
 *
 * @category Events
 */
export declare class InitializeEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.INITIALIZE> {
    readonly eventType: SwapEventType.INITIALIZE;
    /**
     * Type of the escrow swap that was created (depends on the claim handler)
     */
    swapType: ChainSwapType;
    /**
     * A getter for the actual full swap data that was used to initialize the escrow swap
     */
    swapData: () => Promise<T | null>;
    constructor(escrowHash: string, swapType: ChainSwapType, swapData: () => Promise<T | null>, contractVersion?: string);
}
