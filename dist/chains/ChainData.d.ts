import { ChainType } from "./ChainType";
import { BitcoinRpc } from "../btc/rpc/BitcoinRpc";
import { BitcoinNetwork } from "../btc/BitcoinNetwork";
import { IStorageManager } from "../storage/IStorageManager";
import { StorageObject } from "../storage/StorageObject";
/**
 * A type defining tokens available on the selected chain, indexed by ticker
 *
 * @category Tokens
 */
export type BaseTokenType<T extends string = string> = {
    [ticker in T]: {
        address: string;
        decimals: number;
        displayDecimals?: number;
    };
};
/**
 * A comprehensive chain data type for a specific chain
 *
 * @category Chains
 */
export type ChainData<T extends ChainType> = {
    chainId: ChainType["ChainId"];
    chainInterface: T["ChainInterface"];
    btcRelay: T["BtcRelay"];
    chainEvents: T["Events"];
    swapContract: T["Contract"];
    swapDataConstructor: new (data: any) => T["Data"];
    spvVaultContract: T["SpvVaultContract"];
    spvVaultDataConstructor: new (data: any) => T["SpvVaultData"];
    spvVaultWithdrawalDataConstructor: new (data: any) => T["SpvVaultWithdrawalData"];
};
/**
 * An initializer function that returns populated {@link ChainData} for a given chain based on the passed
 *  arguments
 *
 * @category Chains
 */
export type ChainInitializerFn<O, C extends ChainType> = (options: O, bitcoinRpc: BitcoinRpc<any>, network: BitcoinNetwork, storageCtor: <T extends StorageObject>(name: string) => IStorageManager<T>) => ChainData<C>;
/**
 * Chain definition containing
 *
 * @category Chains
 */
export type ChainInitializer<O, C extends ChainType, T extends BaseTokenType> = {
    /**
     * Chain identifier string
     */
    chainId: C["ChainId"];
    /**
     * Initializer function returning the {@link ChainData}
     */
    initializer: ChainInitializerFn<O, C>;
    /**
     * Available tokens on the chain
     */
    tokens: T;
    /**
     * Chain type
     *
     * NOTE: This is just a type reference, should not be used as value
     */
    chainType: C;
    /**
     * The type of the options to be passed to the initializer function
     *
     * NOTE: This is just a type reference, should not be used as value
     */
    options: O;
};
