"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvVaultData = void 0;
/**
 * Represents the state of a single SPV vault (UTXO-controlled vault)
 *
 * @category Chains
 */
class SpvVaultData {
    /**
     * Deserializer parsing the chain-specific spv vault data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize(data) {
        if (SpvVaultData.deserializers[data.type] != null) {
            return new SpvVaultData.deserializers[data.type](data);
        }
        throw new Error(`No deserializer found for spv vault data type: ${data.type}`);
    }
    /**
     * A helper function which calculates the vault balances after processing an array of claims (withdrawals)
     *
     * @param priorWithdrawalTxs
     */
    calculateStateAfter(priorWithdrawalTxs) {
        const balances = [...this.getBalances()];
        let withdrawalCount = this.getWithdrawalCount();
        let utxo = this.getUtxo();
        for (let withdrawalTx of priorWithdrawalTxs) {
            if (withdrawalTx.getSpentVaultUtxo() !== utxo)
                throw new Error("Invalid transaction, doesn't spend prior vault UTXO!");
            withdrawalTx.getTotalOutput().forEach((value, i) => {
                if (balances[i] == null)
                    throw new Error("Tried to withdraw non-existing token!");
                balances[i].rawAmount -= value;
                if (balances[i].rawAmount < 0n)
                    throw new Error("Prior transaction withdrew more than available in vault");
            });
            utxo = withdrawalTx.getCreatedVaultUtxo();
            withdrawalCount++;
        }
        balances.forEach(balance => {
            balance.scaledAmount = balance.rawAmount * balance.multiplier;
        });
        return {
            withdrawalCount,
            balances
        };
    }
}
exports.SpvVaultData = SpvVaultData;
/**
 * A mapping of deserializers for different spv vault data types coming from different smart chain implementations
 */
SpvVaultData.deserializers = {};
