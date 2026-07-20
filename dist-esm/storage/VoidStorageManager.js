/**
 * A dummy storage manager that doesn't store anything, and should be only used as a placeholder
 *
 * @category Storage
 * @internal
 */
export class VoidStorageManager {
    constructor() {
        /**
         * @inheritDoc
         */
        this.data = {};
    }
    /**
     * @inheritDoc
     */
    init() {
        return Promise.resolve();
    }
    /**
     * @inheritDoc
     */
    loadData(type) {
        return Promise.resolve([]);
    }
    /**
     * @inheritDoc
     */
    removeData(hash) {
        return Promise.resolve();
    }
    /**
     * @inheritDoc
     */
    saveData(hash, object) {
        return Promise.resolve();
    }
}
