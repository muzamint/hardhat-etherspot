import { extendEnvironment } from 'hardhat/config'
import { lazyObject, lazyFunction } from 'hardhat/plugins'

import './type-extensions'

extendEnvironment((hre) => {
  const { Sdk, randomPrivateKey, NetworkNames, EnvNames } = require('etherspot')
  hre.Sdk = lazyFunction(() => Sdk)
  hre.sdk = lazyObject(
    () =>
      new Sdk(randomPrivateKey(), {
        //  networkName: 'xdai' as NetworkNames,
        networkName: 'mainnet' as typeof NetworkNames,
      }),
  )
  hre.testnetSdk = lazyObject(
    () =>
      new Sdk(randomPrivateKey(), {
        //  networkName: 'ropsten' as NetworkNames,
        env: EnvNames.TestNets,
        networkName: 'etherspot' as typeof NetworkNames,
      }),
  )
})
