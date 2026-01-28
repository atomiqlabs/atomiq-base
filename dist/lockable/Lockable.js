"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lockable = void 0;
/**
 * A helper class for create an object based lock, ensuring only one lock on the object
 *  can be acquired along with a given timeout
 *
 * @internal
 * @category Utils
 */
class Lockable {
    constructor() {
        this.lockedTill = 0;
        this.lockNonce = 0;
    }
    /**
     * Attempts to lock an object with a given timeout, returns null if the object is already locked and an unlock
     *  callback function that unlocks this object.
     *
     * @param timeoutSeconds A timeout in seconds after which this object should be unlocked even if the unlock
     *  function isn't called sooner
     * @returns A callback, which shall be called to unlock an object, or `null` if the object is locked
     */
    lock(timeoutSeconds) {
        if (this.isLocked()) {
            return null;
        }
        this.lockedTill = Date.now() + (timeoutSeconds * 1000);
        this.lockNonce++;
        const lockNonce = this.lockNonce;
        return () => {
            if (this.lockNonce !== lockNonce) {
                return false;
            }
            this.lockedTill = 0;
            return true;
        };
    }
    /**
     * Checks whether the object is currently locked
     */
    isLocked() {
        return this.lockedTill > Date.now();
    }
}
exports.Lockable = Lockable;
