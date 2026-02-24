/**
 * Possible states of a vault withdrawal (claim) transaction
 *
 * @category Chains
 */
export enum SpvWithdrawalStateType {
    /**
     * An SPV vault (UTXO-controlled vault), has been closed as a result of the claim (withdrawal) transaction,
     *  something probably went wrong with the bitcoin transaction format or parsing
     */
    CLOSED = -1,
    /**
     * The withdrawal is not yet known on the smart chain side, i.e. the transaction on the bitcoin side
     *  didn't achieve enough confirmations yet, or it was not yet submitted on the smart chain side
     */
    NOT_FOUND = 0,
    /**
     * The withdrawal was successfully processed on the smart chain side
     */
    CLAIMED = 1,
    /**
     * The withdrawal has been fronted by some 3rd party
     */
    FRONTED = 2
}

/**
 * The withdrawal is not yet known on the smart chain side, i.e. the transaction on the bitcoin side
 *  didn't achieve enough confirmations yet, or it was not yet submitted on the smart chain side
 *
 * @category Swaps
 */
export type SpvWithdrawalNotFoundState = {
    type: SpvWithdrawalStateType.NOT_FOUND
};

type SpvWithdrawalStateCommon = {
    txId: string,
    owner: string,
    vaultId: bigint,
    btcTxId?: string,
    getTxBlock?: () => Promise<{blockHeight: number, blockTime: number}>
};

/**
 * The withdrawal was successfully processed on the smart chain side
 *
 * @category Swaps
 */
export type SpvWithdrawalClaimedState = {
    type: SpvWithdrawalStateType.CLAIMED,
    recipient: string,
    claimer: string,
    fronter: string
} & SpvWithdrawalStateCommon;

/**
 * The withdrawal has been fronted by some 3rd party
 *
 * @category Swaps
 */
export type SpvWithdrawalFrontedState = {
    type: SpvWithdrawalStateType.FRONTED,
    recipient: string,
    fronter: string
} & SpvWithdrawalStateCommon;

/**
 * An SPV vault (UTXO-controlled vault), has been closed as a result of the claim (withdrawal) transaction,
 *  something probably went wrong with the bitcoin transaction format or parsing
 *
 * @category Swaps
 */
export type SpvWithdrawalClosedState = {
    type: SpvWithdrawalStateType.CLOSED,
    error: string
} & SpvWithdrawalStateCommon;

/**
 * A union type for the state of the spv vault claim (withdrawal)
 *
 * @category Swaps
 */
export type SpvWithdrawalState = SpvWithdrawalNotFoundState |
    SpvWithdrawalClaimedState |
    SpvWithdrawalFrontedState |
    SpvWithdrawalClosedState;
