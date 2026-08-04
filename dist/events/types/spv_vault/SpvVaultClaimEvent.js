"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultClaimEvent = exports.isSpvVaultClaimEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
/**
 * Type guard for SPV vault claim events
 *
 * @param event
 * @category Events
 */
function isSpvVaultClaimEvent(event) {
    if (!(0, SpvVaultEvent_js_1.isSpvVaultEvent)(event))
        return false;
    const claimEvent = event;
    return claimEvent.eventType === SpvVaultEvent_js_1.SpvVaultEventType.CLAIM &&
        typeof (claimEvent.btcTxId) === "string" &&
        typeof (claimEvent.recipient) === "string" &&
        typeof (claimEvent.executionHash) === "string" &&
        Array.isArray(claimEvent.amounts) &&
        claimEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (claimEvent.caller) === "string" &&
        typeof (claimEvent.frontingAddress) === "string" &&
        typeof (claimEvent.withdrawCount) === "number";
}
exports.isSpvVaultClaimEvent = isSpvVaultClaimEvent;
/**
 * SPV vault (UTXO-controlled vault) Claim event representation, a valid withdrawal from an SPV vault
 *
 * @category Events
 */
class SpvVaultClaimEvent extends SpvVaultEvent_js_1.SpvVaultEvent {
    constructor(owner, vaultId, btcTxId, recipient, executionHash, amounts, caller, frontingAddress, withdrawCount, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_js_1.SpvVaultEventType.CLAIM;
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.caller = caller;
        this.frontingAddress = frontingAddress;
        this.withdrawCount = withdrawCount;
    }
}
exports.SpvVaultClaimEvent = SpvVaultClaimEvent;
