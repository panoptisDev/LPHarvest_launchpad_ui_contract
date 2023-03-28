import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react'



import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import {
  getFarms,
  getTotalLPWethValue,
} from '../../sushi/utils'

import useSushi from './../../hooks/useSushi'
import useBlock from './../../hooks/useBlock'
import useEthPrice from './../../hooks/useEthPrice'

import Web3 from 'web3'
import { contractAddresses } from './../../sushi/lib/constants'
const ERC20Abi = require('./../../sushi/lib/abi/erc20.json')
const MasterChefAbi =require('./../../sushi/lib/abi/masterchef.json')
const SushiAbi =require('./../../sushi/lib/abi/sushi.json')
const WETHAbi =require('./../../sushi/lib/abi/weth.json')
const UNIV2PairAbi =require('./../../sushi/lib/abi/uni_v2_lp.json')






export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  totalBalance:BigNumber
}

export interface APYContext {
  allAPY?: StakedValue[]
}

export const Context = createContext<APYContext>({
  allAPY: undefined,
})

const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.eth.aragon.network/"));
  const masterChefContract = new web3.eth.Contract(MasterChefAbi, contractAddresses.masterChef[1]);
  const wethContract = new web3.eth.Contract(WETHAbi, contractAddresses.weth[1]);
  const usdcContract = new web3.eth.Contract(ERC20Abi, contractAddresses.usdc[1]);

const APYProvider: React.FC = ({ children }) => {


  const [allAPY, setAllAPY] = useState([] as Array<StakedValue>)
  const farms = getFarms()
  const ethPrice = useEthPrice();

  //console.log("FARMS loaded without auth.", farms)


  //console.log("WEB 3", web3, web3.eth)



  const fetchAllStakedValue = useMemo(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpTokenAddress,
          tokenAddress,
        }: {
          pid: number
          lpTokenAddress: string
          tokenAddress: string
        }) => { 

          //console.log("token/contract addresses", lpTokenAddress, lpTokenAddress)

          const lpContract = new web3.eth.Contract(UNIV2PairAbi, lpTokenAddress);
          const tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);

          return getTotalLPWethValue(
            masterChefContract,
            wethContract,
            usdcContract,
            ethPrice,
            lpContract,
            tokenContract,
            pid,
          )
        }

      ),
    )

    setAllAPY(balances)
  }, [masterChefContract, ethPrice])

  if (allAPY){
    return <Context.Provider value={{ allAPY }}>{children}</Context.Provider>
  } else {
    return <Context.Provider value={null}>{children}</Context.Provider>
  }
}

export default APYProvider
