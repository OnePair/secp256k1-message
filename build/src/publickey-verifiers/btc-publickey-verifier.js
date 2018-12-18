"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bitcore_lib_1 = require("bitcore-lib");
var eth_crypto_1 = __importDefault(require("eth-crypto"));
exports.MAINNET = "mainnet";
exports.TESTNET = "testnet";
var AVAILABLE_NETWORKS = [exports.MAINNET, exports.TESTNET];
var BtcPublicKeyVerfier = /** @class */ (function () {
    function BtcPublicKeyVerfier(options) {
        this.network = options && options["network"] || "mainnet";
    }
    BtcPublicKeyVerfier.prototype.verifyPublicKey = function (rawPublicKey, publicKey) {
        if (AVAILABLE_NETWORKS.indexOf(this.network.toLowerCase()) == -1)
            throw new TypeError("Bitcoin network is not available!");
        var network;
        if (this.network == "mainnet")
            network = bitcore_lib_1.Networks.livenet;
        else if (this.network == "testnet")
            network = bitcore_lib_1.Networks.testnet;
        var compressedPublicKey = eth_crypto_1.default.publicKey.compress(rawPublicKey);
        var btcPublicKey = new bitcore_lib_1.PublicKey(compressedPublicKey);
        var btcAddress = new bitcore_lib_1.Address(btcPublicKey, network).toString();
        return (btcAddress == publicKey);
    };
    return BtcPublicKeyVerfier;
}());
exports.BtcPublicKeyVerfier = BtcPublicKeyVerfier;
