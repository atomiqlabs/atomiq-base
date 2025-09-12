/// <reference types="node" />
import { BtcStoredHeader } from "./types/BtcStoredHeader";
import { BtcBlock } from "./types/BtcBlock";
import { Buffer } from "buffer";
import { AbstractSigner } from "../chains/ChainInterface";
export type BtcRelayTipData = {
    blockheight: number;
    blockhash: string;
    commitHash: string;
    chainWork: Buffer;
};
export type BtcRelaySaveHeadersReturnType<V extends BtcStoredHeader<any> = BtcStoredHeader<any>, T = any> = {
    forkId: number;
    lastStoredHeader: V;
    tx: T;
    computedCommitedHeaders: V[];
};
export interface BtcRelay<V extends BtcStoredHeader<any>, T, B extends BtcBlock, Signer extends AbstractSigner = AbstractSigner> {
    maxHeadersPerTx: number;
    maxForkHeadersPerTx: number;
    maxShortForkHeadersPerTx?: number;
    getTipData(): Promise<BtcRelayTipData | null>;
    retrieveLogAndBlockheight(blockData: {
        blockhash: string;
        height: number;
    }, requiredBlockheight?: number): Promise<{
        header: V;
        height: number;
    } | null>;
    retrieveLogByCommitHash(commitHash: string, blockData: {
        blockhash: string;
        height: number;
    }): Promise<V | null>;
    retrieveLatestKnownBlockLog(): Promise<{
        resultStoredHeader: V;
        resultBitcoinHeader: B;
    } | null>;
    saveInitialHeader(signer: string, header: B, epochStart: number, pastBlocksTimestamps: number[], feeRate?: string): Promise<T>;
    saveMainHeaders(signer: string, mainHeaders: B[], storedHeader: V, feeRate?: string): Promise<BtcRelaySaveHeadersReturnType<V, T>>;
    saveNewForkHeaders(signer: string, forkHeaders: B[], storedHeader: V, tipWork: Buffer, feeRate?: string): Promise<BtcRelaySaveHeadersReturnType<V, T>>;
    saveForkHeaders(signer: string, forkHeaders: B[], storedHeader: V, forkId: number, tipWork: Buffer, feeRate?: string): Promise<BtcRelaySaveHeadersReturnType<V, T>>;
    saveShortForkHeaders?(signer: string, forkHeaders: B[], storedHeader: V, tipWork: Buffer, feeRate?: string): Promise<BtcRelaySaveHeadersReturnType<V, T>>;
    getMainFeeRate?(signer: string): Promise<string>;
    getForkFeeRate?(signer: string, forkId: number): Promise<string>;
    estimateSynchronizeFee(requiredBlockheight: number, feeRate?: string): Promise<bigint>;
    getFeePerBlock(feeRate?: any): Promise<bigint>;
    sweepForkData?(signer: Signer, lastSweepTimestamp?: number): Promise<number | null>;
}
