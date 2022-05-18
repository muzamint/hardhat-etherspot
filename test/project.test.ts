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
      const currentNetwork = NetworkNames.Etherspot // or NetworkNames.Ropsten
      const hubPrivateKey = process.env.HUB_PRIVATE_KEY as WalletProviderLike // randomPrivateKey()
      const privateKey = process.env.SENDER_PRIVATE_KEY as WalletProviderLike // randomPrivateKey()

      console.log('run test on network:', currentNetwork)
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

      console.log('🌈 hub wallet address:', hubState.accountAddress)
      console.log('🌈 use wallet address:', userState.accountAddress)
      console.log('🐤 project key', process.env.TESTNETS_PROJECT_KEY)
      const projects = await sdk.services.projectService.currentProject
      console.log('getProjects', projects)
      assert(ture, 'always ture')
      // console.log('create session', await sdk.createSession());
      await sdk.computeContractAccount({ sync: true })
      //    const output2 = await sdk.syncAccount()
      //    console.log('create contract address', output2)

      const onNetwork = await currentNetwork.valueOf()

      if (onNetwork === 'etherspot') {
        console.log(
          'sdk account topUpAccount hash ->',
          await sdk.topUpAccount(),
        ) // only for Etherspot

        console.log(
          'sdk account topUpPaymentDepositAccount hash ->',
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
      } else {
        console.log('topUp only in Etherspot testnet!!, skip on ', onNetwork)
      }
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
      const newValue = Math.random()
      const updateNewValue = newValue.toString()
      const updateDeposit = (newValue / 2).toString()
      console.log('✅ update payment hub a NewValue', updateNewValue)
      console.log(
        'payment hub to hubSdk',
        await hubSdk.updatePaymentHub({
          liquidity: utils.parseEther(updateNewValue),
        }),
      )

      console.log(
        'payment hub to sdk',
        await sdk.updatePaymentHub({
          liquidity: utils.parseEther(updateNewValue),
        }),
      )
      console.log(
        '✅ update payment hub deposit half of the NewValue',
        updateDeposit,
      )
      console.log('payment hub recipient deposit (updated)')
      console.log('starging sdk.updatePaymentHubDeposit()...💥')
      await sdk
        .updatePaymentHubDeposit({
          hub: user,
          totalAmount: utils.parseEther(updateDeposit),
        })
        .then((r) => {
          console.log('Result -> ', r)
          assert(true)
        })
        .catch((e) => {
          console.log('Error -> ', e)
          assert(false)
        })
    })
  })
})
function ture(ture: any, arg1: string) {
  throw new Error('Function not implemented.')
}
