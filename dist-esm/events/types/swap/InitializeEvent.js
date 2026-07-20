import { SwapEvent, SwapEventType } from "./SwapEvent";
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
