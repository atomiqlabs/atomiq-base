/// <reference types="node" />
import { BtcStoredHeader } from "./types/BtcStoredHeader";
import { BtcBlock } from "./types/BtcBlock";
import { Buffer } from "buffer";
import { AbstractSigner } from "../chains/ChainInterface";
/**
 * Represents a BTC relay bitcoin light client contract, which verifies the bitcoin blockheaders on smart chains
 *
 * @category Chains
 */
export interface BtcRelay<V extends BtcStoredHeader<any>, T, B extends BtcBlock, Signer extends AbstractSigner = AbstractSigner> {
    /**
     * Maximum blockheaders that fit in a single transaction
     */
    maxHeadersPerTx: number;
    /**
     * Maximum amount of fork headers that fit in a single transactions
     */
    maxForkHeadersPerTx: number;
    /**
     * Maximum amount of fork headers that can be submitted at once using the short fork method
     */
    maxShortForkHeadersPerTx?: number;
    /**
     * Returns data about current main chain tip stored in the btc relay
     */
    getTipData(): Promise<{
        blockheight: number;
        blockhash: string;
        commitHash: string;
        chainWork: Buffer;
    } | null>;
    /**
     * Retrieves blockheader with a specific blockhash, returns null if `requiredBlockheight` is provided and
     *  btc relay contract is not synced up to the desired blockheight
     *
     * @param blockData
     * @param requiredBlockheight
     */
    retrieveLogAndBlockheight(blockData: {
        blockhash: string;
        height: number;
    }, requiredBlockheight?: number): Promise<{
        header: V;
        height: number;
    } | null>;
    /**
     * Retrieves stored bitcoin blockheader data by blockheader's commit hash and provided
     *  blockhash from `blockData`
     *
     * @param commitHash
     * @param blockData
     */
    retrieveLogByCommitHash(commitHash: string, blockData: {
        blockhash: string;
        height: number;
    }): Promise<V | null>;
    /**
     * Retrieves latest known bitcoin blockheader stored in the BTC Relay and also known to the bitcoin RPC
     */
    retrieveLatestKnownBlockLog(): Promise<{
        resultStoredHeader: V;
        resultBitcoinHeader: B;
    } | null>;
    /**
     * Initializes the underlying BTC Relay contract
     *
     * @param signer A signer's address to use for the transaction
     * @param header Main chain blockheader to use as a genesis
     * @param epochStart Timestamp of the first block in this difficulty epoch
     * @param pastBlocksTimestamps Timestamps of the last 11 blockheaders, for median block time rule
     * @param feeRate Optional fee rate for the transaction
     */
    saveInitialHeader(signer: string, header: B, epochStart: number, pastBlocksTimestamps: number[], feeRate?: string): Promise<T>;
    /**
     * Returns a transaction that submits bitcoin blockheaders as a bitcoin main chain to the btc relay
     *
     * @param signer A signer's address for the transaction
     * @param mainHeaders New bitcoin blockheaders to submit
     * @param storedHeader Latest committed and stored bitcoin blockheader in the BTC relay
     * @param feeRate Optional fee rate for the transaction
     */
    saveMainHeaders(signer: string, mainHeaders: B[], storedHeader: V, feeRate?: string): Promise<{
        forkId: number;
        lastStoredHeader: V;
        tx: T;
        computedCommitedHeaders: V[];
    }>;
    /**
     * Returns a transaction that submits a new long fork and submits the first headers to it
     *
     * @param signer A signer's address for the transaction
     * @param forkHeaders New fork bitcoin blockheaders to submit
     * @param storedHeader Committed and stored bitcoin blockheader in the BTC relay from which to fork
     * @param tipWork Chainwork of the current BTC Relay main chain tip
     * @param feeRate Optional fee rate for the transaction
     */
    saveNewForkHeaders(signer: string, forkHeaders: B[], storedHeader: V, tipWork: Buffer, feeRate?: string): Promise<{
        forkId: number;
        lastStoredHeader: V;
        tx: T;
        computedCommitedHeaders: V[];
    }>;
    /**
     * Returns a transaction that continues submitting blockheaders to an existing long fork
     *
     * @param signer A signer's address for the transaction
     * @param forkHeaders New fork bitcoin blockheaders to submit
     * @param storedHeader Committed and stored bitcoin blockheader in the BTC relay from which to fork
     * @param forkId Fork ID to submit the blockheaders to
     * @param tipWork Chainwork of the current BTC Relay main chain tip
     * @param feeRate Optional fee rate for the transaction
     */
    saveForkHeaders(signer: string, forkHeaders: B[], storedHeader: V, forkId: number, tipWork: Buffer, feeRate?: string): Promise<{
        forkId: number;
        lastStoredHeader: V;
        tx: T;
        computedCommitedHeaders: V[];
    }>;
    /**
     * Returns a transaction that submits a short fork with the provided blockheaders
     *
     * @param signer A signer's address for the transaction
     * @param forkHeaders New fork bitcoin blockheaders to submit
     * @param storedHeader Committed and stored bitcoin blockheader in the BTC relay from which to fork
     * @param tipWork Chainwork of the current BTC Relay main chain tip
     * @param feeRate Optional fee rate for the transaction
     */
    saveShortForkHeaders?(signer: string, forkHeaders: B[], storedHeader: V, tipWork: Buffer, feeRate?: string): Promise<{
        forkId: number;
        lastStoredHeader: V;
        tx: T;
        computedCommitedHeaders: V[];
    }>;
    /**
     * Gets fee rate required for submitting blockheaders to the main chain
     *
     * @param signer A signer's address to use for the estimation
     */
    getMainFeeRate(signer: string): Promise<string>;
    /**
     * Gets fee rate required for submitting blockheaders to the specific fork
     *
     * @param signer A signer's address to use for the estimation
     * @param forkId A fork ID to use for estimation
     */
    getForkFeeRate(signer: string, forkId: number): Promise<string>;
    /**
     * Estimate required synchronization fee (worst case) to synchronize btc relay to the required blockheight
     *
     * @param requiredBlockheight Blockheight to which to synchronize
     * @param feeRate Optional fee rate to use for the estimation
     */
    estimateSynchronizeFee(requiredBlockheight: number, feeRate?: string): Promise<bigint>;
    /**
     * Returns required fee in native token to synchronize a single block to btc relay
     *
     * @param feeRate Optional fee rate to use for the estimation
     */
    getFeePerBlock(feeRate?: any): Promise<bigint>;
    /**
     * Checks and sweeps data accounts which contain yet unused fork data (use for Solana's PDAs)
     *
     * @param signer A signer's address to check account for
     * @param lastSweepTimestamp Timestamp of the last sweep
     *
     * @returns A number of data accounts swept
     */
    sweepForkData?(signer: Signer, lastSweepTimestamp?: number): Promise<number | null>;
}
