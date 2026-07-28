const MESSAGE_DESERIALIZER_REGISTRY = Symbol.for("@atomiqlabs/base/Message.deserializers/v1");
const globalScope = globalThis;
const messageDeserializerRegistry = (globalScope[MESSAGE_DESERIALIZER_REGISTRY] ?? (globalScope[MESSAGE_DESERIALIZER_REGISTRY] = {}));
/**
 * Currently defined types of the data propagation messages
 *
 * @category Messenger
 */
export var MessageType;
(function (MessageType) {
    MessageType[MessageType["SWAP_CLAIM_WITNESS"] = 0] = "SWAP_CLAIM_WITNESS";
})(MessageType || (MessageType = {}));
/**
 * Representation of an abstract message in a data propagation layer
 *
 * @category Messenger
 */
export class Message {
    /**
     * Serializes the message to a format that can be JSON serialized (i.e. no bigints, functions, etc.)
     */
    serialize() {
        return {
            type: this.type
        };
    }
    /**
     * Deserializer that parses the message from it's JSON compatible representation
     *
     * @param message
     */
    static deserialize(message) {
        const deserializer = Message.deserializers[message.type];
        if (deserializer == null)
            throw new Error("Unknown message type " + message.type);
        return deserializer(message);
    }
}
/**
 * A mapping of deserializers for different message types
 *
 * @internal
 */
Message.deserializers = messageDeserializerRegistry;
