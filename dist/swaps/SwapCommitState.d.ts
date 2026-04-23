/**
 * Possible on-chain states of the swap escrow
 *
 * @category Chains
 */
export declare enum SwapCommitStateType {
    /**
     * The escrow specified by the swap data isn't currently active and the swap data has already expired
     */
    EXPIRED = 0,
    /**
     * The escrow specified by the swap data isn't currently active, could've been refunded already
     */
    NOT_COMMITED = 1,
    /**
     * The escrow is active on-chain and can be claimed
     */
    COMMITED = 2,
    /**
     * The escrow has been finalized and funds claimed by the claimer
     */
    PAID = 3,
    /**
     * The escrow is active on-chain and can be refunded by the offerer
     */
    REFUNDABLE = 4
}
/**
 * The escrow specified by the swap data isn't currently active, could've been refunded already
 *
 * @category Swaps
 */
export type SwapNotCommitedState = {
    type: SwapCommitStateType.NOT_COMMITED;
    getInitTxId?: () => Promise<string>;
    getRefundTxId?: () => Promise<string>;
    getTxBlock?: () => Promise<{
        blockHeight: number;
        blockTime: number;
    }>;
};
/**
 * The escrow specified by the swap data isn't currently active and the swap data has already expired
 *
 * @category Swaps
 */
export type SwapExpiredState = {
    type: SwapCommitStateType.EXPIRED;
    getInitTxId?: () => Promise<string>;
    getRefundTxId?: () => Promise<string>;
    getTxBlock?: () => Promise<{
        blockHeight: number;
        blockTime: number;
    }>;
};
/**
 * The escrow is active on-chain and can be refunded by the offerer
 *
 * @category Swaps
 */
export type SwapRefundableState = {
    type: SwapCommitStateType.REFUNDABLE;
    getInitTxId?: () => Promise<string>;
};
/**
 * The escrow is active on-chain and can be claimed
 *
 * @category Swaps
 */
export type SwapCommitedState = {
    type: SwapCommitStateType.COMMITED;
    getInitTxId?: () => Promise<string>;
};
/**
 * The escrow has been finalized and funds claimed by the claimer
 *
 * @category Swaps
 */
export type SwapPaidState = {
    type: SwapCommitStateType.PAID;
    getInitTxId?: () => Promise<string>;
    getClaimTxId: () => Promise<string>;
    getClaimResult: () => Promise<string>;
    getTxBlock: () => Promise<{
        blockHeight: number;
        blockTime: number;
    }>;
};
/**
 * A union type for the state of the escrow
 *
 * @category Swaps
 */
export type SwapCommitState = SwapNotCommitedState | SwapExpiredState | SwapRefundableState | SwapCommitedState | SwapPaidState;
