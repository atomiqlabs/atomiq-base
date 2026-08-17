import {ChainEvent} from "../ChainEvent.js";
import {SwapData} from "../../../swaps/SwapData.js";

/**
 * Enum of the various types of SPV vault (UTXO-controlled vault) related events
 *
 * @category Events
 */
export enum SpvVaultEventType {
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
export function isSpvVaultEvent(event: unknown): event is SpvVaultEvent {
    if(event==null || typeof(event)!=="object") return false;
    const vaultEvent = event as Partial<SpvVaultEvent>;
    return typeof(vaultEvent.owner)==="string" &&
        typeof(vaultEvent.vaultId)==="bigint" &&
        (vaultEvent.eventType===SpvVaultEventType.OPEN ||
            vaultEvent.eventType===SpvVaultEventType.DEPOSIT ||
            vaultEvent.eventType===SpvVaultEventType.CLAIM ||
            vaultEvent.eventType===SpvVaultEventType.CLOSE ||
            vaultEvent.eventType===SpvVaultEventType.FRONT);
}

/**
 * Represents an SPV vault (UTXO-controlled vault) on-chain event
 *
 * @category Events
 */
export abstract class SpvVaultEvent<C extends SpvVaultEventType = SpvVaultEventType> extends ChainEvent<SwapData> {
    abstract readonly eventType: C;

    /**
     * Owner of the underlying SPV vault (UTXO-controlled vault)
     */
    owner: string;
    /**
     * ID of the SPV vault (UTXO-controlled vault)
     */
    vaultId: bigint;

    constructor(owner: string, vaultId: bigint, contractVersion?: string) {
        super(contractVersion);
        this.owner = owner;
        this.vaultId = vaultId;
    }

}
