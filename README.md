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

task("signature", "Sign Message",
async (_, hre) => {
const signature = await hre.sdk.signMessage({
    message: 'test message',
  });

  console.log('signature', signature);
});

module.exports = {};
```

And then run `npx hardhat signature` to try it.

```
$ npx hardhat signature
signature 0xa33bbc64d944b371dfbcdcc55ee208dca29100d34e081cd848a528a7a2e1116b050a9151a06210a84c443559a72e83c78f635a914a5e260a7db1a78bfb62ba081c
```

Read the documentation on the [Hardhat Runtime Environment](https://hardhat.org/documentation/#hardhat-runtime-environment-hre) to learn how to access the HRE in different ways to use Etherspot from anywhere the HRE is accessible.

# For developers
## add your project key to .env
> Copy .env.example file to your own .env file locally. and update your project key to your .env file.
```
```

cat .env.example
```
TESTNETS_PROJECT_KEY="0xf0dasdfasdfasdfasdfasdfadsf"
```
> if you don't have a project key, just skip this step, to run test directly.
## run test
run
```
yarn
```
and, then run
```
yarn test
```
## current errors
```
➜  hardhat-etherspot git:(main) yarn test
yarn run v1.22.15
$ mocha --exit --recursive 'test/**/*.test.ts'


  💥 Integration tests for the @muzamint/hardhat-etherspot plugin 💥
    🔥 To test etherspot sdk itself
hubPrivateKey 0x1308c481d187b7bcfe8150e45845b928dfcaa5b5d391cd2d0c0def656aca00a0
privateKey 0xc49e1d8c4f67b5e5c8e3a72409c3bccb2711397f1ea3f68b2db4cb792645294a
project key 0xf0d2971320d84a6f8de54614b8d0d552
getProjects { key: '0xf0d2971320d84a6f8de54614b8d0d552', metadata: undefined }
sdk account topUpAccount hash -> 0x4c6638949f27969a43669da344cc1b7bc7f8a3f2ddd4688a08eeaf2ecc5b6865
sdk account topUpPaymentDepositAccount hash -> 0x0ec7d291d9a1cf1d5a2e930d524cce60a6e7aecc722ea74a3133cedbc584fc1f
hubSdk account topUpAccount hash -> 0xd2a0e9d2f44ec6b9f409f003f815f9a71322a55c215c72bc0a1fdf81600c0020
hubSdk account topUpPaymentDepositAccount hash -> 0xa93a89a0429da933c33313c1fb9e53e317c6e4536c8204d3ec5cbabf1e97c68d
payment hub PaymentHub {
  address: '0x15B3265BDa6d21218375C2eb67bEFa04dB3B9887',
  token: null,
  liquidity: BigNumber { _hex: '0x02c68af0bb140000', _isBigNumber: true },
  createdAt: 2022-05-16T05:46:07.204Z,
  updatedAt: 2022-05-16T05:46:07.204Z
}
payment hub PaymentHub {
  address: '0xAAbca9552b61760356ff883F2EE00b786a27FD9E',
  token: null,
  liquidity: BigNumber { _hex: '0x02c68af0bb140000', _isBigNumber: true },
  createdAt: 2022-05-16T05:46:08.039Z,
  updatedAt: 2022-05-16T05:46:08.039Z
}
payment hub recipient deposit (updated)
starging sdk.updatePaymentHubDeposit()...
Error ->  HttpException [Error]: Cannot return null for non-nullable field Mutation.updatePaymentHubDeposit.
    at Object.catchApiError (/private/tmp/hardhat-etherspot/node_modules/etherspot/dist/sdk/api/utils/catch-api-error.js:18:29)
    at wrapped (/private/tmp/hardhat-etherspot/node_modules/etherspot/dist/sdk/api/api.service.js:93:25)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at ApiService.wrapCall (/private/tmp/hardhat-etherspot/node_modules/etherspot/dist/sdk/api/api.service.js:99:22)
    at PaymentHubService.updatePaymentHubDeposit (/private/tmp/hardhat-etherspot/node_modules/etherspot/dist/sdk/payments/payment-hub.service.js:360:28)
    at Context.<anonymous> (/private/tmp/hardhat-etherspot/test/project.test.ts:92:7) {
  code: 'INTERNAL_SERVER_ERROR'
}
      1) Should works for sdk.updatePaymentHubDeposit()


  0 passing (16s)
  1 failing

  1) 💥 Integration tests for the @muzamint/hardhat-etherspot plugin 💥
       🔥 To test etherspot sdk itself
         Should works for sdk.updatePaymentHubDeposit():
     AssertionError: Unspecified AssertionError
      at /private/tmp/hardhat-etherspot/test/project.test.ts:103:11
      at processTicksAndRejections (node:internal/process/task_queues:96:5)
      at Context.<anonymous> (test/project.test.ts:92:7)



error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
