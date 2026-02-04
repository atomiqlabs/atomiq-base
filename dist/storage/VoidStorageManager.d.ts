import { IStorageManager } from "./IStorageManager";
/**
 * A dummy storage manager that doesn't store anything, and should be only used as a placeholder
 *
 * @category Storage
 * @internal
 */
export declare class VoidStorageManager implements IStorageManager<any> {
    /**
     * @inheritDoc
     */
    data: {
        [p: string]: any;
    };
    /**
     * @inheritDoc
     */
    init(): Promise<void>;
    /**
     * @inheritDoc
     */
    loadData(type: {
        new (data: any): any;
    }): Promise<any[]>;
    /**
     * @inheritDoc
     */
    removeData(hash: string): Promise<void>;
    /**
     * @inheritDoc
     */
    saveData(hash: string, object: any): Promise<void>;
}
