"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCannotInitializeATAError = exports.CannotInitializeATAError = void 0;
/**
 * Represents a Solana-specific error when an ATA (associated token account) couldn't be initialized
 *
 * @category Errors
 */
class CannotInitializeATAError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "CannotInitializeATAError";
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, CannotInitializeATAError.prototype);
    }
}
exports.CannotInitializeATAError = CannotInitializeATAError;
/**
 * Type guard for errors caused by failure to initialize an associated token account
 *
 * @param error
 * @category Errors
 */
function isCannotInitializeATAError(error) {
    return error != null && typeof (error) === "object" &&
        "name" in error && error.name === "CannotInitializeATAError" &&
        "message" in error && typeof (error.message) === "string";
}
exports.isCannotInitializeATAError = isCannotInitializeATAError;
