/**
 * A helper class for create an object based lock, ensuring only one lock on the object
 *  can be acquired along with a given timeout
 *
 * @internal
 * @category Utils
 */
export declare class Lockable {
    private lockedTill;
    private lockNonce;
    /**
     * Attempts to lock an object with a given timeout, returns null if the object is already locked and an unlock
     *  callback function that unlocks this object.
     *
     * @param timeoutSeconds A timeout in seconds after which this object should be unlocked even if the unlock
     *  function isn't called sooner
     * @returns A callback, which shall be called to unlock an object, or `null` if the object is locked
     */
    lock(timeoutSeconds: number): (() => boolean) | null;
    /**
     * Checks whether the object is currently locked
     */
    isLocked(): boolean;
}
