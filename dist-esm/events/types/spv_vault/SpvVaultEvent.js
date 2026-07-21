import { ChainEvent } from "../ChainEvent.js";
/**
 * Enum of the various types of SPV vault (UTXO-controlled vault) related events
 *
 * @category Events
 */
export var SpvVaultEventType;
(function (SpvVaultEventType) {
    SpvVaultEventType[SpvVaultEventType["OPEN"] = 0] = "OPEN";
    SpvVaultEventType[SpvVaultEventType["DEPOSIT"] = 1] = "DEPOSIT";
    SpvVaultEventType[SpvVaultEventType["CLAIM"] = 2] = "CLAIM";
    SpvVaultEventType[SpvVaultEventType["CLOSE"] = 3] = "CLOSE";
    SpvVaultEventType[SpvVaultEventType["FRONT"] = 4] = "FRONT";
})(SpvVaultEventType || (SpvVaultEventType = {}));
/**
 * Represents an SPV vault (UTXO-controlled vault) on-chain event
 *
 * @category Events
 */
export class SpvVaultEvent extends ChainEvent {
    constructor(owner, vaultId, contractVersion) {
        super(contractVersion);
        this.owner = owner;
        this.vaultId = vaultId;
    }
}
