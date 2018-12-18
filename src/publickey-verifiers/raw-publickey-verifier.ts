import EthCrypto from "eth-crypto";

export class RawPublicKeyVerifier {
  private compressed: boolean;

  constructor(options?: object) {
    this.compressed = options && options["compressed"] || false;
  }

  public verifyPublicKey(rawPublicKey: string, publicKey: string): boolean {
    if (this.compressed)
      rawPublicKey = EthCrypto.publicKey.compress(rawPublicKey);

    return (rawPublicKey == publicKey);
  }

}
