import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
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
