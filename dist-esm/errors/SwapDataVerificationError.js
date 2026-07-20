/**
 * Represents an error or inconsistency when verifying {@link SwapData}
 *
 * @category Errors
 */
export class SwapDataVerificationError extends Error {
    constructor(msg) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, SwapDataVerificationError.prototype);
    }
}
