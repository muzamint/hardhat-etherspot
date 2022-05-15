// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from 'chai'
import { randomPrivateKey, NetworkNames, EnvNames } from '../src/etherspot'
import { useEnvironment } from './helpers'

describe('💥 Integration tests for the @muzamint/hardhat-etherspot plugin 💥', function () {
  describe('🔥 Hardhat Runtime Environment extension (4)', function () {
    useEnvironment('hardhat-project')

    it('Should add the Sdk field', function () {
      assert.instanceOf(this.hre.sdk, this.hre.Sdk)
    })

    it('Should be tree', () => {
      assert(ture, 'always ture')
    })

    it('Should be on mainnet for hre.sdk', function () {
      const network = this.hre.sdk.state.network.name
      console.log('🐝 hre.sdk network is ->', network, '🐝')
      assert.equal(network, NetworkNames.Mainnet)
    })

    it('Should be a etherspot testnet for hre.testnetSdk', function () {
      const testnetSdk = this.hre.testnetSdk

      const network = testnetSdk.state.network.name
      console.log('🦊 hre.testnetSdk network is ->', network, '🦊')
      assert.equal(network, NetworkNames.Etherspot)
    })
  })
})
function ture(ture: any, arg1: string) {
  throw new Error('Function not implemented.')
}
