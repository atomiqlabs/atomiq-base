import {isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType} from "./SpvVaultEvent.js";

/**
 * Type guard for SPV vault deposit events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultDepositEvent(event: unknown): event is SpvVaultDepositEvent {
    if(!isSpvVaultEvent(event)) return false;
    const depositEvent = event as Partial<SpvVaultDepositEvent>;
    return depositEvent.eventType===SpvVaultEventType.DEPOSIT &&
        Array.isArray(depositEvent.amounts) &&
        depositEvent.amounts.every(amount => typeof(amount)==="bigint") &&
        typeof(depositEvent.depositCount)==="number";
}


/**
 * SPV vault (UTXO-controlled vault) Deposit event representation, additional funds have been deposited to the SPV vault
 *
 * @category Events
 */
export class SpvVaultDepositEvent extends SpvVaultEvent<SpvVaultEventType.DEPOSIT> {

    readonly eventType = SpvVaultEventType.DEPOSIT;


    /**
     * Scaled token amounts that have been deposited to the vault (NOTE: These are scaled by the corresponding vault-defined
     *  multiplier for the tokens)
     */
    amounts: bigint[];
    /**
     * The sequence of this deposit - i.e. the total number of deposits done before this one
     */
    depositCount: number;

    constructor(owner: string, vaultId: bigint, amounts: bigint[], depositCount: number, contractVersion?: string) {
        super(owner, vaultId, contractVersion);
        this.amounts = amounts;
        this.depositCount = depositCount;
    }

}
