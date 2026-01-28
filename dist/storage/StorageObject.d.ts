/**
 * Represents an object that is serializable down to a JSON-compatible object (i.e. no bigints, functions, etc.)
 *
 * @category Storage
 */
export interface StorageObject {
    /**
     * Serializes the object to a JSON-compatible object (i.e. no bigints, functions, etc.)
     */
    serialize(): any;
}
