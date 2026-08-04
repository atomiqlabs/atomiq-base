import { SwapEvent, SwapEventType } from "./SwapEvent.js";
import { SwapData } from "../../../swaps/SwapData.js";
/**
 * Type guard for escrow swap refund events
 *
 * @param event
 * @category Events
 */
export declare function isRefundEvent<T extends SwapData>(event: unknown): event is RefundEvent<T>;
/**
 * Escrow swap Refund event representation, offerer refunded funds from the escrow
 *
 * @category Events
 */
export declare class RefundEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.REFUND> {
    readonly eventType: SwapEventType.REFUND;
}
