/**
 * @category Chains
 */
export type TransactionConfirmationOptions = {
    waitForConfirmation?: boolean;
    abortSignal?: AbortSignal;
    feeRate?: string;
};
/**
 * Defines of a signer, contains an address getter and optionally init() & stop() functions
 *  to initiate internal processes inside the signer (if required and exposed)
 *
 * @category Chains
 */
export type AbstractSigner = {
    type: "AtomiqAbstractSigner";
    getAddress: () => string;
    init?: () => Promise<void>;
    stop?: () => Promise<void>;
};
/**
 * Type guard for the {@link AbstractSigner} type
 *
 * @param val
 */
export declare function isAbstractSigner(val: any): val is AbstractSigner;
/**
 * An interface representing a smart chain, allowing basic operations on the chain and reading chain data
 *
 * @category Chains
 */
export interface ChainInterface<TX = any, SignedTX = any, Signer extends AbstractSigner = AbstractSigner, ChainId extends string = string, NativeSigner = any> {
    /**
     * Chain identifier string
     */
    readonly chainId: ChainId;
    /**
     * Returns the token balance of a specific address
     *
     * @param signer Address to check the balance of
     * @param token Token
     */
    getBalance(signer: string, token: string): Promise<bigint>;
    /**
     * Returns the token address of the native currency of the chain
     */
    getNativeCurrencyAddress(): string;
    /**
     * Checks if a given string is a valid wallet address
     *
     * @param address
     * @param lenient Whether a lenient parsing should be used (i.e. don't strictly enforce the Starknet address lengths)
     */
    isValidAddress(address: string, lenient?: boolean): boolean;
    /**
     * Normalizes a given address i.e. pads it to the specific size
     *
     * @param address
     */
    normalizeAddress(address: string): string;
    /**
     * Checks if a given string is a valid token identifier
     *
     * @param tokenIdentifier
     */
    isValidToken(tokenIdentifier: string): boolean;
    /**
     * Transfers the specific token to a given recipient
     *
     * @param signer Signer/owner of the tokens
     * @param token Token to transfer
     * @param amount Amount of token to transfer
     * @param dstAddress Destination address of the transfer
     * @param txOptions Transaction options
     */
    transfer(signer: Signer, token: string, amount: bigint, dstAddress: string, txOptions?: TransactionConfirmationOptions): Promise<string>;
    /**
     * Returns transactions for transferring a specific token to a given recipient
     *
     * @param signer Signer/owner of the tokens
     * @param token Token to transfer
     * @param amount Amount of token to transfer
     * @param dstAddress Destination address of the transfer
     * @param feeRate Optional fee rate to use for the transaction (fetched on-demand if not provided)
     */
    txsTransfer(signer: string, token: string, amount: bigint, dstAddress: string, feeRate?: string): Promise<TX[]>;
    /**
     * Serializes a given transaction to a string
     *
     * @param tx Transaction to serialize
     */
    serializeTx(tx: TX): Promise<string>;
    /**
     * Deserializes a transaction from string
     *
     * @param txData Serialized transaction data string
     */
    deserializeTx(txData: string): Promise<TX>;
    /**
     * Serializes a given transaction to a string
     *
     * @param signedTX Transaction to serialize
     */
    serializeSignedTx(signedTX: SignedTX): Promise<string>;
    /**
     * Deserializes a transaction from string
     *
     * @param txData Serialized transaction data string
     */
    deserializeSignedTx(txData: string): Promise<SignedTX>;
    /**
     * Returns the status of the given serialized transaction
     *
     * @param tx Serialized transaction
     */
    getTxStatus(tx: string): Promise<"not_found" | "pending" | "success" | "reverted">;
    /**
     * Returns the status of the given transactionId (use getTxStatus whenever possible, it's more reliable)
     *
     * @param txId Transaction ID
     */
    getTxIdStatus(txId: string): Promise<"not_found" | "pending" | "success" | "reverted">;
    /**
     * Returns the latest known finalized block data (this is a block with 100% certainty of not getting re-org, i.e.
     *  a block already committed on L1)
     */
    getFinalizedBlock(): Promise<{
        height: number;
        blockHash: string;
    }>;
    /**
     * Signs, sends a batch of transaction and optionally waits for their confirmation
     *
     * @param signer Signer to use for signing transactions
     * @param txs Transactions to send
     * @param waitForConfirmation Whether to wait for transaction confirmation (if parallel is not specified,
     *  every transaction's confirmation except the last one is awaited)
     * @param abortSignal Abort signal
     * @param parallel Whether to send all transactions in parallel or one by one (always waiting for the previous TX to confirm)
     * @param onBeforePublish Callback called before a tx is broadcast
     */
    sendAndConfirm(signer: Signer, txs: TX[], waitForConfirmation?: boolean, abortSignal?: AbortSignal, parallel?: boolean, onBeforePublish?: (txId: string, rawTx: string) => Promise<void>): Promise<string[]>;
    /**
     * Sends already signed transactions and optionally waits for their confirmation
     *
     * @param signedTxs Signed transactions to be sent
     * @param waitForConfirmation Whether to wait for transaction confirmation (if parallel is not specified,
     *  every transaction's confirmation except the last one is awaited)
     * @param abortSignal Abort signal
     * @param parallel Whether to send all transactions in parallel or one by one (always waiting for the previous TX to confirm)
     * @param onBeforePublish Callback called before a tx is broadcast
     */
    sendSignedAndConfirm(signedTxs: SignedTX[], waitForConfirmation?: boolean, abortSignal?: AbortSignal, parallel?: boolean, onBeforePublish?: (txId: string, rawTx: string) => Promise<void>): Promise<string[]>;
    /**
     * Callback called when transaction is being replaced (used for EVM, when fee is bumped on an unconfirmed tx)
     *
     * @param callback
     */
    onBeforeTxReplace(callback: (oldTx: string, oldTxId: string, newTx: string, newTxId: string) => Promise<void>): void;
    /**
     * Remove tx replace callback
     *
     * @param callback
     */
    offBeforeTxReplace(callback: (oldTx: string, oldTxId: string, newTx: string, newTxId: string) => Promise<void>): boolean;
    /**
     * Returns a random valid wallet address
     */
    randomAddress(): string;
    /**
     * Returns randomly generated signer
     */
    randomSigner(): Signer;
    /**
     * Wraps a native chain signer object to an atomiq-understandable AbstractSigner
     */
    wrapSigner(signer: NativeSigner): Promise<Signer>;
}
