/**
 * An enum for various bitcoin network types
 *
 * @category Bitcoin
 */
export enum BitcoinNetwork {
    /**
     * Bitcoin mainnet network
     */
    MAINNET=0,
    /**
     * Bitcoin testnet3 network (older test network)
     */
    TESTNET=1,
    /**
     * Bitcoin testnet3 network (older test network), alias for {@link BitcoinNetwork.TESTNET}
     */
    TESTNET3=1,
    /**
     * Bitcoin testnet4 network (newer test network)
     */
    TESTNET4=2,
    /**
     * Bitcoin regtest network, for local regression test modes
     */
    REGTEST=3
}
