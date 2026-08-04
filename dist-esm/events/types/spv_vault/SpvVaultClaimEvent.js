import { isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * Type guard for SPV vault claim events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultClaimEvent(event) {
    if (!isSpvVaultEvent(event))
        return false;
    const claimEvent = event;
    return claimEvent.eventType === SpvVaultEventType.CLAIM &&
        typeof (claimEvent.btcTxId) === "string" &&
        typeof (claimEvent.recipient) === "string" &&
        typeof (claimEvent.executionHash) === "string" &&
        Array.isArray(claimEvent.amounts) &&
        claimEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (claimEvent.caller) === "string" &&
        typeof (claimEvent.frontingAddress) === "string" &&
        typeof (claimEvent.withdrawCount) === "number";
}
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
