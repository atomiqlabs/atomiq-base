import {SwapEvent, SwapEventType} from "./SwapEvent";
import {SwapData} from "../../../swaps/SwapData";
import {ChainSwapType} from "../../../swaps/ChainSwapType";

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

    constructor(escrowHash: string, swapType: ChainSwapType, swapData: () => Promise<T | null>) {
        super(escrowHash);
        this.swapType = swapType;
        this.swapData = swapData;
    }

}
