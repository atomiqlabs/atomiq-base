/**
 * Represents an error or inconsistency when verifying {@link SwapData}
 *
 * @category Errors
 */
export declare class SwapDataVerificationError extends Error {
    constructor(msg: string);
}
/**
 * Type guard for swap data verification errors
 *
 * @param error
 * @category Errors
 */
export declare function isSwapDataVerificationError(error: unknown): error is SwapDataVerificationError;
