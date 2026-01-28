"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvWithdrawalStateType = void 0;
/**
 * Possible states of a vault withdrawal (claim) transaction
 *
 * @category Swaps
 */
var SpvWithdrawalStateType;
(function (SpvWithdrawalStateType) {
    /**
     * An SPV vault (UTXO-controlled vault), has been closed as a result of the claim (withdrawal) transaction,
     *  something probably went wrong with the bitcoin transaction format or parsing
     */
    SpvWithdrawalStateType[SpvWithdrawalStateType["CLOSED"] = -1] = "CLOSED";
    /**
     * The withdrawal is not yet known on the smart chain side, i.e. the transaction on the bitcoin side
     *  didn't achieve enough confirmations yet, or it was not yet submitted on the smart chain side
     */
    SpvWithdrawalStateType[SpvWithdrawalStateType["NOT_FOUND"] = 0] = "NOT_FOUND";
    /**
     * The withdrawal was successfully processed on the smart chain side
     */
    SpvWithdrawalStateType[SpvWithdrawalStateType["CLAIMED"] = 1] = "CLAIMED";
    /**
     * The withdrawal has been fronted by some 3rd party
     */
    SpvWithdrawalStateType[SpvWithdrawalStateType["FRONTED"] = 2] = "FRONTED";
})(SpvWithdrawalStateType = exports.SpvWithdrawalStateType || (exports.SpvWithdrawalStateType = {}));
