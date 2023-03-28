import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import { useContext } from 'react'
import { Context } from '../contexts/APYProvider'
import BigNumber from 'bignumber.js'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  totalBalance:BigNumber
}

const useAllStakedValueWithoutAuth = () => {
  const { allAPY } = useContext(Context)
  return allAPY
}

export default useAllStakedValueWithoutAuth
