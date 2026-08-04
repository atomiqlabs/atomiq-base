"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultDepositEvent = exports.isSpvVaultDepositEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
/**
 * Type guard for SPV vault deposit events
 *
 * @param event
 * @category Events
 */
function isSpvVaultDepositEvent(event) {
    if (!(0, SpvVaultEvent_js_1.isSpvVaultEvent)(event))
        return false;
    const depositEvent = event;
    return depositEvent.eventType === SpvVaultEvent_js_1.SpvVaultEventType.DEPOSIT &&
        Array.isArray(depositEvent.amounts) &&
        depositEvent.amounts.every(amount => typeof (amount) === "bigint") &&
        typeof (depositEvent.depositCount) === "number";
}
exports.isSpvVaultDepositEvent = isSpvVaultDepositEvent;
/**
 * SPV vault (UTXO-controlled vault) Deposit event representation, additional funds have been deposited to the SPV vault
 *
 * @category Events
 */
class SpvVaultDepositEvent extends SpvVaultEvent_js_1.SpvVaultEvent {
    constructor(owner, vaultId, amounts, depositCount, contractVersion) {
        super(owner, vaultId, contractVersion);
        this.eventType = SpvVaultEvent_js_1.SpvVaultEventType.DEPOSIT;
        this.amounts = amounts;
        this.depositCount = depositCount;
    }
}
exports.SpvVaultDepositEvent = SpvVaultDepositEvent;
