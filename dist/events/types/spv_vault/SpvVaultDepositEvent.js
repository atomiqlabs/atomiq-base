"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultDepositEvent = void 0;
const SpvVaultEvent_js_1 = require("./SpvVaultEvent.js");
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
