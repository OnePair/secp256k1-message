"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eth_crypto_1 = __importDefault(require("eth-crypto"));
var RawPublicKeyVerifier = /** @class */ (function () {
    function RawPublicKeyVerifier(options) {
        this.compressed = options && options["compressed"] || false;
    }
    RawPublicKeyVerifier.prototype.verifyPublicKey = function (rawPublicKey, publicKey) {
        if (this.compressed)
            rawPublicKey = eth_crypto_1.default.publicKey.compress(rawPublicKey);
        return (rawPublicKey == publicKey);
    };
    return RawPublicKeyVerifier;
}());
exports.RawPublicKeyVerifier = RawPublicKeyVerifier;
