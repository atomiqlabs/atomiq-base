import { isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * Type guard for SPV vault deposit events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultDepositEvent(event) {
    if (!isSpvVaultEvent(event))
        return false;
    const depositEvent = event;
    return depositEvent.eventType === SpvVaultEventType.DEPOSIT &&
        Array.isArray(depositEvent.amounts) &&
        depositEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (depositEvent.depositCount) === "number";
}
/**
 * SPV vault (UTXO-controlled vault) Deposit event representation, additional funds have been deposited to the SPV vault
 *
 * @category Events
 */
export class SpvVaultDepositEvent extends SpvVaultEvent {
    constructor(owner, vaultId, amounts, depositCount, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.DEPOSIT;
        this.amounts = amounts;
        this.depositCount = depositCount;
    }
}
