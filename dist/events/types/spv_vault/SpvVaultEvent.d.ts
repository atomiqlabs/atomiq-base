import { ChainEvent } from "../ChainEvent.js";
import { SwapData } from "../../../swaps/SwapData.js";
/**
 * Enum of the various types of SPV vault (UTXO-controlled vault) related events
 *
 * @category Events
 */
export declare enum SpvVaultEventType {
    OPEN = 0,
    DEPOSIT = 1,
    CLAIM = 2,
    CLOSE = 3,
    FRONT = 4
}
/**
 * Type guard for SPV vault on-chain events
 *
 * @param event
 * @category Events
 */
export declare function isSpvVaultEvent(event: unknown): event is SpvVaultEvent;
/**
 * Represents an SPV vault (UTXO-controlled vault) on-chain event
 *
 * @category Events
 */
export declare abstract class SpvVaultEvent<C extends SpvVaultEventType = SpvVaultEventType> extends ChainEvent<SwapData> {
    abstract readonly eventType: C;
    /**
     * Owner of the underlying SPV vault (UTXO-controlled vault)
     */
    owner: string;
    /**
     * ID of the SPV vault (UTXO-controlled vault)
     */
    vaultId: bigint;
    constructor(owner: string, vaultId: bigint, contractVersion?: string);
}
