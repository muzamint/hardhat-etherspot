# hardhat-etherspot
This plugin integrates [Etherspot](https://docs.etherspot.dev/) `1.14.0` into Hardhat.

## What

This plugin brings to Hardhat the Etherspot module and an initialized instance of Etherspot.

# Installation

```bash
npm install --save-dev @mingderwang/hardhat-web3 web3
```

And add the following statement to your `hardhat.config.js`:

```js
require("@mingderwang/hardhat-web3");
```

Or, if you are using TypeScript, add this to your `hardhat.config.ts`:

```js
import "@mingderwang/hardhat-web3";
```

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin adds the following elements to the `HardhatRuntimeEnvironment`:

- `Etherspot`: The etherspot module.
- `sdk`: An instantiated etherspot-sdk object connected to the selected network.

## Usage

Install it and access Etherspot.js through the Hardhat Runtime Environment anywhere you need it (tasks, scripts, tests, etc). For example, in your `hardhat.config.js`:

```js
require("@mingderwang/hardhat-etherspot");

// task action function receives the Hardhat Runtime Environment as second argument
task("accounts", "Prints accounts", async (_, { web3 }) => {
  console.log(await web3.eth.getAccounts());
});

module.exports = {};
```

And then run `npx hardhat accounts` to try it.

Read the documentation on the [Hardhat Runtime Environment](https://hardhat.org/documentation/#hardhat-runtime-environment-hre) to learn how to access the HRE in different ways to use Etherspot.js from anywhere the HRE is accessible.