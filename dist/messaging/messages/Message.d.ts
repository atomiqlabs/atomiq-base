/**
 * Currently defined types of the data propagation messages
 *
 * When adding a new message type: register its deserializer at the bottom of the message's own module
 *  (see {@link SwapClaimWitnessMessage}) AND list that module in the package.json "sideEffects" array
 *  (both the root package.json and the dist-esm marker written by the build script), otherwise bundlers
 *  are allowed to drop the module - and with it the registration - when none of its exports are used.
 *  The registration cannot live in this file: the message classes extend {@link Message}, so importing
 *  them here creates a circular import that crashes at load time.
 *
 * @category Messenger
 */
export declare enum MessageType {
    SWAP_CLAIM_WITNESS = 0
}
/**
 * Representation of an abstract message in a data propagation layer
 *
 * @category Messenger
 */
export declare abstract class Message {
    abstract readonly type: MessageType;
    /**
     * A mapping of deserializers for different message types
     *
     * @internal
     */
    static deserializers: {
        [type: number]: (obj: any) => Message;
    };
    /**
     * Serializes the message to a format that can be JSON serialized (i.e. no bigints, functions, etc.)
     */
    serialize(): any;
    /**
     * Deserializer that parses the message from it's JSON compatible representation
     *
     * @param message
     */
    static deserialize(message: any): Message;
}
