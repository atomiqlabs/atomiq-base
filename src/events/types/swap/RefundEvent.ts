import {SwapEvent, SwapEventType} from "./SwapEvent";
import {SwapData} from "../../../swaps/SwapData";

export class RefundEvent<T extends SwapData> extends SwapEvent<T, SwapEventType.REFUND> {
    readonly eventType: SwapEventType.REFUND = SwapEventType.REFUND;
}
