import {Buffer} from "buffer";

/**
 * Represents a bitcoin block header as fetched from the RPC
 *
 * @category Bitcoin
 */
export interface BtcBlock {

    /**
     * Block's version field
     */
    getVersion(): number;

    /**
     * Previous block hash
     */
    getPrevBlockhash(): string;

    /**
     * Merkle root of the transactions tree
     */
    getMerkleRoot(): string;

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

    /**
     * Block hash of this block
     */
    getHash(): string;

    /**
     * Height at which this block was mined
     */
    getHeight(): number;

    /**
     * Total accumulated chainwork at this block
     */
    getChainWork(): Buffer;

}
