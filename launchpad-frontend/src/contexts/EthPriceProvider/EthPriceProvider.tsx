import React, { createContext, useEffect, useState } from 'react'

export interface EthPriceContext {
  ethPrice?: number
}

export const Context = createContext<EthPriceContext>({
  ethPrice: undefined,
})

const EthPriceProvider: React.FC = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<any>()

  useEffect(() => {
    console.log("LOADING ETH PRICE FROM COINGECKO")
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
      .then(res => res.json())
      .then(
        (result) => {
          setEthPrice(result.ethereum.usd);
        },
        (error) => {
          console.log("ERROR LOADING ETH PRICE", error)
        }
      )
  })

  return <Context.Provider value={{ ethPrice }}>{children}</Context.Provider>
}

export default EthPriceProvider
