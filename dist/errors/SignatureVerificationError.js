"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignatureVerificationError = exports.SignatureVerificationError = void 0;
/**
 * Represents a signature verification error
 *
 * @category Errors
 */
class SignatureVerificationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "SignatureVerificationError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SignatureVerificationError.prototype);
    }
}
exports.SignatureVerificationError = SignatureVerificationError;
/**
 * Type guard for signature verification errors
 *
 * @param error
 * @category Errors
 */
function isSignatureVerificationError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "SignatureVerificationError" &&
        "message" in error && typeof (error.message) === "string";
}
exports.isSignatureVerificationError = isSignatureVerificationError;
