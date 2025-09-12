import { ChainSwapType } from "./ChainSwapType";
import { StorageObject } from "../storage/StorageObject";
export declare abstract class SwapData implements StorageObject {
    static deserializers: {
        [type: string]: new (serialized: any) => any;
    };
    static deserialize<T extends SwapData>(data: any): T;
    abstract getOfferer(): string;
    abstract setOfferer(newOfferer: string): void;
    abstract isOfferer(address: string): boolean;
    abstract getClaimer(): string;
    abstract setClaimer(newClaimer: string): void;
    abstract isClaimer(address: string): boolean;
    abstract serialize(): any;
    abstract getType(): ChainSwapType;
    abstract getAmount(): bigint;
    abstract getToken(): string;
    abstract isToken(token: string): boolean;
    abstract getExpiry(): bigint;
    abstract isPayOut(): boolean;
    abstract isPayIn(): boolean;
    abstract getClaimHash(): string;
    abstract getEscrowHash(): string;
    abstract getSequence?(): bigint;
    abstract getExtraData(): string | null;
    abstract getConfirmationsHint(): number | null;
    abstract getNonceHint(): bigint | null;
    abstract getTxoHashHint(): string | null;
    abstract setExtraData(extraData: string): void;
    abstract getSecurityDeposit(): bigint;
    abstract getClaimerBounty(): bigint;
    abstract getTotalDeposit(): bigint;
    abstract getDepositToken(): string;
    abstract isDepositToken(token: string): boolean;
    abstract equals(other: this): boolean;
}
