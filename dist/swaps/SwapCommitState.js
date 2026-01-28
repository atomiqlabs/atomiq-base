"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapCommitStateType = void 0;
/**
 * Possible on-chain states of the swap escrow
 *
 * @category Swaps
 */
var SwapCommitStateType;
(function (SwapCommitStateType) {
    /**
     * The escrow specified by the swap data isn't currently active and the swap data has already expired
     */
    SwapCommitStateType[SwapCommitStateType["EXPIRED"] = 0] = "EXPIRED";
    /**
     * The escrow specified by the swap data isn't currently active, could've been refunded already
     */
    SwapCommitStateType[SwapCommitStateType["NOT_COMMITED"] = 1] = "NOT_COMMITED";
    /**
     * The escrow is active on-chain and can be claimed
     */
    SwapCommitStateType[SwapCommitStateType["COMMITED"] = 2] = "COMMITED";
    /**
     * The escrow has been finalized and funds claimed by the claimer
     */
    SwapCommitStateType[SwapCommitStateType["PAID"] = 3] = "PAID";
    /**
     * The escrow is active on-chain and can be refunded by the offerer
     */
    SwapCommitStateType[SwapCommitStateType["REFUNDABLE"] = 4] = "REFUNDABLE";
})(SwapCommitStateType = exports.SwapCommitStateType || (exports.SwapCommitStateType = {}));
