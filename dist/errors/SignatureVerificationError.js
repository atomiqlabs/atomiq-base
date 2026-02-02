"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureVerificationError = void 0;
/**
 * Represents a signature verification error
 *
 * @category Errors
 */
class SignatureVerificationError extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SignatureVerificationError.prototype);
    }
}
exports.SignatureVerificationError = SignatureVerificationError;
