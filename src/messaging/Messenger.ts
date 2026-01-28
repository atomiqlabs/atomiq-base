import {Message} from "./messages/Message";

/**
 * An interface of a messenger, this is a generic data propagation layer, where parties can broadcast messages
 *  and others can listen to these broadcasted messages
 *
 * @category Messenger
 */
export interface Messenger {

    /**
     * Initializes the messenger instance
     */
    init(): Promise<void>;

    /**
     * The messenger implementation can expose a warmup function that warms up the connection before
     *  an actual broadcast takes place (this is useful for browsers environments where you might
     *  want to warmup the connection before the tab is backgrounded)
     */
    warmup?(): Promise<void>;

    /**
     * Broadcast a message to the data propagation layer
     *
     * @param msg
     */
    broadcast(msg: Message): Promise<void>;

    /**
     * Adds a listener to listen to broadcasted messages
     *
     * @param callback
     */
    subscribe(callback: (msg: Message) => void): Promise<void>;

    /**
     * Removes a listener
     *
     * @param callback
     */
    unsubscribe(callback: (msg: Message) => void): Promise<boolean>;

    /**
     * Stops the instance, releasing any resources used by it
     */
    stop(): Promise<void>;

}
