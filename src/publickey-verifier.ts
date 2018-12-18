

export interface PublicKeyVerifier {

  /*
  * Verify that the raw public key matches formatted public key.
  *
  * @param {string} rawPublicKey The raw public key.
  * @param {string} publicKey The formatted public key.
  *
  * @return {boolean} The verification result.
  */
  verifyPublicKey(rawPublicKey: string, publicKey: string): boolean;

}
