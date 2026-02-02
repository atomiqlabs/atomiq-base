import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
/**
 * SPV vault (UTXO-controlled vault) Front event representation, an SPV vault withdrawal was fronted
 *
 * @category Events
 */
export declare class SpvVaultFrontEvent extends SpvVaultEvent<SpvVaultEventType.FRONT> {
    readonly eventType = SpvVaultEventType.FRONT;
    /**
     * Withdrawal in this bitcoin transaction is getting fronted
     */
    btcTxId: string;
    /**
     * Original recipient of the fronted withdrawal
     */
    recipient: string;
    /**
     * If funds should transfered to the execution contract (swap+) this specifies the execution hash of the scheduled
     *  execution
     */
    executionHash: string;
    /**
     * Scaled token amounts that have been fronted by the fronter (NOTE: These are scaled by the corresponding vault-defined
     *  multiplier for the tokens)
     */
    amounts: bigint[];
    /**
     * Address of the party which fronted the withdrawal
     */
    frontingAddress: string;
    constructor(owner: string, vaultId: bigint, btcTxId: string, recipient: string, executionHash: string, amounts: bigint[], frontingAddress: string);
}
