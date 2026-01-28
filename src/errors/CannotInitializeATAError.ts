/**
 * Represents a Solana-specific error when an ATA (associated token account) couldn't be initialized
 *
 * @category Errors
 */
export class CannotInitializeATAError extends Error {

    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CannotInitializeATAError.prototype);
    }

}

