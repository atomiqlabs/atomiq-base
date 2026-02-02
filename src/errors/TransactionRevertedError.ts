/**
 * Indicates that the sent transaction has reverted (i.e. was confirmed but the execution failed)
 *
 * @category Errors
 */
export class TransactionRevertedError extends Error {

    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, TransactionRevertedError.prototype);
    }

}

