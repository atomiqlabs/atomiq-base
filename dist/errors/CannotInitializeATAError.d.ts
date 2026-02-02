/**
 * Represents a Solana-specific error when an ATA (associated token account) couldn't be initialized
 *
 * @category Errors
 */
export declare class CannotInitializeATAError extends Error {
    constructor(msg: string);
}
