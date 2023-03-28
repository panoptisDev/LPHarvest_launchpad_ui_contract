import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
  getUsdcContract
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import useEthPrice from './useEthPrice'
export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  totalBalance:BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const wethContact = getWethContract(sushi)
  const usdcContact = getUsdcContract(sushi)
  const block = useBlock()
  const ethPrice = useEthPrice();

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            usdcContact,
            ethPrice,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, sushi, ethPrice])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllStakedValue()
      console.log("BALANCES FROM GET STAKED VALUE", balances)
    }
  }, [account, block, masterChefContract, setBalance, sushi, ethPrice])

  return balances
}

export default useAllStakedValue
