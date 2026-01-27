import {StorageObject} from "./StorageObject";

/**
 * Interface for storage managers that persist StorageObject instances.
 * Provides basic CRUD operations with in-memory caching via the data property.
 *
 * @typeParam T - Type of StorageObject to manage
 */
export interface IStorageManager<T extends StorageObject> {

    /** In-memory cache of stored objects, keyed by hash */
    data: {
        [key: string]: T
    };

    /** Initializes the storage backend */
    init(): Promise<void>;

    /**
     * Saves an object to storage
     * @param hash - Unique identifier for the object
     * @param object - Object to save
     */
    saveData(hash: string, object: T): Promise<void>;

    /**
     * Removes an object from storage
     * @param hash - Identifier of the object to remove
     */
    removeData(hash: string): Promise<void>;

    /**
     * Loads all stored objects and deserializes them using the provided constructor
     * @param type - Constructor function to instantiate each object
     * @returns Array of deserialized objects
     */
    loadData(type: new(data: any) => T): Promise<T[]>;

    /**
     * Removes multiple objects from storage (optional batch operation)
     * @param keys - Array of identifiers to remove
     */
    removeDataArr?(keys: string[]): Promise<void>;

    /**
     * Saves multiple objects to storage (optional batch operation)
     * @param values - Array of id-object pairs to save
     */
    saveDataArr?(values: {id: string, object: T}[]): Promise<void>;

}