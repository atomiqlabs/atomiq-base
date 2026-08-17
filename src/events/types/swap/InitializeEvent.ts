import {isSwapEvent, SwapEvent, SwapEventType} from "./SwapEvent.js";
import {SwapData} from "../../../swaps/SwapData.js";
import {ChainSwapType} from "../../../swaps/ChainSwapType.js";

/**
 * Type guard for escrow swap initialization events
 *
 * @param event
 * @category Events
 */
export function isInitializeEvent<T extends SwapData>(event: unknown): event is InitializeEvent<T> {
    if(!isSwapEvent<T>(event)) return false;
    const initializeEvent = event as Partial<InitializeEvent<T>>;
    return initializeEvent.eventType===SwapEventType.INITIALIZE &&
        typeof(initializeEvent.swapType)==="number" &&
        Object.values(ChainSwapType).includes(initializeEvent.swapType) &&
        typeof(initializeEvent.swapData)==="function";
}

/**
 * Escrow swap Initialization event representation, emitted when an escrow is created
 *
 * @category Events
 */
export class InitializeEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.INITIALIZE> {
    readonly eventType: SwapEventType.INITIALIZE = SwapEventType.INITIALIZE;

    /**
     * Type of the escrow swap that was created (depends on the claim handler)
     */
    swapType: ChainSwapType;
    /**
     * A getter for the actual full swap data that was used to initialize the escrow swap
     */
    swapData: () => Promise<T | null>;

    constructor(escrowHash: string, swapType: ChainSwapType, swapData: () => Promise<T | null>, contractVersion?: string) {
        super(escrowHash, contractVersion);
        this.swapType = swapType;
        this.swapData = swapData;
    }

}
