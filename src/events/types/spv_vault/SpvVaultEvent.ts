import {ChainEvent} from "../ChainEvent";
import {SwapData} from "../../../swaps/SwapData";

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

    constructor(owner: string, vaultId: bigint) {
        super();
        this.owner = owner;
        this.vaultId = vaultId;
    }

}
