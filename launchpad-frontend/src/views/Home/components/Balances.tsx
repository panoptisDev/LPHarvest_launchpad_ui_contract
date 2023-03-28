import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress, getSushiSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import markIcon from '../../assets/img/mark.png'
import Countdown from 'react-countdown';
import useEthPrice from '../../../hooks/useEthPrice'

const Flip = require('react-reveal/Flip');

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 2 : end > 1e5 ? 0 : 2}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}



const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  //const [ethPrice, setEthPrice] = useState<number>();
  const sushi = useSushi()
  const allStakedValue = useAllStakedValue()


  const ethPrice = useEthPrice()
  console.log("ETH PRICE IMPORTED", ethPrice)
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()


/*
  if (allStakedValue && allStakedValue[0]){
    console.log("GOT ALL STAKED VALUE!!!!", allStakedValue[0].totalWethValue)
  }
  */
  const [farms] = useFarms()


  const sumWeth = farms.reduce(
    (c, { id }, i) => (allStakedValue[i] && allStakedValue[i].totalWethValue) ? (c + (allStakedValue[i].totalWethValue.toNumber() || 0)) : 0,
    0,
  )
  //console.log("GOT SUM WETH", sumWeth)

  //console.log("sumWeth", sumWeth)

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(sushi)
      //console.log("SUPPLY", supply)
      setTotalSupply(supply)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <Flip left>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="Your MARK Balance" />
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance, 9) : 'Connect Wallet 🦊'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending
          <FootnoteValue>
            <PendingRewards /> MARK
          </FootnoteValue>
        </Footnote>
        </Flip>
      </Card>
      <Spacer />

      <Card>
      <Flip left>
        <CardContent>
          <Label text="Total MARK Supply" />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply, 9) : (!!account) ? "Loading...": "Connect Wallet 🦊"}
          />
        </CardContent>
        <Footnote>
          Rewards per block
          <FootnoteValue>34.16</FootnoteValue>
        </Footnote>
        </Flip>
      </Card>

      <Spacer />

            <Card>
            <Flip left>
        <CardContent>
          <Label text="Total Value Locked" />
          <Value
            value={((!!account && !!sumWeth) && (ethPrice && (sumWeth || sumWeth===0))) ? "$" + (ethPrice * sumWeth).toLocaleString('en-US', {maximumFractionDigits:2})  : (!!account) ? "Loading...": "Connect Wallet 🦊"}
          />
        </CardContent>
        <Footnote>
          Total rewards
          <FootnoteValue>6.75m MARK</FootnoteValue>
        </Footnote>
        </Flip>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 2px ${(props) => props.theme.color.green[500]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
