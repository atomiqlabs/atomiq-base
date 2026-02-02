"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpvWithdrawalTransactionData = void 0;
const buffer_1 = require("buffer");
/**
 * Represents the data of a single SPV vault (UTXO-controlled) vault withdrawal
 *
 * @category Swaps
 */
class SpvWithdrawalTransactionData {
    /**
     * Deserializer parsing the chain-specific spv vault withdrawal data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize(data) {
        if (SpvWithdrawalTransactionData.deserializers[data.type] != null) {
            return new SpvWithdrawalTransactionData.deserializers[data.type](data);
        }
        throw new Error(`No deserializer found for spv withdrawal tx data type: ${data.type}`);
    }
    /**
     * Parses and creates a withdrawal data from the bitcoin transaction
     *
     * @throws {Error} If the bitcoin transaction has invalid formatting
     */
    constructor(btcTx) {
        if (btcTx.ins.length < 2)
            throw new Error("Need at least 2 inputs");
        if (btcTx.outs.length < 2)
            throw new Error("Need at least 2 outputs");
        const nSequence0 = BigInt(btcTx.ins[0].sequence);
        const nSequence1 = BigInt(btcTx.ins[1].sequence);
        if ((nSequence0 & 0x80000000n) != 0x80000000n)
            throw new Error("nSequence0 high bit not set!");
        if ((nSequence1 & 0x80000000n) != 0x80000000n)
            throw new Error("nSequence0 high bit not set!");
        const callerFeeRate = nSequence0 & 0xfffffn;
        const executionFeeRate = nSequence1 & 0xfffffn;
        const frontingFeeRate = ((nSequence0 >> 10n) & 1047552n) | ((nSequence1 >> 20n) & 1023n);
        const executionExpiry = btcTx.locktime + 1000000000;
        if (executionExpiry >= Math.pow(2, 32))
            throw new Error("Execution expiry overflow");
        const opReturnOutput = btcTx.outs[1];
        //Parse script
        const opReturnData = buffer_1.Buffer.from(opReturnOutput.scriptPubKey.hex, "hex");
        if (opReturnData.length === 0)
            throw new Error("Output 1 empty script");
        if (opReturnData.at(0) !== 0x6a)
            throw new Error("Output 1 is not OP_RETURN");
        const secondByte = opReturnData.at(1);
        if (secondByte == null)
            throw new Error("Output 1 OP_RETURN empty");
        if (secondByte === 0)
            throw new Error("Output 1 OP_RETURN followed by OP_0");
        let data;
        if (secondByte === 0x4c) { //OP_PUSHDATA1
            const dataLength = opReturnData.at(2);
            if (dataLength == null)
                throw new Error("Output 1 OP_RETURN OP_PUSHDATA1 invalid length!");
            data = opReturnData.subarray(3, 3 + dataLength);
            if (data.length !== dataLength)
                throw new Error("Output 1 OP_RETURN data length mismatch!");
        }
        else if (secondByte <= 0x4b) { //OP_PUSH<length>
            const dataLength = secondByte;
            data = opReturnData.subarray(2, 2 + dataLength);
            if (data.length !== dataLength)
                throw new Error("Output 1 OP_RETURN data length mismatch!");
        }
        else {
            throw new Error("Output 1 invalid push opcode");
        }
        //Parse OP_RETURN data
        const res = this.fromOpReturnData(data);
        this.recipient = res.recipient;
        this.rawAmounts = res.rawAmounts;
        this.callerFeeRate = callerFeeRate;
        this.frontingFeeRate = frontingFeeRate;
        this.executionFeeRate = executionFeeRate;
        this.executionHash = res.executionHash;
        this.executionExpiry = executionExpiry;
        this.btcTx = btcTx;
    }
    /**
     * @inheritDoc
     */
    serialize() {
        return this.btcTx;
    }
    /**
     * Gets the recipient of the funds for this withdrawal
     */
    getRecipient() {
        return this.recipient;
    }
    /**
     * Returns the amounts of tokens that the recipient is gonna receive (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getOutputWithoutFees() {
        return this.rawAmounts;
    }
    /**
     * Returns the fee paid out to the caller which submits the withdrawal transaction data on the smart chain,
     *  the fee is paid out from all the respective tokens being withdrawn from the vault (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getCallerFee() {
        return this.rawAmounts.map(val => val * this.callerFeeRate / 100000n);
    }
    /**
     * Returns the fee paid out to the fronter which fronts the actual withdrawal on the smart chain,
     *  the fee is paid out from all the respective tokens being withdrawn from the vault (NOTE: This returns raw token amounts,
     *  which must be scaled by their respective vault configured multiplier to represent the actual amount
     *  of tokens)
     */
    getFrontingFee() {
        return this.rawAmounts.map(val => val * this.frontingFeeRate / 100000n);
    }
    /**
     * Returns the fee that is transferred to the execution contract if swap+ execution action is assigned,
     *  (NOTE: This returns raw token amounts, which must be scaled by their respective vault configured
     *  multiplier to represent the actual amount of tokens)
     */
    getExecutionFee() {
        return [this.rawAmounts[0] * this.executionFeeRate / 100000n];
    }
    /**
     * Returns the total amount of tokens withdrawn from the vault (including all the fees) (NOTE: This returns
     *  raw token amounts, which must be scaled by their respective vault configured multiplier to represent
     *  the actual amount of tokens)
     *
     * @throws {Error} In case the amounts overflow
     */
    getTotalOutput() {
        const amounts = [...this.getOutputWithoutFees()];
        const callerFee = this.getCallerFee();
        if (callerFee != null)
            callerFee.forEach((fee, i) => {
                if (fee == null || fee === 0n)
                    return;
                if (amounts[i] == null)
                    throw new Error("Caller fee token out of bounds");
                amounts[i] += fee;
            });
        const frontingFee = this.getFrontingFee();
        if (frontingFee != null)
            frontingFee.forEach((fee, i) => {
                if (fee == null || fee === 0n)
                    return;
                if (amounts[i] == null)
                    throw new Error("Fronting fee token out of bounds");
                amounts[i] += fee;
            });
        const executionFee = this.getExecutionFee();
        if (executionFee != null)
            executionFee.forEach((fee, i) => {
                if (fee == null || fee === 0n)
                    return;
                if (amounts[i] == null)
                    throw new Error("Execution fee token out of bounds");
                amounts[i] += fee;
            });
        amounts.forEach((val, index) => {
            if (val >= 2n ** 64n)
                throw new Error("Token " + index + " amount out of bounds");
        });
        return amounts;
    }
    /**
     * Returns the execution action to be scheduled via the execution contract (swap+) or `null` if none specified
     */
    getExecutionData() {
        if (this.executionHash == null)
            return null;
        return {
            executionHash: this.executionHash,
            executionExpiry: this.executionExpiry
        };
    }
    /**
     * Gets the transaction ID of the bitcoin transaction authorizing the withdrawal
     */
    getTxId() {
        return this.btcTx.txid;
    }
    /**
     * Gets the vault ownership UTXO that the bitcoin transaction spends
     */
    getSpentVaultUtxo() {
        const in0 = this.btcTx.ins[0];
        return in0.txid + ":" + in0.vout;
    }
    /**
     * Gets the new vault ownership UTXO created by this transaction
     */
    getCreatedVaultUtxo() {
        return this.getTxId() + ":0";
    }
    /**
     * Gets the output locking script used for the new vault ownership UTXO
     */
    getNewVaultScript() {
        return buffer_1.Buffer.from(this.btcTx.outs[0].scriptPubKey.hex, "hex");
    }
    /**
     * Gets the output btc amount (in satoshis) assigned to the new vault ownership UTXO
     */
    getNewVaultBtcAmount() {
        return this.btcTx.outs[0].value;
    }
}
exports.SpvWithdrawalTransactionData = SpvWithdrawalTransactionData;
/**
 * A mapping of deserializers for different spv vault withdrawal data types coming from different smart chain implementations
 */
SpvWithdrawalTransactionData.deserializers = {};
