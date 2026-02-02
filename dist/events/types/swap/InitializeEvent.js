"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeEvent = void 0;
const SwapEvent_1 = require("./SwapEvent");
/**
 * Escrow swap Initialization event representation, emitted when an escrow is created
 *
 * @category Events
 */
class InitializeEvent extends SwapEvent_1.SwapEvent {
    constructor(escrowHash, swapType, swapData) {
        super(escrowHash);
        this.eventType = SwapEvent_1.SwapEventType.INITIALIZE;
        this.swapType = swapType;
        this.swapData = swapData;
    }
}
exports.InitializeEvent = InitializeEvent;
