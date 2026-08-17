"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransactionRevertedError = exports.TransactionRevertedError = void 0;
/**
 * Indicates that the sent transaction has reverted (i.e. was confirmed but the execution failed)
 *
 * @category Errors
 */
class TransactionRevertedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TransactionRevertedError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TransactionRevertedError.prototype);
    }
}
exports.TransactionRevertedError = TransactionRevertedError;
/**
 * Type guard for reverted transaction errors
 *
 * @param error
 * @category Errors
 */
function isTransactionRevertedError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "TransactionRevertedError" &&
        "message" in error && typeof (error.message) === "string";
}
exports.isTransactionRevertedError = isTransactionRevertedError;
