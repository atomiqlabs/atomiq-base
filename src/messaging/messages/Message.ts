import {SwapClaimWitnessMessage} from "./SwapClaimWitnessMessage";

export enum MessageType {
    SWAP_CLAIM_WITNESS = 0,

}

export abstract class Message {

    abstract type: MessageType;

    serialize(): any {
        return {
            type: this.type
        }
    }

    static deserialize(message: any): any {
        switch(message.type) {
            case MessageType.SWAP_CLAIM_WITNESS:
                return SwapClaimWitnessMessage.deserialize(message);
            default:
                throw new Error("Unknown message type " + message.type);
        }
    }

}
