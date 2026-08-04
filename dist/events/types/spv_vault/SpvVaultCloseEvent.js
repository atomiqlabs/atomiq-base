"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultCloseEvent = exports.isSpvVaultCloseEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
/**
 * Type guard for SPV vault close events
 *
 * @param event
 * @category Events
 */
function isSpvVaultCloseEvent(event) {
    if (!(0, SpvVaultEvent_js_1.isSpvVaultEvent)(event))
        return false;
    const closeEvent = event;
    return closeEvent.eventType === SpvVaultEvent_js_1.SpvVaultEventType.CLOSE &&
        typeof (closeEvent.btcTxId) === "string" &&
        typeof (closeEvent.error) === "string";
}
exports.isSpvVaultCloseEvent = isSpvVaultCloseEvent;
/**
 * SPV vault (UTXO-controlled vault) Close event representation, a withdrawal with invalid transaction
 *  spending the vault UTXO but not correctly comitting the data has been made, this returns the full
 *  balance of the vault back to its owner.
 *
 * @category Events
 */
class SpvVaultCloseEvent extends SpvVaultEvent_js_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, error, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_js_1.SpvVaultEventType.CLOSE;
        this.btcTxId = btcTxId;
        this.error = error;
    }
}
exports.SpvVaultCloseEvent = SpvVaultCloseEvent;
