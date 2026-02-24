import { ChainSwapType } from "./ChainSwapType";
import { StorageObject } from "../storage/StorageObject";
/**
 * Represents full escrow swap data and parameters
 *
 * @category Chains
 */
export declare abstract class SwapData implements StorageObject {
    /**
     * A mapping of deserializers for different escrow swap data types coming from different smart chain implementations
     */
    static deserializers: {
        [type: string]: new (serialized: any) => any;
    };
    /**
     * Deserializer parsing the chain-specific escrow swap data from a JSON-compatible object representation
     *
     * @param data
     */
    static deserialize<T extends SwapData>(data: any): T;
    /**
     * Gets the offerer, which funds the escrow
     */
    abstract getOfferer(): string;
    /**
     * Sets the offerer to fund the escrow
     *
     * @param newOfferer
     */
    abstract setOfferer(newOfferer: string): void;
    /**
     * Checks whether the provided address is an offerer for this escrow
     *
     * @param address
     */
    abstract isOfferer(address: string): boolean;
    /**
     * Gets the claim, which receives funds from the escrow
     */
    abstract getClaimer(): string;
    /**
     * Sets the claimer which receives funds from the escrow
     *
     * @param newClaimer
     */
    abstract setClaimer(newClaimer: string): void;
    /**
     * Checks whether the provided address is a claimer for this escrow
     *
     * @param address
     */
    abstract isClaimer(address: string): boolean;
    /**
     * @inheritDoc
     */
    abstract serialize(): any;
    /**
     * Returns the type of this escrow
     */
    abstract getType(): ChainSwapType;
    /**
     * Gets the amount of token deposited into the vault by the offerer
     */
    abstract getAmount(): bigint;
    /**
     * Gets the address of the deposited token in a vault
     */
    abstract getToken(): string;
    /**
     * Checks whether the provided token address is the actual token used by this escrow
     *
     * @param token
     */
    abstract isToken(token: string): boolean;
    /**
     * Returns the expiration time of this escrow, after the timeout an offerer is able to refund unilaterally.
     *  taking back funds from the escrow
     */
    abstract getExpiry(): bigint;
    /**
     * Whether this escrow will pay out the claimer, when `true` it pays out normally to the claimer's address, when
     *  `false` it instead keeps the funds inside the contract and assigns them to the claimer's vault inside the
     *  contract
     */
    abstract isPayOut(): boolean;
    /**
     * Whether this escrow will be funded from the offerer's wallet or from the offerer's vault inside the contract,
     *  when `true` it takes funds normally from the offerer's address, when `false` it pulls the funds from the
     *  offerer's vault inside the contract
     */
    abstract isPayIn(): boolean;
    /**
     * Whether the outcome of this escrow should be used to track reputation of the claimer
     */
    abstract isTrackingReputation(): boolean;
    /**
     * Returns the claim hash of the escrow, this specifies a condition that needs to be satisfied to claim
     *  the funds from the escrow
     */
    abstract getClaimHash(): string;
    /**
     * Returns a unique hash of this escrow
     */
    abstract getEscrowHash(): string;
    /**
     * Returns a random variable sequence of this vault, used to ensure the escrow hash is always different
     */
    abstract getSequence(): bigint;
    /**
     * Gets the extraneous data specified when creating this escrow, this provides helpers for 3rd party claimers
     */
    abstract getExtraData(): string | null;
    /**
     * Retrieves required number of confirmations as a hint from the extra data provided, or `null` if no extra
     *  data has been provided when creating the escrow
     */
    abstract getConfirmationsHint(): number | null;
    /**
     * Retrieves the PrTLC transaction nonce as a hint from the extra data provided, or `null` if no extra
     *  data has been provided when creating the escrow
     */
    abstract getNonceHint(): bigint | null;
    /**
     * Retrieves the PrTLC transaction txo (transaction output) hash as a hint from the extra data provided,
     *  or `null` if no extra data has been provided when creating the escrow
     */
    abstract getTxoHashHint(): string | null;
    /**
     * Retrieves a hint providing an HTLC hash from the extra data provided, or `null` if no extra data
     *  has been provided when creating the escrow
     */
    getHTLCHashHint(): string | null;
    /**
     * Sets the extra data with hints for this escrow
     *
     * @param extraData
     */
    abstract setExtraData(extraData: string): void;
    /**
     * Gets the security deposit, which is an amount of native tokens deposited by the caller (initiator) on
     *  escrow initialization to guarantee the execution, this acts as a compensation for offerer if he has
     *  to refund the escrow, otherwise it is returned back to claimer after a successful claim of the escrow
     */
    abstract getSecurityDeposit(): bigint;
    /**
     * Gets the claimer bounty, an amount of native tokens deposited by the caller (initiator) on escrow
     *  initialization, that is paid out to a caller which claims the escrow as a reward, otherwise
     *  returned to the claimer if escrow is refunded
     */
    abstract getClaimerBounty(): bigint;
    /**
     * Returns the total deposit in native token to be deposited by the caller (initiator) on escrow initialization,
     *  due to how claimer bounty and security deposits work, this is basically a max(claimer bounty, security deposit),
     *  because either a swap is claimed (and claimer bounty is paid) or a swap is refunded (and security deposit is paid),
     *  never both!
     */
    abstract getTotalDeposit(): bigint;
    /**
     * Returns the token used for the deposit (security deposit & claimer bounty) (usually a native token of the
     *  underlying smart chain)
     */
    abstract getDepositToken(): string;
    /**
     * Checks whether a provided token is used as a deposit token (security deposit & claimer bounty) for the escrow
     *
     * @param token
     */
    abstract isDepositToken(token: string): boolean;
    /**
     * Checks equality between 2 swap data objects
     *
     * @param other
     */
    abstract equals(other: SwapData): boolean;
    /**
     * Checks whether the escrow contains an execution action (swap+)
     */
    hasSuccessAction(): boolean;
}
