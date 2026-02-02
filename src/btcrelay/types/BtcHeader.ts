import {Buffer} from "buffer";

/**
 * Represents a raw bitcoin header (80-bytes) that can be synchronized to the underlying BTC relay light client contract
 *
 * @category BTC Relay
 */
export interface BtcHeader {

    /**
     * Version of the block
     */
    getVersion(): number,

    /**
     * Hash of the previous block in little-endian representation
     */
    getReversedPrevBlockhash(): Buffer,

    /**
     * Merkle root of the transactions tree
     */
    getMerkleRoot(): Buffer,

    /**
     * Timestamp of the block
     */
    getTimestamp(): number;

    /**
     * nBits field of the block
     */
    getNbits(): number;

    /**
     * Nonce of the block
     */
    getNonce(): number;

}