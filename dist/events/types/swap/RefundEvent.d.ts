import { SwapEvent, SwapEventType } from "./SwapEvent.js";
import { SwapData } from "../../../swaps/SwapData.js";
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
export declare class RefundEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.REFUND> {
    readonly eventType: SwapEventType.REFUND;
}
