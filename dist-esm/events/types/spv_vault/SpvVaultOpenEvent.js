import { isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent.js";
/**
 * Type guard for SPV vault open events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultOpenEvent(event) {
    if (!isSpvVaultEvent(event))
        return false;
    const openEvent = event;
    return openEvent.eventType === SpvVaultEventType.OPEN &&
        typeof (openEvent.btcTxId) === "string" &&
        typeof (openEvent.vout) === "number";
}
/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
export class SpvVaultOpenEvent extends SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, vout, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEventType.OPEN;
        this.btcTxId = btcTxId;
        this.vout = vout;
    }
}
