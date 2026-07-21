"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeEvent = void 0;
const SwapEvent_js_1 = require("./SwapEvent.js");
/**
 * Escrow swap Initialization event representation, emitted when an escrow is created
 *
 * @category Events
 */
class InitializeEvent extends SwapEvent_js_1.SwapEvent {
    constructor(escrowHash, swapType, swapData, contractVersion) {
        super(escrowHash, contractVersion);
        this.eventType = SwapEvent_js_1.SwapEventType.INITIALIZE;
        this.swapType = swapType;
        this.swapData = swapData;
    }
}
exports.InitializeEvent = InitializeEvent;
