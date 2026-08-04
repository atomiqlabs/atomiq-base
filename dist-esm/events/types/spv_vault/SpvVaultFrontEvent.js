import { isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * Type guard for SPV vault front events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultFrontEvent(event) {
    if (!isSpvVaultEvent(event))
        return false;
    const frontEvent = event;
    return frontEvent.eventType === SpvVaultEventType.FRONT &&
        typeof (frontEvent.btcTxId) === "string" &&
        typeof (frontEvent.recipient) === "string" &&
        typeof (frontEvent.executionHash) === "string" &&
        Array.isArray(frontEvent.amounts) &&
        frontEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (frontEvent.frontingAddress) === "string";
}
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
