/**
 * Represents a signature verification error
 *
 * @category Errors
 */
export class SignatureVerificationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "SignatureVerificationError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SignatureVerificationError.prototype);
    }
}
/**
 * Type guard for signature verification errors
 *
 * @param error
 * @category Errors
 */
export function isSignatureVerificationError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "SignatureVerificationError" &&
        "message" in error && typeof (error.message) === "string";
}
