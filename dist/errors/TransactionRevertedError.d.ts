/**
 * Indicates that the sent transaction has reverted (i.e. was confirmed but the execution failed)
 *
 * @category Errors
 */
export declare class TransactionRevertedError extends Error {
    constructor(msg: string);
}
/**
 * Type guard for reverted transaction errors
 *
 * @param error
 * @category Errors
 */
export declare function isTransactionRevertedError(error: unknown): error is TransactionRevertedError;
