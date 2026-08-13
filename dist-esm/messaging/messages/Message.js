const MESSAGE_DESERIALIZER_REGISTRY = Symbol.for("@atomiqlabs/base/Message.deserializers/v1");
const globalScope = globalThis;
const messageDeserializerRegistry = (globalScope[MESSAGE_DESERIALIZER_REGISTRY] ?? (globalScope[MESSAGE_DESERIALIZER_REGISTRY] = {}));
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
