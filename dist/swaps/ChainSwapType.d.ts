/**
 * Smart chain escrow swap types
 *
 * @category Chains
 */
export declare enum ChainSwapType {
    /**
     * A hashlock based swap identified by a payment hash `P` requiring a hash preimage witness `s` such that `H(s) = P`,
     *  actual chain implementations might slightly differ!
     */
    HTLC = 0,
    /**
     * A proof-time locked based swap (PrTLC), which verifies a bitcoin transaction via a light client, and enforces
     *  that the transaction pays out exactly `x` BTC to a pre-determined output script
     */
    CHAIN = 1,
    /**
     * A proof-time locked based swap (PrTLC), which verifies a bitcoin transaction via a light client, enforces
     *  that the transaction pays out exactly `x` BTC to a pre-determined output script and also checks the
     *  transaction nonce to prevent replay attacks (the nonce is composed of transaction input nSequence fields
     *  and transaction's locktime)
     */
    CHAIN_NONCED = 2,
    /**
     * A simple proof-time locked based swap (PrTLC), which verifies a specific bitcoin transaction ID via a light client
     */
    CHAIN_TXID = 3
}
