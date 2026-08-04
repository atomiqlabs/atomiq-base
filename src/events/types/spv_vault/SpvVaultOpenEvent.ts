import {isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType} from "./SpvVaultEvent.js";

/**
 * Type guard for SPV vault open events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultOpenEvent(event: unknown): event is SpvVaultOpenEvent {
    if(!isSpvVaultEvent(event)) return false;
    const openEvent = event as Partial<SpvVaultOpenEvent>;
    return openEvent.eventType===SpvVaultEventType.OPEN &&
        typeof(openEvent.btcTxId)==="string" &&
        typeof(openEvent.vout)==="number";
}


/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
export class SpvVaultOpenEvent extends SpvVaultEvent<SpvVaultEventType.OPEN> {

    readonly eventType = SpvVaultEventType.OPEN;

    /**
     * Vault ownership utxo transaction ID
     */
    btcTxId: string;
    /**
     * Vault ownership utxo transaction vout
     */
    vout: number;

    constructor(owner: string, vaultId: bigint, btcTxId: string, vout: number, contractVersion?: string) {
        super(owner, vaultId, contractVersion);
        this.btcTxId = btcTxId;
        this.vout = vout;
    }

}
