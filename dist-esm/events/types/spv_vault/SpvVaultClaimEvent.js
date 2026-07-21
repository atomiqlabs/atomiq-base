import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * SPV vault (UTXO-controlled vault) Claim event representation, a valid withdrawal from an SPV vault
 *
 * @category Events
 */
export class SpvVaultClaimEvent extends SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, recipient, executionHash, amounts, caller, frontingAddress, withdrawCount, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.CLAIM;
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.caller = caller;
        this.frontingAddress = frontingAddress;
        this.withdrawCount = withdrawCount;
    }
}
