"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eth_crypto_1 = __importDefault(require("eth-crypto"));
var EthPublicKeyVerifier = /** @class */ (function () {
    function EthPublicKeyVerifier(options) {
    }
    EthPublicKeyVerifier.prototype.verifyPublicKey = function (rawPublicKey, publicKey) {
        var ethAddress = eth_crypto_1.default.publicKey.toAddress(rawPublicKey).toUpperCase();
        return (ethAddress == publicKey.toUpperCase());
    };
    return EthPublicKeyVerifier;
}());
exports.EthPublicKeyVerifier = EthPublicKeyVerifier;
