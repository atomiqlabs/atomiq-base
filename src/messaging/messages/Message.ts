type MessageDeserializerRegistry = {
    [type: number]: (obj: any) => Message,
};

const MESSAGE_DESERIALIZER_REGISTRY = Symbol.for("@atomiqlabs/base/Message.deserializers/v1");
const globalScope = globalThis as typeof globalThis & {
    [MESSAGE_DESERIALIZER_REGISTRY]: MessageDeserializerRegistry | undefined,
};
const messageDeserializerRegistry = (globalScope[MESSAGE_DESERIALIZER_REGISTRY] ??= {});

/**
 * Currently defined types of the data propagation messages
 *
 * @category Messenger
 */
export enum MessageType {
    SWAP_CLAIM_WITNESS = 0,
}

/**
 * Representation of an abstract message in a data propagation layer
 *
 * @category Messenger
 */
export abstract class Message {

    abstract readonly type: MessageType;

    /**
     * A mapping of deserializers for different message types
     *
     * @internal
     */
    static deserializers: {[type: number]: (obj: any) => Message} = messageDeserializerRegistry;

    /**
     * Serializes the message to a format that can be JSON serialized (i.e. no bigints, functions, etc.)
     */
    serialize(): any {
        return {
            type: this.type
        }
    }

    /**
     * Deserializer that parses the message from it's JSON compatible representation
     *
     * @param message
     */
    static deserialize(message: any): Message {
        const deserializer = Message.deserializers[message.type];
        if(deserializer==null) throw new Error("Unknown message type " + message.type);
        return deserializer(message);
    }

}
