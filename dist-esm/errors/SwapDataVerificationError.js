/**
 * Represents an error or inconsistency when verifying {@link SwapData}
 *
 * @category Errors
 */
export class SwapDataVerificationError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "SwapDataVerificationError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SwapDataVerificationError.prototype);
    }
}
/**
 * Type guard for swap data verification errors
 *
 * @param error
 * @category Errors
 */
export function isSwapDataVerificationError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "SwapDataVerificationError" &&
        "message" in error && typeof (error.message) === "string";
}
