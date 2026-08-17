"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChainEvent = void 0;
const SwapEvent_js_1 = require("./swap/SwapEvent.js");
const SpvVaultEvent_js_1 = require("./spv_vault/SpvVaultEvent.js");
/**
 * Type guard for processed on-chain events
 *
 * Lives in its own module rather than in ChainEvent.ts: it needs to import the subtree guards, and the
 *  subtree base classes extend {@link ChainEvent}, so importing them from ChainEvent.ts would be a
 *  circular import that crashes at load time. ChainEvent itself has no required properties, so the
 *  guard is the union of the guards of its (currently two) subtrees - extend it when a new ChainEvent
 *  subtree is added.
 *
 * @param event
 * @category Events
 */
function isChainEvent(event) {
    return (0, SwapEvent_js_1.isSwapEvent)(event) || (0, SpvVaultEvent_js_1.isSpvVaultEvent)(event);
}
exports.isChainEvent = isChainEvent;
