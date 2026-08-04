import {isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType} from "./SpvVaultEvent.js";

/**
 * Type guard for SPV vault front events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultFrontEvent(event: unknown): event is SpvVaultFrontEvent {
    if(!isSpvVaultEvent(event)) return false;
    const frontEvent = event as Partial<SpvVaultFrontEvent>;
    return frontEvent.eventType===SpvVaultEventType.FRONT &&
        typeof(frontEvent.btcTxId)==="string" &&
        typeof(frontEvent.recipient)==="string" &&
        typeof(frontEvent.executionHash)==="string" &&
        Array.isArray(frontEvent.amounts) &&
        frontEvent.amounts.every(amount => typeof(amount)==="bigint") &&
        typeof(frontEvent.frontingAddress)==="string";
}


/**
 * SPV vault (UTXO-controlled vault) Front event representation, an SPV vault withdrawal was fronted
 *
 * @category Events
 */
export class SpvVaultFrontEvent extends SpvVaultEvent<SpvVaultEventType.FRONT> {

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
    frontingAddress: string

    constructor(
        owner: string, vaultId: bigint,
        btcTxId: string, recipient: string, executionHash: string, amounts: bigint[],
        frontingAddress: string, contractVersion?: string
    ) {
        super(owner, vaultId, contractVersion);
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.frontingAddress = frontingAddress;
    }

}
