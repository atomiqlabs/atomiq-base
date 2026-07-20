import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
/**
 * SPV vault (UTXO-controlled vault) Front event representation, an SPV vault withdrawal was fronted
 *
 * @category Events
 */
export class SpvVaultFrontEvent extends SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, recipient, executionHash, amounts, frontingAddress, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.FRONT;
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.frontingAddress = frontingAddress;
    }
}
