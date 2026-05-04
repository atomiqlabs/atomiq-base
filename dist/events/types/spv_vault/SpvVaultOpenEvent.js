"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultOpenEvent = void 0;
const SpvVaultEvent_1 = require("./SpvVaultEvent");
/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
class SpvVaultOpenEvent extends SpvVaultEvent_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, vout, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_1.SpvVaultEventType.OPEN;
        this.btcTxId = btcTxId;
        this.vout = vout;
    }
}
exports.SpvVaultOpenEvent = SpvVaultOpenEvent;
