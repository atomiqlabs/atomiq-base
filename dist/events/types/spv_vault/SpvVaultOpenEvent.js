"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultOpenEvent = exports.isSpvVaultOpenEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
/**
 * Type guard for SPV vault open events
 *
 * @param event
 * @category Events
 */
function isSpvVaultOpenEvent(event) {
    if (!(0, SpvVaultEvent_js_1.isSpvVaultEvent)(event))
        return false;
    const openEvent = event;
    return openEvent.eventType === SpvVaultEvent_js_1.SpvVaultEventType.OPEN &&
        typeof (openEvent.btcTxId) === "string" &&
        typeof (openEvent.vout) === "number";
}
exports.isSpvVaultOpenEvent = isSpvVaultOpenEvent;
/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
class SpvVaultOpenEvent extends SpvVaultEvent_js_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, vout, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_js_1.SpvVaultEventType.OPEN;
        this.btcTxId = btcTxId;
        this.vout = vout;
    }
}
exports.SpvVaultOpenEvent = SpvVaultOpenEvent;
