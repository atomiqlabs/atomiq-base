import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
/**
 * SPV vault (UTXO-controlled vault) Deposit event representation, additional funds have been deposited to the SPV vault
 *
 * @category Events
 */
export declare class SpvVaultDepositEvent extends SpvVaultEvent<SpvVaultEventType.DEPOSIT> {
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
    constructor(owner: string, vaultId: bigint, amounts: bigint[], depositCount: number);
}
