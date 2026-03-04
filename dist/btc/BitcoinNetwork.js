"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitcoinNetwork = void 0;
/**
 * An enum for various bitcoin network types
 *
 * @category Bitcoin
 */
var BitcoinNetwork;
(function (BitcoinNetwork) {
    /**
     * Bitcoin mainnet network
     */
    BitcoinNetwork[BitcoinNetwork["MAINNET"] = 0] = "MAINNET";
    /**
     * Bitcoin testnet3 network (older test network)
     */
    BitcoinNetwork[BitcoinNetwork["TESTNET"] = 1] = "TESTNET";
    /**
     * Bitcoin testnet3 network (older test network), alias for {@link BitcoinNetwork.TESTNET}
     */
    BitcoinNetwork[BitcoinNetwork["TESTNET3"] = 1] = "TESTNET3";
    /**
     * Bitcoin testnet4 network (newer test network)
     */
    BitcoinNetwork[BitcoinNetwork["TESTNET4"] = 2] = "TESTNET4";
    /**
     * Bitcoin regtest network, for local regression test modes
     */
    BitcoinNetwork[BitcoinNetwork["REGTEST"] = 3] = "REGTEST";
})(BitcoinNetwork = exports.BitcoinNetwork || (exports.BitcoinNetwork = {}));
