
# secp256k1-message

> A nodejs library for secp256k1 message signing and verification.

The `secp256k1-message` library allows for verification against transformed secp256k1 public keys.

### Supported Public Key Formats

* Bitcoin Address
* Ethereum Address
* Raw secp256k1 public key
* Compressed secp256k1 public key

### Install

Install with npm:

```
npm install secp256-message
```

Include the library:

```js
import { Secp256k1Message } from "secp256-message";
```

### Examples

#### Sign a Message

```js
let privateKey = "a9cead836cea1d6e96b8df6a90edc07c18318d5dce77d9d859a6ff6d602c87ef"; // Generated with eth-crypto
let message = "Hello world!";

let signature = Secp256k1Message.signMessage(message, privateKey);
```

#### Verify a Signed Message

Against a Bitcoin address:

```js
let signature = "U41hVV0U8xQ2ykT2XU0hDvl+ADUfoKrzqB6pSoToiLI4IwR0RC+MEynwy68mm4texU8adD6oxAKTGeiKmeELJRw=";
let message = "Hello world!";
let signerAddress = "18t3jwW4b9oGw7bz7sNPj6wA2zu2FZQQGa";

let verificationResult = Secp256k1Message.verifySignature(signature, message, {
      publicKey: signerAddress,
      type: "btc",
      options: { network: "mainnet" }
    });

Console.log("Signed message valid:", verificationResult);
```

Against an Ethereum address:

```js
let signature = "U41hVV0U8xQ2ykT2XU0hDvl+ADUfoKrzqB6pSoToiLI4IwR0RC+MEynwy68mm4texU8adD6oxAKTGeiKmeELJRw=";
let message = "Hello world!";
let signerAddress = "0x219A94AB1F9cF7749f9073ACD5Be74Af74cF0e5d";

let verificationResult = Secp256k1Message.verifySignature(signature, message, {
      publicKey: signerAddress,
      type: "eth"
    });

Console.log("Signed message valid:", verificationResult);
```

Against a public key:

```js
let signature = "U41hVV0U8xQ2ykT2XU0hDvl+ADUfoKrzqB6pSoToiLI4IwR0RC+MEynwy68mm4texU8adD6oxAKTGeiKmeELJRw=";
let message = "Hello world!";
let publicKey = "95112a233be2ffe5d80172b84767646e7af0987002819379b4478902552cdacaa312e69a42a036d7bc9fdff48eda92e0c89c9de4dc89b52806ce2d451b7c9ea9";

let verificationResult = Secp256k1Message.verifySignature(signature, message, {
      publicKey: publicKey,
      type: "raw"
    });

Console.log("Signed message valid:", verificationResult);
```

Against a compressed public key:

```js
let signature = "U41hVV0U8xQ2ykT2XU0hDvl+ADUfoKrzqB6pSoToiLI4IwR0RC+MEynwy68mm4texU8adD6oxAKTGeiKmeELJRw=";
let message = "Hello world!";
let publicKey = "0395112a233be2ffe5d80172b84767646e7af0987002819379b4478902552cdaca";

let verificationResult = Secp256k1Message.verifySignature(signature, message, {
      publicKey: publicKey,
      type: "raw",
      options: { compressed: true }
    });

Console.log("Signed message valid:", verificationResult);
```








