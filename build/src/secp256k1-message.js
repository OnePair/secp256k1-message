"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var publickey_verifiers_1 = require("./publickey-verifiers");
var eth_crypto_1 = __importDefault(require("eth-crypto"));
var PUBLIC_KEY_VERIFIERS = {
    "ETH": publickey_verifiers_1.EthPublicKeyVerifier,
    "BTC": publickey_verifiers_1.BtcPublicKeyVerfier,
    "RAW": publickey_verifiers_1.RawPublicKeyVerifier
};
/*
* TODO: Implement for raw public keys.
*/
var Secp256k1Message = /** @class */ (function () {
    function Secp256k1Message() {
    }
    /*
    * Sign a message.
    *
    * @param {string} message The message to sign.
    * @param {string} privateKey The private key.
    *
    * @return {string} The message signature.
    */
    Secp256k1Message.signMessage = function (message, privateKey) {
        var messageHash = eth_crypto_1.default.hash.keccak256(message);
        var signature = eth_crypto_1.default.sign(privateKey, messageHash);
        return eth_crypto_1.default.hex.compress(signature, true);
    };
    /*
    * Verify a message signature.
    *
    * @param {string} signature The signed message.
    * @param {string} message The original mess.
    * @param {string} publicKey The public key of the signed message.
    *
    * @return {boolean} The verifiation result.
    */
    Secp256k1Message.verifySignature = function (signature, message, publicKey) {
        if (!("type" in publicKey))
            throw new TypeError("Need to provide a public key type!");
        var publicKeyType = publicKey["type"].toUpperCase();
        if (!(publicKeyType in PUBLIC_KEY_VERIFIERS))
            throw new Error("Public key type does not exist!");
        var messageHash = eth_crypto_1.default.hash.keccak256(message);
        var recoveredPublicKey = eth_crypto_1.default.recoverPublicKey(eth_crypto_1.default.hex.decompress(signature, true), messageHash);
        var publicKeyVerifier;
        if ("options" in publicKey)
            publicKeyVerifier = new PUBLIC_KEY_VERIFIERS[publicKeyType](publicKey["options"]);
        else
            publicKeyVerifier = new PUBLIC_KEY_VERIFIERS[publicKeyType]();
        return publicKeyVerifier.verifyPublicKey(recoveredPublicKey, publicKey["publicKey"]);
    };
    return Secp256k1Message;
}());
exports.Secp256k1Message = Secp256k1Message;
