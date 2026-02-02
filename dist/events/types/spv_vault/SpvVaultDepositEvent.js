"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultDepositEvent = void 0;
const SpvVaultEvent_1 = require("./SpvVaultEvent");
/**
 * SPV vault (UTXO-controlled vault) Deposit event representation, additional funds have been deposited to the SPV vault
 *
 * @category Events
 */
class SpvVaultDepositEvent extends SpvVaultEvent_1.SpvVaultEvent {
    constructor(owner, vaultId, amounts, depositCount) {
        super(owner, vaultId);
        this.eventType = SpvVaultEvent_1.SpvVaultEventType.DEPOSIT;
        this.amounts = amounts;
        this.depositCount = depositCount;
    }
}
exports.SpvVaultDepositEvent = SpvVaultDepositEvent;
