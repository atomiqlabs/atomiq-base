"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultEvent = exports.isSpvVaultEvent = exports.SpvVaultEventType = void 0;
const ChainEvent_js_1 = require("../ChainEvent.js");
/**
 * Enum of the various types of SPV vault (UTXO-controlled vault) related events
 *
 * @category Events
 */
var SpvVaultEventType;
(function (SpvVaultEventType) {
    SpvVaultEventType[SpvVaultEventType["OPEN"] = 0] = "OPEN";
    SpvVaultEventType[SpvVaultEventType["DEPOSIT"] = 1] = "DEPOSIT";
    SpvVaultEventType[SpvVaultEventType["CLAIM"] = 2] = "CLAIM";
    SpvVaultEventType[SpvVaultEventType["CLOSE"] = 3] = "CLOSE";
    SpvVaultEventType[SpvVaultEventType["FRONT"] = 4] = "FRONT";
})(SpvVaultEventType = exports.SpvVaultEventType || (exports.SpvVaultEventType = {}));
/**
 * Type guard for SPV vault on-chain events
 *
 * @param event
 * @category Events
 */
function isSpvVaultEvent(event) {
    if (event == null || typeof (event) !== "object")
        return false;
    const vaultEvent = event;
    return typeof (vaultEvent.owner) === "string" &&
        typeof (vaultEvent.vaultId) === "bigint" &&
        (vaultEvent.eventType === SpvVaultEventType.OPEN ||
            vaultEvent.eventType === SpvVaultEventType.DEPOSIT ||
            vaultEvent.eventType === SpvVaultEventType.CLAIM ||
            vaultEvent.eventType === SpvVaultEventType.CLOSE ||
            vaultEvent.eventType === SpvVaultEventType.FRONT);
}
exports.isSpvVaultEvent = isSpvVaultEvent;
/**
 * Represents an SPV vault (UTXO-controlled vault) on-chain event
 *
 * @category Events
 */
class SpvVaultEvent extends ChainEvent_js_1.ChainEvent {
    constructor(owner, vaultId, contractVersion) {
        super(contractVersion);
        this.owner = owner;
        this.vaultId = vaultId;
    }
}
exports.SpvVaultEvent = SpvVaultEvent;
