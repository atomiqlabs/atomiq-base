import {BtcBlock} from "../../btcrelay/types/BtcBlock";
import {Buffer} from "buffer";

/**
 * A type defining a bitcoin transaction output
 *
 * @category Bitcoin
 */
export type BtcVout = {
    /**
     * Value of the output in satoshis
     */
    value: number,
    /**
     * Position of the output in the transaction
     */
    n: number,
    /**
     * Public key script defining spend conditions of the output
     */
    scriptPubKey: {
        asm?: string,
        hex: string
    }
};

/**
 * A type defining a bitcoin transaction input
 *
 * @category Bitcoin
 */
export type BtcVin = {
    /**
     * Spent UTXO's transaction id
     */
    txid: string,
    /**
     * Spent UTXO's output position in the transaction
     */
    vout: number,
    /**
     * Signature scripting satisfying the spend conditions
     */
    scriptSig: {
        asm?: string,
        hex: string
    },
    /**
     * Input nSequence value
     */
    sequence: number,
    /**
     * Witness data pushes in hexadecimal format
     */
    txinwitness: string[]
};

/**
 * A type defining a bitcoin transaction
 *
 * @category Bitcoin
 */
export type BtcTx = {
    /**
     * A blockhash which includes this transaction, or undefined for unconfirmed txns
     */
    blockhash?: string,
    /**
     * A number of confirmation that the block containing the transaction has, or undefined for unconfirmed txns
     */
    confirmations?: number,
    /**
     * Transaction size in vBytes (virtual bytes)
     */
    vsize: number,
    /**
     * Transactions txId (reversed double sha256 hash of the transaction data excluding witness)
     */
    txid: string,
    /**
     * Transaction encoded in hexadecimal format, without witness data (so the transaction is in legacy format)
     */
    hex: string,
    /**
     * Full transaction encoded in hexadecimal format, with witness data
     */
    raw: string,
    /**
     * Transaction's locktime field
     */
    locktime: number,
    /**
     * Transaction's version
     */
    version: number,

    /**
     * An array of outputs in the transactions
     */
    outs: BtcVout[],
    /**
     * An array of inputs in the transaction
     */
    ins: BtcVin[]
};

/**
 * Representing a bitcoin block with all the transactions included
 *
 * @category Bitcoin
 */
export type BtcBlockWithTxs = {
    height: number,
    hash: string,
    tx: BtcTx[]
};

/**
 * Information about the bitcoin RPCs synchronization status
 *
 * @category Bitcoin
 */
export type BtcSyncInfo = {
    /**
     * Whether the RPC is doing an IBD (initial block download)
     */
    ibd: boolean,
    /**
     * How many blockheaders are available
     */
    headers: number,
    /**
     * How many full bitcoin blocks are available
     */
    blocks: number,
    /**
     * Progress of the full chain verification in percentages (0..100)
     */
    verificationProgress: number
}

/**
 * An interface for Bitcoin RPC, providing access to Bitcoin on-chain data
 *
 * @category Bitcoin
 */
export interface BitcoinRpc<T extends BtcBlock> {

    /**
     * Checks whether a given blockhash is part of the canonical chain
     *
     * @param blockhash
     */
    isInMainChain(blockhash: string): Promise<boolean>;

    /**
     * Gets the bitcoin blockheader as identifier by the passed blockhash
     *
     * @param blockhash
     */
    getBlockHeader(blockhash: string): Promise<T | null>;

    /**
     * Returns a merkle proof for a given transaction
     *
     * @param txId Identifies the transaction
     * @param blockhash The blockhash in which the transaction was included
     */
    getMerkleProof(txId: string, blockhash: string): Promise<{
        reversedTxId: Buffer,
        pos: number,
        merkle: Buffer[],
        blockheight: number
    } | null>;

    /**
     * Returns the bitcoin transaction as identified by its txId
     *
     * @param txId
     */
    getTransaction(txId: string): Promise<BtcTx | null>;

    /**
     * Returns blockhash of a block at a given block height
     *
     * @param height
     */
    getBlockhash(height: number): Promise<string | null>;

    /**
     * Returns Bitcoin block with all the transactions based on blockhash
     *
     * @param blockhash
     */
    getBlockWithTransactions(blockhash: string): Promise<BtcBlockWithTxs | null>;

    /**
     * Sends a single raw transaction
     *
     * @param rawTx A hexadecimal-encoded bitcoin transaction
     */
    sendRawTransaction(rawTx: string): Promise<string>;

    /**
     * Sends a Bitcoin transaction package composed of multiple individual transactions at the same time
     *
     * @param rawTx An array of hexadecimal-encoded bitcoin transactions
     */
    sendRawPackage(rawTx: string[]): Promise<string[]>;

    /**
     * Returns the current tip blockheight of bitcoin
     */
    getTipHeight(): Promise<number>;

    /**
     * Returns the synchronization information of the underlying bitcoin RPC
     */
    getSyncInfo(): Promise<BtcSyncInfo>;

    /**
     * Parses a raw bitcoin transaction
     *
     * @param rawTx Hexadecimal-encoded bitcoin transaction
     */
    parseTransaction(rawTx: string): Promise<BtcTx>;

    /**
     * Returns whether a given UTXO is spent or not, returns `false` for non-existing UTXOs
     *
     * @param utxo The UTXO to check, should be in format [txId]:[vout]
     * @param confirmed Whether the spent has to be confirmed or can also be in the mempool
     */
    isSpent(utxo: string, confirmed?: boolean): Promise<boolean>;

    /**
     * Returns an effective fee rate of the provided bitcoin transaction, this takes into consideration
     *  the current fee rates of the potential unconfirmed inputs of the transaction that are already
     *  in the mempool
     *
     * @param btcTx
     */
    getEffectiveFeeRate(btcTx: BtcTx): Promise<{vsize: number, fee: number, feeRate: number}>;

}