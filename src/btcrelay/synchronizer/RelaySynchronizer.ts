import {BtcStoredHeader} from "../types/BtcStoredHeader";
import {BtcBlock} from "../types/BtcBlock";

export type SynchronizationResponse<V extends BtcStoredHeader<any>, T, B extends BtcBlock> = {
    /**
     * Transactions required to synchronize the btc relay
     */
    txs: T[],
    /**
     * Latest committed header after synchronization
     */
    targetCommitedHeader: V,
    /**
     * Latest block header after synchronization
     */
    latestBlockHeader: B,
    /**
     * Mapping of synchronized committed headers, based on blockheight
     */
    computedHeaderMap: {[blockheight: number]: V},
    /**
     * Mapping of synchronized block headers, based on blockheight
     */
    blockHeaderMap: {[blockheight: number]: B},
    /**
     * Tip committed header of the btc relay before synchronization
     */
    btcRelayTipCommitedHeader: V,
    /**
     * Tip block header of the btc relay before synchronization
     */
    btcRelayTipBlockHeader: B,
    /**
     * A fork ID that was used to re-org the chain to the current canonical chain
     */
    startForkId?: number
};

/**
 * An interface for a synchronizer of the BTC relay bitcoin light client contract, produces transactions
 *  necessary to synchronize the underlying relay contract to the current tip of the canonical chain,
 *  automatically handles forking if necessary
 *
 * @category Chains
 */
export interface RelaySynchronizer<V extends BtcStoredHeader<any>, T, B extends BtcBlock> {

    /**
     * Returns the transactions necessary to synchronize the BTC relay contract to the
     *  tip of the canonical chain. Also returns the various bitcoin blockheaders that
     *  are to-be-synced to the relay, such that they can be used to already pre-create
     *  transactions, which require the stored blockheaders
     *
     * @param signer Transactions signer's address
     * @param feeRate Optional fee rate to use for the transactions
     */
    syncToLatestTxs(signer: string, feeRate?: string): Promise<SynchronizationResponse<V, T, B>>;

}