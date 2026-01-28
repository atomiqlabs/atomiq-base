import {SpvVaultEvent, SpvVaultEventType} from "./SpvVaultEvent";


/**
 * SPV vault (UTXO-controlled vault) Open event representation, new SPV vault was opened
 *
 * @category Events
 */
export class SpvVaultOpenEvent extends SpvVaultEvent<SpvVaultEventType.OPEN> {

    readonly eventType = SpvVaultEventType.OPEN;

    /**
     * Vault ownership utxo transaction ID
     */
    btcTxId: string;
    /**
     * Vault ownership utxo transaction vout
     */
    vout: number;

    constructor(owner: string, vaultId: bigint, btcTxId: string, vout: number) {
        super(owner, vaultId);
        this.btcTxId = btcTxId;
        this.vout = vout;
    }

}