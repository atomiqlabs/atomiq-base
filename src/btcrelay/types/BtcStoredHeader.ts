import {BtcHeader} from "./BtcHeader";
import {Buffer} from "buffer";

/**
 * Represents a bitcoin blockheader that has already been synchronized and saved (committed) in the BTC relay
 *  contract
 *
 * @category Bitcoin
 */
export interface BtcStoredHeader<T extends BtcHeader> {

    /**
     * Total accumulated chainwork at this block
     */
    getChainWork(): Buffer,

    /**
     * The actual blockheader that was saved
     */
    getHeader(): T,

    /**
     * UNIX seconds timestamp of the last difficulty adjustment
     */
    getLastDiffAdjustment(): number,

    /**
     * Blockheight of the current block
     */
    getBlockheight(): number,

    /**
     * UNIX seconds timestamps of the last 11 blocks, used for checking the median block time rule
     */
    getPrevBlockTimestamps(): number[],

    /**
     * Computes and returns a new stored blockheader after adding a new blockheader on top of it
     *
     * @param header The new blockheader to append to the chain
     */
    computeNext(header: T): BtcStoredHeader<T>;

}