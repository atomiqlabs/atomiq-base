import {isSpvVaultEvent, SpvVaultEvent, SpvVaultEventType} from "./SpvVaultEvent.js";

/**
 * Type guard for SPV vault claim events
 *
 * @param event
 * @category Events
 */
export function isSpvVaultClaimEvent(event: unknown): event is SpvVaultClaimEvent {
    if(!isSpvVaultEvent(event)) return false;
    const claimEvent = event as Partial<SpvVaultClaimEvent>;
    return claimEvent.eventType===SpvVaultEventType.CLAIM &&
        typeof(claimEvent.btcTxId)==="string" &&
        typeof(claimEvent.recipient)==="string" &&
        typeof(claimEvent.executionHash)==="string" &&
        Array.isArray(claimEvent.amounts) &&
        claimEvent.amounts.every(amount => typeof(amount)==="bigint") &&
        typeof(claimEvent.caller)==="string" &&
        typeof(claimEvent.frontingAddress)==="string" &&
        typeof(claimEvent.withdrawCount)==="number";
}


/**
 * SPV vault (UTXO-controlled vault) Claim event representation, a valid withdrawal from an SPV vault
 *
 * @category Events
 */
export class SpvVaultClaimEvent extends SpvVaultEvent<SpvVaultEventType.CLAIM> {

    readonly eventType = SpvVaultEventType.CLAIM;

    /**
     * Which bitcoin transaction authorized this claim (withdrawal) from the vault
     */
    btcTxId: string;
    /**
     * Recipient of the withdrawn funds
     */
    recipient: string;
    /**
     * If funds should transfered to the execution contract (swap+) this specifies the execution hash of the scheduled
     *  execution
     */
    executionHash: string;
    /**
     * Scaled token amounts that have been claim (withdrawn) from the vault (NOTE: These are scaled by the corresponding vault-defined
     *  multiplier for the tokens)
     */
    amounts: bigint[];
    /**
     * Address of the party which submitted the claim (withdrawal) transaction on the smart chain side
     */
    caller: string;
    /**
     * If the withdrawal was fronted, this contains an address of the party which fronted it, or 0 address if the
     *  withdrawal was not fronted
     */
    frontingAddress: string;
    /**
     * The sequence of this claim (withdrawal) - i.e. the total number of deposits done before this one
     */
    withdrawCount: number;

    constructor(
        owner: string, vaultId: bigint,
        btcTxId: string, recipient: string, executionHash: string, amounts: bigint[],
        caller: string, frontingAddress: string, withdrawCount: number,
        contractVersion?: string
    ) {
        super(owner, vaultId, contractVersion);
        this.btcTxId = btcTxId;
        this.recipient = recipient;
        this.executionHash = executionHash;
        this.amounts = amounts;
        this.caller = caller;
        this.frontingAddress = frontingAddress;
        this.withdrawCount = withdrawCount;
    }

}
