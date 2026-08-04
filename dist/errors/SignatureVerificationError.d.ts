/**
 * Represents a signature verification error
 *
 * @category Errors
 */
export declare class SignatureVerificationError extends Error {
    constructor(msg: string);
}
/**
 * Type guard for signature verification errors
 *
 * @param error
 * @category Errors
 */
export declare function isSignatureVerificationError(error: unknown): error is SignatureVerificationError;
