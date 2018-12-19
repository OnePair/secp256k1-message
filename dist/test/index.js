"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var chai_1 = require("chai");
describe("Generate signature.", function () {
    it("Should generate a signature.", function () {
        var privateKey = "a9cead836cea1d6e96b8df6a90edc07c18318d5dce77d9d859a6ff6d602c87ef";
        var message = "Hello world!";
        var signature = src_1.Secp256k1Message.signMessage(message, privateKey);
        chai_1.expect(signature).to.be.a("string");
    });
});
describe("Verify signatures.", function () {
    var signature = "U41hVV0U8xQ2ykT2XU0hDvl+ADUfoKrzqB6pSoToiLI4IwR0RC+MEynwy68mm4texU8adD6oxAKTGeiKmeELJRw=";
    var message = "Hello world!";
    var validBtcAddress = "18t3jwW4b9oGw7bz7sNPj6wA2zu2FZQQGa";
    var validEthAddress = "0x219A94AB1F9cF7749f9073ACD5Be74Af74cF0e5d";
    var validRawPublicKey = "95112a233be2ffe5d80172b84767646e7af0987002819379b4478902552cdacaa312e69a42a036d7bc9fdff48eda92e0c89c9de4dc89b52806ce2d451b7c9ea9";
    var validCompressedRawPublicKey = "0395112a233be2ffe5d80172b84767646e7af0987002819379b4478902552cdaca";
    var invalidBtcAddress = "1MZLv76aG6V9HnHpCk3hcaXea1pMZY8mAK";
    var invalidEthAddress = "0xA2cA3D809401E5366D4018e0F3B8aA4e3eB1db87";
    var invalidRawPublicKey = "33d50a31566d35a97e8ea3bb2f33faa4d41ebd6084d0f8d4ab04213baec15c1e4dbe056f88735c4d05de9cc57aff047f6e34a630dbcacb340fb3a447af3382ae";
    var invalidCompressedRawPublicKey = "0233d50a31566d35a97e8ea3bb2f33faa4d41ebd6084d0f8d4ab04213baec15c1e";
    it("Verification against the right Bitcoin address should return true.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: validBtcAddress,
            type: "btc",
            options: { network: "mainnet" }
        });
        chai_1.expect(verificationResult).equal(true);
    });
    it("Verification against the right Ethereum address should return true.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: validEthAddress,
            type: "eth"
        });
        chai_1.expect(verificationResult).equal(true);
    });
    it("Verification against the right raw public key should return true.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: validRawPublicKey,
            type: "raw"
        });
        chai_1.expect(verificationResult).equal(true);
    });
    it("Verification against the right compressed public key should return true.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: validCompressedRawPublicKey,
            type: "raw",
            options: { compressed: true }
        });
        chai_1.expect(verificationResult).equal(true);
    });
    it("Verification against the wrong Bitcoin adress should return false.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: invalidBtcAddress,
            type: "btc",
            options: { network: "mainnet" }
        });
        chai_1.expect(verificationResult).equal(false);
    });
    it("Verification against the wrong Ethereum address should return false.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: invalidEthAddress,
            type: "eth"
        });
        chai_1.expect(verificationResult).equal(false);
    });
    it("Verification against the wrong raw public key should return false.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: invalidRawPublicKey,
            type: "raw"
        });
        chai_1.expect(verificationResult).equal(false);
    });
    it("Verification against the wrong compressed public key should return false.", function () {
        var verificationResult = src_1.Secp256k1Message.verifySignature(signature, message, {
            publicKey: invalidCompressedRawPublicKey,
            type: "raw",
            options: { compressed: true }
        });
        chai_1.expect(verificationResult).equal(false);
    });
});
