import { Address, PublicKey, Networks } from "bitcore-lib";
import EthCrypto from "eth-crypto";

export const MAINNET: string = "mainnet";
export const TESTNET: string = "testnet";

const AVAILABLE_NETWORKS = [MAINNET, TESTNET];

export class BtcPublicKeyVerfier {
  private network: string;

  constructor(options?: object) {
    this.network = options && options["network"] || "mainnet";
  }

  public verifyPublicKey(rawPublicKey: string, publicKey: string): boolean {
    if (AVAILABLE_NETWORKS.indexOf(this.network.toLowerCase()) == -1)
      throw new TypeError("Bitcoin network is not available!");

    let network: any;

    if (this.network == "mainnet")
      network = Networks.livenet;
    else if (this.network == "testnet")
      network = Networks.testnet;

    let compressedPublicKey = EthCrypto.publicKey.compress(rawPublicKey);
    let btcPublicKey = new PublicKey(compressedPublicKey);
    let btcAddress = new Address(btcPublicKey, network).toString();

    return (btcAddress == publicKey);
  }
}
