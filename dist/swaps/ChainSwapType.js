"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSwapType = void 0;
/**
 * Smart chain escrow swap types
 *
 * @category Chains
 */
var ChainSwapType;
(function (ChainSwapType) {
    /**
     * A hashlock based swap identified by a payment hash `P` requiring a hash preimage witness `s` such that `H(s) = P`,
     *  actual chain implementations might slightly differ!
     */
    ChainSwapType[ChainSwapType["HTLC"] = 0] = "HTLC";
    /**
     * A proof-time locked based swap (PrTLC), which verifies a bitcoin transaction via a light client, and enforces
     *  that the transaction pays out exactly `x` BTC to a pre-determined output script
     */
    ChainSwapType[ChainSwapType["CHAIN"] = 1] = "CHAIN";
    /**
     * A proof-time locked based swap (PrTLC), which verifies a bitcoin transaction via a light client, enforces
     *  that the transaction pays out exactly `x` BTC to a pre-determined output script and also checks the
     *  transaction nonce to prevent replay attacks (the nonce is composed of transaction input nSequence fields
     *  and transaction's locktime)
     */
    ChainSwapType[ChainSwapType["CHAIN_NONCED"] = 2] = "CHAIN_NONCED";
    /**
     * A simple proof-time locked based swap (PrTLC), which verifies a specific bitcoin transaction ID via a light client
     */
    ChainSwapType[ChainSwapType["CHAIN_TXID"] = 3] = "CHAIN_TXID";
})(ChainSwapType = exports.ChainSwapType || (exports.ChainSwapType = {}));
