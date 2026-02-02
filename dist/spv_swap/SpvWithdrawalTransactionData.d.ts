/// <reference types="node" />
import { BtcTx } from "../btc/rpc/BitcoinRpc";
import { Buffer } from "buffer";
import { StorageObject } from "../storage/StorageObject";
/**
 * Execution data assigned to the withdrawal
 */
export type ExecutionData = {
    executionHash: string;
    executionExpiry: number;
};
/**
 * Represents the data of a single SPV vault (UTXO-controlled) vault withdrawal
 *
 * @category Swaps
 */
export declare abstract class SpvWithdrawalTransactionData implements StorageObject {
    /**
     * A mapping of deserializers for different spv vault withdrawal data types coming from different smart chain implementations
     */
    static deserializers: {
        [type: string]: new (serialized: any) => any;
    };
    /**
     * Deserializer parsing the chain-specific spv vault withdrawal data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize<T extends SpvWithdrawalTransactionData>(data: any): T | null;
    /**
     * Parses the data from the OP_RETURN script for a specific underlying chain
     *
     * @param data
     * @protected
     */
    protected abstract fromOpReturnData(data: Buffer): {
        recipient: string;
        rawAmounts: bigint[];
        executionHash?: string;
    };
    readonly recipient: string;
    readonly rawAmounts: bigint[];
    readonly callerFeeRate: bigint;
    readonly executionFeeRate: bigint;
    readonly frontingFeeRate: bigint;
    readonly executionHash?: string;
    readonly executionExpiry: number;
    /**
     * A bitcoin transaction which contains this vault withdrawal data
     */
    readonly btcTx: BtcTx;
    /**
     * Parses and creates a withdrawal data from the bitcoin transaction
     *
     * @throws {Error} If the bitcoin transaction has invalid formatting
     */
    constructor(btcTx: BtcTx);
    /**
     * @inheritDoc
     */
    serialize(): any;
    /**
     * Gets the recipient of the funds for this withdrawal
     */
    getRecipient(): string;
    /**
     * Checks if the provided recipient is the actual recipient of the funds in this withdrawal
     *
     * @param address
     */
    abstract isRecipient(address: string): boolean;
    /**
     * Computes a unique withdrawal fronting ID that is to be used when fronting the withdrawal
     */
    abstract getFrontingId(): string;
    /**
     * Returns the amounts of tokens that the recipient is gonna receive (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getOutputWithoutFees(): bigint[];
    /**
     * Returns the fee paid out to the caller which submits the withdrawal transaction data on the smart chain,
     *  the fee is paid out from all the respective tokens being withdrawn from the vault (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getCallerFee(): bigint[];
    /**
     * Returns the fee paid out to the fronter which fronts the actual withdrawal on the smart chain,
     *  the fee is paid out from all the respective tokens being withdrawn from the vault (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getFrontingFee(): bigint[];
    /**
     * Returns the fee that is transferred to the execution contract if swap+ execution action is assigned,
     *  (NOTE: This returns raw token amounts, which must be scaled by their respective vault configured
     *  multiplier to represent the actual amount of tokens)
     */
    getExecutionFee(): bigint[];
    /**
     * Returns the total amount of tokens withdrawn from the vault (including all the fees) (NOTE: This returns
     *  raw token amounts, which must be scaled by their respective vault configured multiplier to represent
     *  the actual amount of tokens)
     *
     * @throws {Error} In case the amounts overflow
     */
    getTotalOutput(): bigint[];
    /**
     * Returns the execution action to be scheduled via the execution contract (swap+) or `null` if none specified
     */
    getExecutionData(): ExecutionData | null;
    /**
     * Gets the transaction ID of the bitcoin transaction authorizing the withdrawal
     */
    getTxId(): string;
    /**
     * Gets the vault ownership UTXO that the bitcoin transaction spends
     */
    getSpentVaultUtxo(): string;
    /**
     * Gets the new vault ownership UTXO created by this transaction
     */
    getCreatedVaultUtxo(): string;
    /**
     * Gets the output locking script used for the new vault ownership UTXO
     */
    getNewVaultScript(): Buffer;
    /**
     * Gets the output btc amount (in satoshis) assigned to the new vault ownership UTXO
     */
    getNewVaultBtcAmount(): number;
}
