"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeEvent = exports.isInitializeEvent = void 0;
const SwapEvent_js_1 = require("./SwapEvent.js");
const ChainSwapType_js_1 = require("../../../swaps/ChainSwapType.js");
/**
 * Type guard for escrow swap initialization events
 *
 * @param event
 * @category Events
 */
function isInitializeEvent(event) {
    if (!(0, SwapEvent_js_1.isSwapEvent)(event))
        return false;
    const initializeEvent = event;
    return initializeEvent.eventType === SwapEvent_js_1.SwapEventType.INITIALIZE &&
        typeof (initializeEvent.swapType) === "number" &&
        Object.values(ChainSwapType_js_1.ChainSwapType).includes(initializeEvent.swapType) &&
        typeof (initializeEvent.swapData) === "function";
}
exports.isInitializeEvent = isInitializeEvent;
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
