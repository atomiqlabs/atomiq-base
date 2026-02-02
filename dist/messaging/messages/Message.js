"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageType = void 0;
/**
 * Currently defined types of the data propagation messages
 *
 * @category Messenger
 */
var MessageType;
(function (MessageType) {
    MessageType[MessageType["SWAP_CLAIM_WITNESS"] = 0] = "SWAP_CLAIM_WITNESS";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
/**
 * Representation of an abstract message in a data propagation layer
 *
 * @category Messenger
 */
class Message {
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
exports.Message = Message;
/**
 * A mapping of deserializers for different message types
 *
 * @internal
 */
Message.deserializers = {};
