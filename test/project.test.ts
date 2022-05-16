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
  describe('🔥 Hardhat Runtime Environment extension (4)', function () {
    useEnvironment('hardhat-project')
    this.timeout(0)

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
    it('Should can create new sdk from hre.Sdk', async function () {
      const currentNetwork = NetworkNames.Ropsten
      const hubPrivateKey = process.env.HUB_PRIVATE_KEY as string
      const privateKey = process.env.SENDER_PRIVATE_KEY as string
      console.log('privateKey', privateKey)

      const hubSdk = new this.hre.Sdk(hubPrivateKey, {
        env: EnvNames.TestNets, // Use EnvNames.Mainnet, If you are accessing Mainnets
        networkName: currentNetwork,
        projectKey: process.env.TESTNETS_PROJECT_KEY,
      })

      const sdk = new this.hre.Sdk(privateKey, {
        env: EnvNames.TestNets, // Use EnvNames.Mainnet, If you are accessing Mainnets
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
      const output2 = await sdk.syncAccount()
      console.log('create contract address', output2)
      /*
      console.log('account topUpAccount hash ->', await sdk.topUpAccount()) // only for Etherspot
      console.log(
        'account topUpPaymentDepositAccount hash ->',
        await sdk.topUpPaymentDepositAccount(),
      ) // only for Etherspot
      */
      const output = await sdk.getAccountBalances() // fails on Etherspot, but OK in Ropsten
      console.log('account balances', output.items[0].balance.toString())

      const output3 = await hubSdk.getAccountBalances() // fails on Etherspot, but OK in Ropsten
      console.log('account balances3', output3.items[0].balance.toString())

      const receiver = '0xf3e06eeC1A90A7aEB10F768B924351A0F0158A1A' // Replace with address of your choice // for Ropsten
      const amtInWei = '500000000000000' //Send 0.0005 ETH
      const transaction = await sdk.batchExecuteAccountTransaction({
        to: receiver, //wallet address
        value: amtInWei, //in wei
      })

      console.log('Estimating transaction')
      await sdk
        .estimateGatewayBatch()
        .then(async (result) => {
          console.log('Estimation ', result.estimation)
          const hash = await sdk.submitGatewayBatch()
          console.log('Transaction submitted ', hash)
        })
        .catch((error) => {
          console.log(
            'Transaction estimation failed with error ',
            error.message,
          )
        })

      console.log(
        'payment hub',
        await hubSdk.updatePaymentHub({
          liquidity: utils.parseEther('10'),
        }),
      )
      console.log(
        'payment hub',
        await sdk.updatePaymentHub({
          liquidity: utils.parseEther('10'),
        }),
      )
      console.log(
        'payment hub recipient deposit (updated)',
        await sdk.updatePaymentHubDeposit({
          hub: user,
          totalAmount: utils.parseEther('1'),
        }),
      )
    })
  })
})
function ture(ture: any, arg1: string) {
  throw new Error('Function not implemented.')
}
