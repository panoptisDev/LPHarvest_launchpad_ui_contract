import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import useEthPrice from '../../../hooks/useEthPrice'
import useStakedBalance from '../../../hooks/useStakedBalance'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import markIcon from '../../assets/img/mark.png'
const Flip = require('react-reveal/Flip');

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber,
  totalBalance: BigNumber
}

interface FarmCardsProps {
  auth: Boolean
}
const FarmCards: React.FC<FarmCardsProps>  = ({auth}) => {
  const [farms] = useFarms()
  //console.log("FARMS", farms)
  const { account } = useWallet()
  const ethPrice = useEthPrice()
  const stakedValue = useAllStakedValue()

  if (auth){
    //console.log("STAKED VALUE ALL", stakedValue)



    const sushiIndex = farms.findIndex(
      ({ tokenSymbol }) => tokenSymbol === 'MARK',
    )

    //console.log("APY FARM INDEX", sushiIndex)

    const sushiPrice = (stakedValue[sushiIndex] && stakedValue[sushiIndex].tokenPriceInWeth.toNumber() > 0)
        ? stakedValue[sushiIndex].tokenPriceInWeth
        : new BigNumber((1.42/ethPrice)) //1.4 USD in ethereum

    //console.log("MARK PRICE", sushiPrice.toString(), stakedValue[sushiIndex], sushiIndex, farms[sushiIndex])

    const BLOCKS_PER_YEAR = new BigNumber(2336000)
    const SUSHI_PER_BLOCK = new BigNumber(34.16666)

    const rows = farms.reduce<FarmWithStakedValue[][]>(
      (farmRows, farm, i) => {

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

        /*if (stakedValue[i]){
          //console.log("FARM LP TOKEN SUPPLY",stakedValue[i] )
          console.log("APY", i, farmWithStakedValue.apy.toNumber(), stakedValue[i].poolWeight.toNumber(), stakedValue[i].totalWethValue.toNumber());
        }*/
        
        const newFarmRows = [...farmRows]
        if (newFarmRows[newFarmRows.length - 1].length === 4) {
          newFarmRows.push([farmWithStakedValue])
        } else {
          newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
        }
        return newFarmRows
      },
      [[]],
    )

      return (
        <StyledCards>
          {!!rows[0].length ? (
            rows.map((farmRow, i) => (
              <StyledRow key={i}>
                {farmRow.map((farm, j) => (
                  <React.Fragment key={j}>
                    <FarmCard farm={farm} auth={auth} />
                    {(j === 0 || j === 1 || j === 2) && <StyledSpacer />}
                  </React.Fragment>
                ))}
              </StyledRow>
            ))
          ) : (
            <StyledLoadingWrapper>
              <Loader text="Loading..." />
            </StyledLoadingWrapper>
          )}
        </StyledCards>
      )

  } else {
     //console.log("FARMS", farms)
    const rows = farms.reduce<FarmWithStakedValue[][]>(
      (farmRows, farm, i) => {
        let myapy = false;
        const farmWithStakedValue = {
          ...farm,
          ...stakedValue[i],
          apy: new BigNumber(0),
        }
        
        const newFarmRows = [...farmRows]
        if (newFarmRows[newFarmRows.length - 1].length === 4) {
          newFarmRows.push([farmWithStakedValue])
        } else {
          newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
        }
        return newFarmRows
      },
      [[]],
    )

    //console.log("MY ROWS", rows)
      return (
        <StyledCards>
          {!!rows[0].length ? (
            rows.map((farmRow, i) => (
              <StyledRow key={i}>
                {farmRow.map((farm, j) => (
                  <React.Fragment key={j}>
                    <FarmCard farm={farm} auth={auth} />
                    {(j === 0 || j === 1 || j === 2) && <StyledSpacer />}
                  </React.Fragment>
                ))}
              </StyledRow>
            ))
          ) : (
            <StyledLoadingWrapper>
              <Loader text="Loading..." />
            </StyledLoadingWrapper>
          )}
        </StyledCards>
      )
  }
}

interface FarmCardProps {
  farm: FarmWithStakedValue
  auth: Boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, auth }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()
  const ethPrice = useEthPrice()

  const myLPTokenBalance = useStakedBalance(farm.pid);
  //console.log("FARM", farm)

  const mySharePercent = myLPTokenBalance.div(farm.totalBalance).times(new BigNumber(100))
                      .toNumber()
                      
//console.log("MY SHARE PERCENT", mySharePercent)
  //console.log("MY FARM SHARE PERCENT", farm.pid, mySharePercent, myLPTokenBalance, farm.totalBalance)
  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  return (
    
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
              { (farm.name.split("-")[0]=="MARK") ? (
                  <MultiplierBadge>5x Rewards</MultiplierBadge>
                ) : null
              }

          <Flip left>
          <div style={{position:"relative"}}>
            <img src={require(`./../../../assets/img/${farm.icon}.png`)} style={{width:50, height:50, margin:8}}/>
            <img src={require(`./../../../assets/img/${farm.name.split("-")[1]}.png`)} style={{width:30, height:30, margin:8, position:"absolute", bottom:0, right:-15}}/>
            </div></Flip>
            <Flip left><StyledTitle>{farm.name}</StyledTitle></Flip>
            <a href={`https://info.uniswap.org/pair/${farm.lpTokenAddress}`} target="_blank"><img src={require(`./../../../assets/img/info.png`)} style={{width:25, height:25, top:10, right:10, position:"absolute"}}/></a>
            {/*<StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
            </StyledDetails>*/}
            <Spacer size="sm"/>
            {!auth ? (<StyledInsight>
              <span>APY</span>
              <span>Connect Wallet</span>
              </StyledInsight>):(
            <StyledInsight>
              <span>APY</span>
              <span>
                {(farm.apy && farm.apy.toNumber()==Infinity) ? '999,999,999,999%': (farm.apy && isNaN(farm.apy.toNumber())) ? '999,999,999,999%' : farm.apy
                  ? `${farm.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : ' Loading ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>)}

            {!auth ? (<StyledInsight>
              <span>Pool Value</span>
              <span>---</span>
              </StyledInsight>):(
            <StyledInsight>
              <span>Pool Value</span>
              <span>
                {(farm.totalWethValue && farm.totalWethValue.toNumber()==0) ? '$0.00': farm.totalWethValue 
                  ? '$'+`${farm.totalWethValue
                      .times(ethPrice)
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}`
                  : ' Loading ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>)}

            {!auth ? (<StyledInsight>
              <span>Pool Share</span>
              <span>---</span>
              </StyledInsight>):(
            <StyledInsight>
              <span>Pool Share</span>
              <span>
                {(isNaN(mySharePercent)) ? "0%" : mySharePercent
                  ? mySharePercent.toLocaleString('en-US')+'%'
                  : (mySharePercent === 0)
                  ?
                  "0%"
                  : ' Loading ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>)}

            <Spacer />

            <Button
              disabled={!auth || !poolActive}
              text={(auth && poolActive) ? 'Select' : 'Connect Wallet to Select'}
              to={`/pools/${farm.id}`}
              noBottomMargin={true}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const MultiplierBadge = styled.div`
  background-color: ${(props) => props.theme.color.green[500]};
  border-radius:6px;
  padding:6px 12px;
  font-size:12px;
  color:#000;
  font-weight:700;
  position:absolute;
  top:-14px;
`

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 3) / 4);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height:100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #ffffff;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #999;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
