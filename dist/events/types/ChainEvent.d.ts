import { SwapData } from "../../swaps/SwapData";
/**
 * Represents a processed on-chain event
 *
 * @category Events
 */
export declare class ChainEvent<T extends SwapData> {
    /**
     * Event metadata
     */
    meta?: {
        blockTime: number;
        txId: string;
    };
    /**
     * Version of the contract that emitted the event
     */
    contractVersion?: string;
    constructor(contractVersion?: string);
}
