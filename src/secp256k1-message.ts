import { PublicKeyVerifier } from "./publickey-verifier";
import { EthPublicKeyVerifier, BtcPublicKeyVerfier, RawPublicKeyVerifier } from "./publickey-verifiers";

import EthCrypto from "eth-crypto";

const PUBLIC_KEY_VERIFIERS = {
  "ETH": EthPublicKeyVerifier,
  "BTC": BtcPublicKeyVerfier,
  "RAW": RawPublicKeyVerifier
}

/*
* TODO: Implement for raw public keys.
*/
export class Secp256k1Message {

  /*
  * Sign a message.
  *
  * @param {string} message The message to sign.
  * @param {string} privateKey The private key.
  *
  * @return {string} The message signature.
  */
  public static signMessage(message: string, privateKey: string): string {
    let messageHash = EthCrypto.hash.keccak256(message);
    let signature = EthCrypto.sign(privateKey,
      messageHash);
    return EthCrypto.hex.compress(signature, true);
  }

  /*
  * Verify a message signature.
  *
  * @param {string} signature The signed message.
  * @param {string} message The original mess.
  * @param {string} publicKey The public key of the signed message.
  *
  * @return {boolean} The verifiation result.
  */
  public static verifySignature(signature: string, message: string, publicKey: object): boolean {
    if (!("type" in publicKey))
      throw new TypeError("Need to provide a public key type!");

    let publicKeyType = publicKey["type"].toUpperCase();

    if (!(publicKeyType in PUBLIC_KEY_VERIFIERS))
      throw new Error("Public key type does not exist!");

    let messageHash = EthCrypto.hash.keccak256(message)
    let recoveredPublicKey = EthCrypto.recoverPublicKey(EthCrypto.hex.decompress(signature, true), messageHash);

    let publicKeyVerifier: PublicKeyVerifier;

    if ("options" in publicKey)
      publicKeyVerifier = new PUBLIC_KEY_VERIFIERS[publicKeyType](publicKey["options"]);
    else
      publicKeyVerifier = new PUBLIC_KEY_VERIFIERS[publicKeyType]();

    return publicKeyVerifier.verifyPublicKey(recoveredPublicKey, publicKey["publicKey"]);
  }
}
