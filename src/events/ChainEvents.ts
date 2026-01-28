import {SwapData} from "../swaps/SwapData";
import {ChainEvent} from "./types/ChainEvent";

/**
 * A type of the on-chain event listener callback
 *
 * @category Events
 */
export type EventListener<T extends SwapData> = (obj: ChainEvent<T>[]) => Promise<boolean>;

/**
 * An interface defining an on-chain events listener, allowing registering callbacks to receive on-chain events
 *
 * @category Events
 */
export interface ChainEvents<T extends SwapData, S extends any = any> {

    /**
     * Initializes the chains event listener, by default this initiates a websocket events subscription or
     *  HTTP polling for new events.
     *
     * @param noAutomaticPoll When this flag is passed the listener doesn't initiate the websocket events subscription
     *  or HTTP polling, instead it relies on the implementor calling the {@link ChainEvents.poll} to fetch new events
     */
    init(noAutomaticPoll?: boolean): Promise<void>;

    /**
     * Registers a new listener to listen for on-chain events
     *
     * @param cbk
     */
    registerListener(cbk: EventListener<T>): void;

    /**
     * Unregisters a previously registered events listener, returning `true` if success, `false` if failed
     *
     * @param cbk
     */
    unregisterListener(cbk: EventListener<T>): boolean;

    /**
     * Stops the event listener's polling and websocket subscription
     */
    stop(): Promise<void>;

    /**
     * Triggers a single poll on the events instance, usually ran automatically, but should be called manually
     *  when initiated with `noAutomaticPoll`=`true`
     *
     * @param currentState The current state of the chain events
     * @returns The new state that should be saved, persisted and passed to the subsequent `poll()` call
     */
    poll(currentState?: S): Promise<S | null>;

}
