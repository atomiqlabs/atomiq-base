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
    BitcoinNetwork[BitcoinNetwork["MAINNET"] = 0] = "MAINNET";
    BitcoinNetwork[BitcoinNetwork["TESTNET"] = 1] = "TESTNET";
    BitcoinNetwork[BitcoinNetwork["TESTNET4"] = 2] = "TESTNET4";
    BitcoinNetwork[BitcoinNetwork["REGTEST"] = 3] = "REGTEST";
})(BitcoinNetwork = exports.BitcoinNetwork || (exports.BitcoinNetwork = {}));
