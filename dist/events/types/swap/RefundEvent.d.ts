import { SwapEvent, SwapEventType } from "./SwapEvent";
import { SwapData } from "../../../swaps/SwapData";
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
export declare class RefundEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.REFUND> {
    readonly eventType: SwapEventType.REFUND;
}
