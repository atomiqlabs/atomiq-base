export declare enum MessageType {
    SWAP_CLAIM_WITNESS = 0
}
export declare abstract class Message {
    abstract type: MessageType;
    serialize(): any;
    static deserialize(message: any): any;
}
