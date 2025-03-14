import {AbstractSigner, TransactionConfirmationOptions} from "../chains/ChainInterface";
import {SpvVaultData, SpvVaultTokenData} from "./SpvVaultData";
import {SpvWithdrawalTransactionData} from "./SpvWithdrawalTransactionData";
import {BtcStoredHeader} from "../btcrelay/types/BtcStoredHeader";
import {RelaySynchronizer} from "../btcrelay/synchronizer/RelaySynchronizer";
import {SpvWithdrawalState} from "./SpvWithdrawalState";
import {Buffer} from "buffer";
import {BtcTx} from "../btc/rpc/BitcoinRpc";


export interface SpvVaultContract<
    TX = any,
    Signer extends AbstractSigner = AbstractSigner,
    ChainId extends string = string,
    Data extends SpvVaultData = SpvVaultData,
    WithdrawalTX extends SpvWithdrawalTransactionData = SpvWithdrawalTransactionData
> {

    readonly chainId: ChainId;

    /**
     * Signs & sends transactions for opening a specific spv vault
     *
     * @param signer Signer to use for the transaction (must match owner in vault)
     * @param vault Vault to init
     * @param txOptions Transaction options
     */
    open(signer: Signer, vault: Data, txOptions?: TransactionConfirmationOptions): Promise<string>;

    /**
     * Returns the unsigned transactions for opening a specific spv vault
     *
     * @param signer Signer to use for the transaction (must match owner in vault)
     * @param vault Vault to init
     * @param feeRate Fee rate to use for the transaction
     */
    txsOpen(signer: string, vault: Data, feeRate?: string): Promise<TX[]>;

    /**
     * Signs & sends transactions for depositing funds to a specific spv vault
     *
     * @param signer Signer to use for the transaction (can be any)
     * @param vault Vault to deposit to
     * @param rawAmounts Raw amounts to deposit (these are unscaled)
     * @param txOptions Transaction options
     */
    deposit(signer: Signer, vault: Data, rawAmounts: bigint[], txOptions?: TransactionConfirmationOptions): Promise<string>;

    /**
     * Returns the unsigned transactions for depositing funds to a specific spv vault
     *
     * @param signer Signer to use for the transaction (can be any)
     * @param vault Vault to deposit to
     * @param rawAmounts Raw amounts to deposit (these are unscaled)
     * @param feeRate Fee rate to use for the transaction
     */
    txsDeposit(signer: string, vault: Data, rawAmounts: bigint[], feeRate?: string): Promise<TX[]>;

    /**
     * Signs & sends transactions for fronting liquidity for a specific withdrawal btc transaction
     *
     * @param signer Signer to use for the transaction (payer of the fronted liquidity)
     * @param vault Vault to deposit to
     * @param realWithdrawalTx Real withdrawal transaction data
     * @param withdrawSequence Sequence number of the withdrawal that is being fronted, this used as race condition
     *  prevention, such that fronting will not happen if the withdrawal tx is already used in claim()
     * @param txOptions Transaction options
     */
    frontLiquidity(signer: Signer, vault: Data, realWithdrawalTx: WithdrawalTX, withdrawSequence: number, txOptions?: TransactionConfirmationOptions): Promise<string>;

    /**
     * Returns the unsigned transactions for fronting liquidity for a specific withdrawal btc transaction
     *
     * @param signer Signer to use for the transaction (payer of the fronted liquidity)
     * @param vault Vault to deposit to
     * @param realWithdrawalTx Real withdrawal transaction data
     * @param withdrawSequence Sequence number of the withdrawal that is being fronted, this used as race condition
     *  prevention, such that fronting will not happen if the withdrawal tx is already used in claim()
     * @param feeRate Fee rate to use for the transaction
     */
    txsFrontLiquidity(signer: string, vault: Data, realWithdrawalTx: WithdrawalTX, withdrawSequence: number, feeRate?: string): Promise<TX[]>;

    /**
     * Signs & sends transactions for claiming the funds from a specific vault
     *
     * @param signer Signer to use for the transaction
     * @param vault Vault to claim from
     * @param tx Bitcoin transaction data for the withdrawal authorization
     * @param storedHeader Optional already retrieved stored header to use for proving
     * @param synchronizer Optiona synchronizer to be used if BTC relay contract is not synced up to the required blockheight
     * @param initAta Whether to initialize a token account if it doesn't exist (applies to e.g. Solana, with token specific ATAs)
     * @param txOptions Transaction options
     */
    claim(
        signer: Signer, vault: Data, tx: WithdrawalTX,
        storedHeader?: BtcStoredHeader<any>, synchronizer?: RelaySynchronizer<any, TX, any>,
        initAta?: boolean, txOptions?: TransactionConfirmationOptions
    ): Promise<string>;

    /**
     * Returns the unsigned transactions for claiming the funds from a specific vault
     *
     * @param signer Signer to use for the transaction
     * @param vault Vault to claim from
     * @param tx Bitcoin transaction data for the withdrawal authorization
     * @param storedHeader Optional already retrieved stored header to use for proving
     * @param synchronizer Optiona synchronizer to be used if BTC relay contract is not synced up to the required blockheight
     * @param initAta Whether to initialize a token account if it doesn't exist (applies to e.g. Solana, with token specific ATAs)
     * @param feeRate Fee rate to use for the transaction
     */
    txsClaim(
        signer: string, vault: Data, tx: WithdrawalTX,
        storedHeader?: BtcStoredHeader<any>, synchronizer?: RelaySynchronizer<any, TX, any>,
        initAta?: boolean, feeRate?: string
    ): Promise<TX[]>;

    /**
     * Creates vault data for a new vault
     *
     * @param vaultId Vault ID
     * @param utxo Utxo on which to assign the vault initially
     * @param confirmations Required number of bitcoin confirmations to be able to withdraw funds from the vault
     * @param tokenData Data about the tokens in the vault
     */
    createVaultData(vaultId: bigint, utxo: string, confirmations: number, tokenData: SpvVaultTokenData[]): Promise<Data>;

    /**
     * Returns current vault data
     *
     * @param owner Owner of the vault
     * @param vaultId Vault ID
     */
    getVaultData(owner: string, vaultId: bigint): Promise<Data>;

    /**
     * Returns current state of the withdrawal as specified by the bitcoin transaction ID
     *
     * @param btcTxId
     */
    getWithdrawalState(btcTxId: string): Promise<SpvWithdrawalState>;

    /**
     * Parses withdrawal data from a specific bitcoin transaction as identified by txId - needs to be already
     *  broadcasted in the mempool - returns null if bitcoin transaction is not found
     *
     * @param btcTxId
     */
    getWithdrawalData(btcTxId: string): Promise<WithdrawalTX | null>;

    /**
     * Parses withdrawal data from the parsed bitcoin transaction
     *
     * @param btcTx
     */
    getWithdrawalDataFromTx(btcTx: BtcTx): Promise<WithdrawalTX>;

    /**
     * Checks if given withdrawal tx is valid and correctly parses on-chain, throws error when there is any issue with
     *  the validation
     *
     * @param tx
     */
    checkWithdrawalTx(tx: WithdrawalTX): Promise<void>;

    /**
     * Serializes the withdrawal params to the OP_RETURN data
     *
     * @param recipient Recipient of the withdrawn tokens
     * @param rawAmounts Raw amount of tokens to withdraw
     * @param executionHash Optional execution hash of the actions to execute
     */
    toOpReturnData(recipient: string, rawAmounts: bigint[], executionHash?: string): Buffer;

    /**
     * Parses withdrawal params from OP_RETURN data
     *
     * @param data data as specified in the OP_RETURN output of the transaction
     */
    fromOpReturnData(data: Buffer): {recipient: string, rawAmounts: bigint[], executionHash: string};

}