"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultCloseEvent = void 0;
const SpvVaultEvent_1 = require("./SpvVaultEvent");
/**
 * SPV vault (UTXO-controlled vault) Close event representation, a withdrawal with invalid transaction
 *  spending the vault UTXO but not correctly comitting the data has been made, this returns the full
 *  balance of the vault back to its owner.
 *
 * @category Events
 */
class SpvVaultCloseEvent extends SpvVaultEvent_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, error) {
        super(owner, vaultId);
        this.eventType = SpvVaultEvent_1.SpvVaultEventType.CLOSE;
        this.btcTxId = btcTxId;
        this.error = error;
    }
}
exports.SpvVaultCloseEvent = SpvVaultCloseEvent;
