import { Message } from "./messages/Message";
export interface EventMessaging {
    init(): Promise<void>;
    broadcast(msg: Message): Promise<void>;
    subscribe(callback: (msg: Message) => void): Promise<void>;
    unsubscribe(callback: (msg: Message) => void): Promise<boolean>;
    stop(): Promise<void>;
}
