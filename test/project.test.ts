// tslint:disable-next-line no-implicit-dependencies
import { assert, expect } from 'chai'
import { utils } from 'ethers'
import {
  WalletProviderLike,
  randomPrivateKey,
  NetworkNames,
  EnvNames,
  P2PPaymentDeposit,
} from '../src/etherspot'
import { useEnvironment } from './helpers'
require('dotenv').config()

describe('💥 Integration tests for the @muzamint/hardhat-etherspot plugin 💥', function () {
  describe('🔥 To test etherspot sdk itself', function () {
    useEnvironment('hardhat-project')
    this.timeout(0)

    it('Should works for sdk.updatePaymentHubDeposit()', async function () {
      const currentNetwork = NetworkNames.Etherspot
      const hubPrivateKey = randomPrivateKey()
      const privateKey = randomPrivateKey()
      console.log('hubPrivateKey', hubPrivateKey)
      console.log('privateKey', privateKey)

      const hubSdk = new this.hre.Sdk(hubPrivateKey, {
        env: EnvNames.TestNets,
        networkName: currentNetwork,
        projectKey: process.env.TESTNETS_PROJECT_KEY,
      })

      const sdk = new this.hre.Sdk(privateKey, {
        env: EnvNames.TestNets,
        networkName: currentNetwork,
        projectKey: process.env.TESTNETS_PROJECT_KEY,
      })

      const { state: hubState } = hubSdk
      const { state: userState } = sdk
      const { accountAddress: hub } = hubState
      const { accountAddress: user } = userState

      console.log('project key', process.env.TESTNETS_PROJECT_KEY)
      const projects = await sdk.services.projectService.currentProject
      console.log('getProjects', projects)
      assert(ture, 'always ture')
      // console.log('create session', await sdk.createSession());
      await sdk.computeContractAccount({ sync: true })
      //    const output2 = await sdk.syncAccount()
      //    console.log('create contract address', output2)
      console.log('sdk account topUpAccount hash ->', await sdk.topUpAccount()) // only for Etherspot

      console.log(
        'account topUpPaymentDepositAccount hash ->',
        await sdk.topUpPaymentDepositAccount(),
      ) // only for Etherspot
      console.log(
        'hubSdk account topUpAccount hash ->',
        await hubSdk.topUpAccount(),
      ) // only for Etherspot

      console.log(
        'hubSdk account topUpPaymentDepositAccount hash ->',
        await hubSdk.topUpPaymentDepositAccount(),
      ) // only for Etherspot

      /*
      await sdk
        .getAccountBalances()
        .then((result: any) =>
          console.log('account balances', result.items[0].balance.toString()),
        )
        .catch((e: any) => console.error(e))

      const output3 = await hubSdk.getAccountBalances() // fails on Etherspot, but OK in Ropsten
      console.log('account balances3', output3.items[0].balance.toString())
*/
      console.log(
        'payment hub',
        await hubSdk.updatePaymentHub({
          liquidity: utils.parseEther('0.2'),
        }),
      )
      console.log(
        'payment hub',
        await sdk.updatePaymentHub({
          liquidity: utils.parseEther('0.2'),
        }),
      )
      console.log(
        'payment hub recipient deposit (updated)',
        await sdk.updatePaymentHubDeposit({
          hub: user,
          totalAmount: utils.parseEther('0.05'),
        }),
      )
    })
  })
})
function ture(ture: any, arg1: string) {
  throw new Error('Function not implemented.')
}
