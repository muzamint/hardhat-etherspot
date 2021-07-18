# hardhat-etherspot
This plugin integrates [Etherspot](https://docs.etherspot.dev/) `1.14.0` into Hardhat.

## What

This plugin brings to Hardhat the Etherspot module and an initialized instance of Etherspot.

# Installation

```bash
npm install --save-dev @muzamint/hardhat-etherspot etherspot
// or
yarn add -D @muzamint/hardhat-etherspot etherspot
```

And add the following statement to your `hardhat.config.js`:

```js
require("@muzamint/hardhat-etherspot");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```js
import "@muzamint/hardhat-etherspot";
```

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin adds the following elements to the `HardhatRuntimeEnvironment`:

- `Etherspot`: The etherspot module.
- `sdk`: An instantiated etherspot-sdk object connected to the selected network.

## Usage

Install it and access Etherspot through the Hardhat Runtime Environment anywhere you need it (tasks, scripts, tests, etc). For example, in your `hardhat.config.js`:

```js
require("@muzamint/hardhat-etherspot");

// task action function receives the Hardhat Runtime Environment as second argument
task("signature "Sign Message", 
async (_, { sdk }) => {
const signature = await sdk.signMessage({
    message: 'test message',
  });

  console.log('signature', signature);
});

module.exports = {};
```

And then run `npx hardhat signature` to try it.

Read the documentation on the [Hardhat Runtime Environment](https://hardhat.org/documentation/#hardhat-runtime-environment-hre) to learn how to access the HRE in different ways to use Etherspot from anywhere the HRE is accessible.
