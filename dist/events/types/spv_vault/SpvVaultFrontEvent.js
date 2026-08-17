"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultFrontEvent = exports.isSpvVaultFrontEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
/**
 * Type guard for SPV vault front events
 *
 * @param event
 * @category Events
 */
function isSpvVaultFrontEvent(event) {
    if (!(0, SpvVaultEvent_js_1.isSpvVaultEvent)(event))
        return false;
    const frontEvent = event;
    return frontEvent.eventType === SpvVaultEvent_js_1.SpvVaultEventType.FRONT &&
        typeof (frontEvent.btcTxId) === "string" &&
        typeof (frontEvent.recipient) === "string" &&
        typeof (frontEvent.executionHash) === "string" &&
        Array.isArray(frontEvent.amounts) &&
        frontEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (frontEvent.frontingAddress) === "string";
}
exports.isSpvVaultFrontEvent = isSpvVaultFrontEvent;
/**
 * SPV vault (UTXO-controlled vault) Front event representation, an SPV vault withdrawal was fronted
 *
 * @category Events
 */
class SpvVaultFrontEvent extends SpvVaultEvent_js_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, recipient, executionHash, amounts, frontingAddress, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_js_1.SpvVaultEventType.FRONT;
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.frontingAddress = frontingAddress;
    }
}
exports.SpvVaultFrontEvent = SpvVaultFrontEvent;
