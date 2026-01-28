"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapDataVerificationError = void 0;
/**
 * Represents an error or inconsistency when verifying {@link SwapData}
 *
 * @category Errors
 */
class SwapDataVerificationError extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SwapDataVerificationError.prototype);
    }
}
exports.SwapDataVerificationError = SwapDataVerificationError;
