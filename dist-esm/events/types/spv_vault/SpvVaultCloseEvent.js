import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * SPV vault (UTXO-controlled vault) Close event representation, a withdrawal with invalid transaction
 *  spending the vault UTXO but not correctly comitting the data has been made, this returns the full
 *  balance of the vault back to its owner.
 *
 * @category Events
 */
export class SpvVaultCloseEvent extends SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, error, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.CLOSE;
        this.btcTxId = btcTxId;
        this.error = error;
    }
}
