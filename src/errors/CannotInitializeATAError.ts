/**
 * Represents a Solana-specific error when an ATA (associated token account) couldn't be initialized
 *
 * @category Errors
 */
export class CannotInitializeATAError extends Error {

    constructor(msg: string) {
        super(msg);
        this.name = "CannotInitializeATAError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CannotInitializeATAError.prototype);
    }

}

/**
 * Type guard for errors caused by failure to initialize an associated token account
 *
 * @param error
 * @category Errors
 */
export function isCannotInitializeATAError(error: unknown): error is CannotInitializeATAError {
    return error!=null && typeof(error)==="object" &&
        "name" in error && error.name==="CannotInitializeATAError" &&
        "message" in error && typeof(error.message)==="string";
}
