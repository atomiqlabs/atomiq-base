import {IStorageManager} from "./IStorageManager";

/**
 * A dummy storage manager that doesn't store anything, and should be only used as a placeholder
 *
 * @category Storage
 * @internal
 */
export class VoidStorageManager implements IStorageManager<any> {
    /**
     * @inheritDoc
     */
    data: { [p: string]: any } = {};

    /**
     * @inheritDoc
     */
    init(): Promise<void> {
        return Promise.resolve();
    }

    /**
     * @inheritDoc
     */
    loadData(type: { new(data: any): any }): Promise<any[]> {
        return Promise.resolve([]);
    }

    /**
     * @inheritDoc
     */
    removeData(hash: string): Promise<void> {
        return Promise.resolve();
    }

    /**
     * @inheritDoc
     */
    saveData(hash: string, object: any): Promise<void> {
        return Promise.resolve();
    }
}
