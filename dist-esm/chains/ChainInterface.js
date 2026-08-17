/**
 * Type guard for the {@link AbstractSigner} type
 *
 * @param val
 */
export function isAbstractSigner(val) {
    return typeof (val) === "object" && val.type === "AtomiqAbstractSigner" && typeof (val.getAddress) === "function";
}
