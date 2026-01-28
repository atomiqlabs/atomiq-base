/**
 * Currently defined types of the data propagation messages
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
