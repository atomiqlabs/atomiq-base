import { SpvVaultEvent, SpvVaultEventType } from "./SpvVaultEvent";
/**
 * SPV vault (UTXO-controlled vault) Claim event representation, a valid withdrawal from an SPV vault
 *
 * @category Events
 */
export declare class SpvVaultClaimEvent extends SpvVaultEvent<SpvVaultEventType.CLAIM> {
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
    constructor(owner: string, vaultId: bigint, btcTxId: string, recipient: string, executionHash: string, amounts: bigint[], caller: string, frontingAddress: string, withdrawCount: number);
}
