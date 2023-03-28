import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../Button'
import Card from '../Card'
import CardContent from '../CardContent'
import CardIcon from '../CardIcon'
import Loader from '../Loader'
import Spacer from '../Spacer'
import { Farm } from '../../contexts/Farms'
import useAllStakedValueWithouAuth, {
  StakedValue,
} from '../../hooks/useAllStakedValueWithoutAuth'
import useFarms from '../../hooks/useFarms'
import useSushi from '../../hooks/useSushi'
import useEthPrice from '../../hooks/useEthPrice'
import useStakedBalance from '../../hooks/useStakedBalance'
import { getEarned, getMasterChefContract } from '../../sushi/utils'
import { bnToDec } from '../../utils'
import markIcon from '../../assets/img/mark.png'
import { NavLink } from 'react-router-dom'


interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber,
  totalBalance: BigNumber
}


interface FarmMenusProps {
  auth: Boolean,
  noWidth?:boolean
}

const APYTicker: React.FC<FarmMenusProps>  = ({auth, noWidth}) => {
  const [farms] = useFarms()
  const { account } = useWallet()

  const ethPrice = useEthPrice()
  const stakedValue = useAllStakedValueWithouAuth()


  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'MARK',
  )

  //console.log("APY FARM INDEX", sushiIndex)
  const hasLoaded = (stakedValue[sushiIndex] && stakedValue[sushiIndex].tokenPriceInWeth.toNumber() > 0)
      ? true
      : false; 

  const sushiPrice = (stakedValue[sushiIndex] && stakedValue[sushiIndex].tokenPriceInWeth.toNumber() > 0)
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber((1.42/ethPrice)) //1.4 USD in ethereum

  //console.log("MARK PRICE", sushiPrice.toString(), stakedValue[sushiIndex], sushiIndex, farms[sushiIndex])

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SUSHI_PER_BLOCK = new BigNumber(34.16666)

  const rows = farms.map((farm, i)=> {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        totalBalance: stakedValue[i]
          ? stakedValue[i].totalBalance
          : null,
        apy: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }

      return farmWithStakedValue

  })

  //console.log("ROWS RENDERING ", rows)


    return (

      <>{hasLoaded  ? 

        <StyledIconMenuContainer noWidth={noWidth}>
        {(!!rows && !!rows[0]) ? (
          rows.map((farm, j) => (
                <React.Fragment key={j}>
                    <StyledIconDisabledContainer className={`hello${farm.pid}`}>
                    <div>
                      <div style={{position:"relative", display:"inline-block", marginLeft:15, marginRight:20, marginTop:0, marginBottom:5, top:-3}} >
                        <img src={require(`../../assets/img/${farm.icon}.png`)} style={{width:30, height:30}}/>
                        <img src={require(`../../assets/img/${farm.name.split("-")[1]}.png`)} style={{width:20, height:20, position:"absolute", bottom:0, right:-10}}/>
                      </div>

                      
                      <div style={{display:"inline-block"}}>

                        <div>{farm.name}</div>

                        <div>

                            {(farm.apy && farm.apy.toNumber()==Infinity) ? '999,999,999,999%': (farm.apy && isNaN(farm.apy.toNumber())) ? '999,999,999,999%' : farm.apy
                              ? `APY: ${farm.apy
                                  .times(new BigNumber(100))
                                  .toNumber()
                                  .toLocaleString('en-US')
                                  .slice(0, -1)}%`
                              : null}

                        </div>
                       </div>
                    </div>
                    </StyledIconDisabledContainer>
                </React.Fragment>
          ))
        ) : null}

        </StyledIconMenuContainer>

        : null
      }
      </>

    )

}

interface FarmMenuStyle {
  noWidth?:boolean
}

const StyledIconGrowingContainer = styled.div`
position:relative;
display:inline-block;
  &:hover {
    transform: scale(1.15);
  }
`
const StyledIconDisabledContainer = styled.div`

display:inline-block;
margin:0 10px;
`
const StyledIconMenuContainer = styled.div<FarmMenuStyle>`
  text-align:'center',
`

export default APYTicker
