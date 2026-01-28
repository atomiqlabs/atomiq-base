import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
/**
 * SPV vault (UTXO-controlled vault) Close event representation, a withdrawal with invalid transaction
 *  spending the vault UTXO but not correctly comitting the data has been made, this returns the full
 *  balance of the vault back to its owner.
 *
 * @category Events
 */
export declare class SpvVaultCloseEvent extends SpvVaultEvent<SpvVaultEventType.CLOSE> {
    readonly eventType = SpvVaultEventType.CLOSE;
    /**
     * Bitcoin transaction ID that caused the error and close event to happen
     */
    btcTxId: string;
    /**
     * A representation of the actual error that has happened
     */
    error: string;
    constructor(owner: string, vaultId: bigint, btcTxId: string, error: string);
}
