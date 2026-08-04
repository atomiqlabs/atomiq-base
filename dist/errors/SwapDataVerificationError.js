"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSwapDataVerificationError = exports.SwapDataVerificationError = void 0;
/**
 * Represents an error or inconsistency when verifying {@link SwapData}
 *
 * @category Errors
 */
class SwapDataVerificationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "SwapDataVerificationError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SwapDataVerificationError.prototype);
    }
}
exports.SwapDataVerificationError = SwapDataVerificationError;
/**
 * Type guard for swap data verification errors
 *
 * @param error
 * @category Errors
 */
function isSwapDataVerificationError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "SwapDataVerificationError" &&
        "message" in error && typeof (error.message) === "string";
}
exports.isSwapDataVerificationError = isSwapDataVerificationError;
