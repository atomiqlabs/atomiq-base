/**
 * Represents a signature verification error
 *
 * @category Errors
 */
export class SignatureVerificationError extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SignatureVerificationError.prototype);
    }
}
