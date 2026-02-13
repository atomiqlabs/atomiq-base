import { StorageObject } from "../storage/StorageObject";
import { SpvWithdrawalTransactionData } from "./SpvWithdrawalTransactionData";
import { SpvVaultClaimEvent } from "../events/types/spv_vault/SpvVaultClaimEvent";
import { SpvVaultCloseEvent } from "../events/types/spv_vault/SpvVaultCloseEvent";
import { SpvVaultOpenEvent } from "../events/types/spv_vault/SpvVaultOpenEvent";
import { SpvVaultDepositEvent } from "../events/types/spv_vault/SpvVaultDepositEvent";
/**
 * Balance for a specific token inside a vault
 *
 * @category Chains
 */
export type SpvVaultTokenBalance = SpvVaultTokenData & {
    /**
     * A raw amount of the token, exactly as specified in the vault state
     */
    rawAmount: bigint;
    /**
     * An actual amount of funds in the vault, calculated as `rawAmount` * `multiplier`
     */
    scaledAmount: bigint;
};
/**
 * Configuration for a specific token inside an SPV vault (UTXO-controlled vault)
 *
 * @category Swaps
 */
export type SpvVaultTokenData = {
    /**
     * Address of the token used
     */
    token: string;
    /**
     * A multiplier to scale the token value with
     */
    multiplier: bigint;
};
/**
 * Represents the state of a single SPV vault (UTXO-controlled vault)
 *
 * @category Swaps
 */
export declare abstract class SpvVaultData<T extends SpvWithdrawalTransactionData = SpvWithdrawalTransactionData> implements StorageObject {
    /**
     * A mapping of deserializers for different spv vault data types coming from different smart chain implementations
     */
    static deserializers: {
        [type: string]: new (serialized: any) => any;
    };
    /**
     * Deserializer parsing the chain-specific spv vault data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize<T extends SpvVaultData>(data: any): T;
    /**
     * @inheritDoc
     */
    abstract serialize(): any;
    /**
     * Gets the owner of the vault
     */
    abstract getOwner(): string;
    /**
     * Gets the vault ID, this along with the owner uniquely identifies a vault
     */
    abstract getVaultId(): bigint;
    /**
     * Returns the configuration of the tokens supported by the vault
     */
    abstract getTokenData(): SpvVaultTokenData[];
    /**
     * Returns the token balance currently available in the vault
     */
    abstract getBalances(): SpvVaultTokenBalance[];
    /**
     * Returns the UTXO in [txId]:[vout] format which currently controls the vault
     */
    abstract getUtxo(): string;
    /**
     * Gets the required number of confirmations that a bitcoin transaction has to get in order for the
     *  vault claim (withdrawal) to be authorized
     */
    abstract getConfirmations(): number;
    /**
     * Returns the current number of claims (withdrawals) processed by the vault
     */
    abstract getWithdrawalCount(): number;
    /**
     * Returns the current number of deposits deposited into the vault
     */
    abstract getDepositCount(): number;
    /**
     * Checks whether a vault is opened and available to process claims (withdrawals)
     */
    abstract isOpened(): boolean;
    /**
     * Updates the state of the spv vault data from either an on-chain event or a {@link SpvWithdrawalTransactionData}
     *
     * @param withdrawalTxOrEvent
     */
    abstract updateState(withdrawalTxOrEvent: T | SpvVaultClaimEvent | SpvVaultCloseEvent | SpvVaultOpenEvent | SpvVaultDepositEvent): void;
    /**
     * A helper function which calculates the vault balances after processing an array of claims (withdrawals)
     *
     * @param priorWithdrawalTxs
     */
    calculateStateAfter(priorWithdrawalTxs: T[]): {
        withdrawalCount: number;
        balances: SpvVaultTokenBalance[];
    };
}
