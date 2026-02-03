/// <reference types="node" />
import { Buffer } from "buffer";
import { BitcoinRpc, BtcTx } from "./BitcoinRpc";
import { BtcBlock } from "../../btcrelay/types/BtcBlock";
/**
 * A type defining a bitcoin transaction with its blockheight and optional input addresses populated
 *
 * @category Bitcoin
 */
export type BtcTxWithBlockheight = BtcTx & {
    blockheight?: number;
    inputAddresses?: string[];
};
/**
 * A type defining a single UTXO belonging to an address
 *
 * @category Bitcoin
 */
export type BtcAddressUtxo = {
    txid: string;
    vout: number;
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
    value: bigint;
};
/**
 * An extended interface for Bitcoin, that allows querying balances and UTXOs of any address + other utilities
 *
 * @category Bitcoin
 */
export interface BitcoinRpcWithAddressIndex<T extends BtcBlock> extends BitcoinRpc<T> {
    /**
     * Returns the current fee rate required for submitted bitcoin transactions in sats/vB
     */
    getFeeRate(): Promise<number>;
    /**
     * Returns confirmed & unconfirmed balances for a given wallet address
     *
     * @param address
     */
    getAddressBalances(address: string): Promise<{
        confirmedBalance: bigint;
        unconfirmedBalance: bigint;
    }>;
    /**
     * Returns UTXOs owned by the given wallet address
     * @param address
     */
    getAddressUTXOs(address: string): Promise<BtcAddressUtxo[]>;
    /**
     * Returns CPFP (children-pay-for-parent) data for a given transaction, or null if transaction is not found
     *  or already confirmed
     *
     * @param txId
     */
    getCPFPData(txId: string): Promise<{
        effectiveFeePerVsize: number;
        adjustedVsize: number;
    } | null>;
    /**
     * @inheritDoc
     */
    getTransaction(txId: string): Promise<BtcTxWithBlockheight | null>;
    /**
     * Awaits till the given transaction gets confirmed
     *
     * @param txId Transaction ID to monitor
     * @param requiredConfirmations Required number of confirmations
     * @param stateUpdateCbk Optional update callback called with the current status of the bitcoin transaction
     * @param abortSignal
     * @param intervalSeconds How often to poll
     */
    waitForTransaction(txId: string, requiredConfirmations: number, stateUpdateCbk?: (btcTx?: BtcTxWithBlockheight, txEtaMS?: number) => void, abortSignal?: AbortSignal, intervalSeconds?: number): Promise<BtcTxWithBlockheight>;
    /**
     * Returns an estimate after which time the tx will confirm with the required amount of confirmations,
     *  confirmationDelay of -1 means the transaction won't confirm in the near future
     *
     * @param tx
     * @param requiredConfirmations
     *
     * @returns estimated confirmation delay, -1 if the transaction won't confirm in the near future, null if the
     *  transaction was replaced or was confirmed in the meantime
     */
    getConfirmationDelay(tx: BtcTx, requiredConfirmations: number): Promise<number | null>;
    /**
     * Checks if an address received the transaction with the required txoHash, returns info about that
     *  specific transaction if found, or null if not found
     *
     * @param address Address that should receive the transaction
     * @param txoHash Required output txoHash
     */
    checkAddressTxos(address: string, txoHash: Buffer): Promise<{
        tx: Omit<BtcTxWithBlockheight, "hex" | "raw">;
        vout: number;
    } | null>;
    /**
     * Waits till the address receives a transaction containing a specific txoHash
     *
     * @param address Address that should receive the transaction
     * @param txoHash Required output txoHash
     * @param requiredConfirmations Required confirmations of the transaction
     * @param stateUpdateCbk Callback for transaction state updates
     * @param abortSignal Abort signal
     * @param intervalSeconds How often to check new transaction
     */
    waitForAddressTxo(address: string, txoHash: Buffer, requiredConfirmations: number, stateUpdateCbk: (btcTx?: Omit<BtcTxWithBlockheight, "hex" | "raw">, vout?: number, txEtaMS?: number) => void, abortSignal?: AbortSignal, intervalSeconds?: number): Promise<{
        tx: Omit<BtcTxWithBlockheight, "hex" | "raw">;
        vout: number;
    }>;
}
