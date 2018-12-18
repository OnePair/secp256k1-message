import EthCrypto from "eth-crypto";

export class EthPublicKeyVerifier {

  constructor(options?: object) {
  }

  public verifyPublicKey(rawPublicKey: string, publicKey: string): boolean {
    let ethAddress = EthCrypto.publicKey.toAddress(rawPublicKey).toUpperCase();
    return (ethAddress == publicKey.toUpperCase());
  }

}
