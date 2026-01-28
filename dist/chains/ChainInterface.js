"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbstractSigner = void 0;
/**
 * Type guard for the {@link AbstractSigner} type
 *
 * @param val
 */
function isAbstractSigner(val) {
    return typeof (val) === "object" && val.type === "AtomiqAbstractSigner" && typeof (val.getAddress) === "function";
}
exports.isAbstractSigner = isAbstractSigner;
