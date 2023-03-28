import { useContext } from 'react'
import { Context } from '../contexts/EthPriceProvider'

const useEthPrice = () => {
  const { ethPrice } = useContext(Context)
  return ethPrice
}

export default useEthPrice
