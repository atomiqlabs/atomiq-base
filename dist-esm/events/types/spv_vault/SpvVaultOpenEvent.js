import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
export class SpvVaultOpenEvent extends SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, vout, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.OPEN;
        this.btcTxId = btcTxId;
        this.vout = vout;
    }
}
