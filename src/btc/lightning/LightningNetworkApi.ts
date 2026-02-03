
/**
 * A type defining total capacity of a given lightning network node
 *
 * @category Bitcoin
 */
export type LNNodeLiquidity = {
    publicKey: string,
    capacity: bigint,
    numChannels: number
};

/**
 * An interface for Lightning API, provides view of the public lightning network data like channel graph
 *
 * @category Bitcoin
 */
export interface LightningNetworkApi {

    /**
     * Returns the lightning network's node liquidity as identified by an identity public key
     *
     * @param pubkey
     */
    getLNNodeLiquidity(pubkey: string): Promise<LNNodeLiquidity | null>

}
