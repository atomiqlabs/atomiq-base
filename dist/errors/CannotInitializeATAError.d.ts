/**
 * Represents a Solana-specific error when an ATA (associated token account) couldn't be initialized
 *
 * @category Errors
 */
export declare class CannotInitializeATAError extends Error {
    constructor(msg: string);
}
/**
 * Type guard for errors caused by failure to initialize an associated token account
 *
 * @param error
 * @category Errors
 */
export declare function isCannotInitializeATAError(error: unknown): error is CannotInitializeATAError;
