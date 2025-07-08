"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageType = void 0;
const SwapClaimWitnessMessage_1 = require("./SwapClaimWitnessMessage");
var MessageType;
(function (MessageType) {
    MessageType[MessageType["SWAP_CLAIM_WITNESS"] = 0] = "SWAP_CLAIM_WITNESS";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class Message {
    serialize() {
        return {
            type: this.type
        };
    }
    static deserialize(message) {
        switch (message.type) {
            case MessageType.SWAP_CLAIM_WITNESS:
                return SwapClaimWitnessMessage_1.SwapClaimWitnessMessage.deserialize(message);
            default:
                throw new Error("Unknown message type " + message.type);
        }
    }
}
exports.Message = Message;
