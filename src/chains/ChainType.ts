import {SwapData} from "../swaps/SwapData";
import {ChainEvents} from "../events/ChainEvents";
import {SwapContract} from "../swaps/SwapContract";
import {BtcRelay} from "../btcrelay/BtcRelay";
import {AbstractSigner, ChainInterface} from "./ChainInterface";
import {SpvVaultData} from "../spv_swap/SpvVaultData";
import {SpvVaultContract} from "../spv_swap/SpvVaultContract";
import {SpvWithdrawalTransactionData} from "../spv_swap/SpvWithdrawalTransactionData";

/**
 * A comprehensive unified type struct for a given chain, contains all the type definitions of a given chain
 *
 * @category Chains
 */
export type ChainType<
    ChainId extends string = string,
    PreFetchData = any,
    PreFetchVerification = any,
    TXType = any,
    SignedTXType = any,
    Signer extends AbstractSigner = AbstractSigner,
    NativeSigner = any,
    T extends SwapData = SwapData,
    C extends SwapContract<T, TXType, PreFetchData, PreFetchVerification, Signer, ChainId> = SwapContract<T, TXType, PreFetchData, PreFetchVerification, Signer, ChainId>,
    I extends ChainInterface<TXType, SignedTXType, Signer, ChainId, NativeSigner> = ChainInterface<TXType, SignedTXType, Signer, ChainId, NativeSigner>,
    E extends ChainEvents<T> = ChainEvents<T>,
    B extends BtcRelay<any, TXType, any, Signer> = BtcRelay<any, TXType, any, Signer>,
    SpvWithdrawalData extends SpvWithdrawalTransactionData = SpvWithdrawalTransactionData,
    SpvData extends SpvVaultData<SpvWithdrawalData> = SpvVaultData<SpvWithdrawalData>,
    SpvContract extends SpvVaultContract<TXType, Signer, ChainId, SpvWithdrawalData, SpvData> = SpvVaultContract<TXType, Signer, ChainId, SpvWithdrawalData, SpvData>
> = {
    ChainId: ChainId,
    PreFetchData: PreFetchData,
    PreFetchVerification: PreFetchVerification,
    TX: TXType,
    SignedTXType: SignedTXType,
    Signer: Signer,
    ChainInterface: I,
    Data: T,
    Contract: C,
    Events: E,
    BtcRelay: B,
    SpvVaultData: SpvData,
    SpvVaultContract: SpvContract,
    SpvVaultWithdrawalData: SpvWithdrawalData,
    NativeSigner: NativeSigner
}
