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
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import markIcon from '../../assets/img/mark.png'
import { NavLink } from 'react-router-dom'
const Rotate = require('react-reveal/Rotate');
interface FarmMenusProps {
  auth: Boolean,
  noWidth?:boolean
}
const FarmMenus: React.FC<FarmMenusProps>  = ({auth, noWidth}) => {
  const [farms] = useFarms()
  const { account } = useWallet()

  if (auth){

      return (
        <StyledIconMenuContainer noWidth={noWidth}>
          {!!farms.length ? (
            farms.map((farm, i) => (
                <React.Fragment key={i}>
                  <NavLink to={`/pools/${farm.id}`}>
                  <StyledIconGrowingContainer>
                    <Rotate><img src={require(`./../../../assets/img/${farm.icon}.png`)} style={{width:50, height:50, marginLeft:15, marginRight:15, marginBottom:12}}/></Rotate>
                    <img src={require(`./../../../assets/img/${farm.name.split("-")[1]}.png`)} style={{width:30, height:30, margin:8, position:"absolute", bottom:0, right:-10}}/>
                    </StyledIconGrowingContainer>
                  </NavLink>
                </React.Fragment>
            ))
          ) : null}
        </StyledIconMenuContainer>
      )

  } else {
      return (
        <StyledIconMenuContainer noWidth={noWidth}>
          {!!farms.length ? (
            farms.map((farm, i) => (
                <React.Fragment key={i}>
                <StyledIconDisabledContainer>
                    <Rotate><img src={require(`./../../../assets/img/${farm.icon}.png`)} style={{width:50, height:50, marginLeft:15, marginRight:15, marginBottom:12}}/></Rotate>
                    <img src={require(`./../../../assets/img/${farm.name.split("-")[1]}.png`)} style={{width:30, height:30, margin:8, position:"absolute", bottom:0, right:-10}}/>
                    </StyledIconDisabledContainer>
                </React.Fragment>
            ))
          ) : null}
        </StyledIconMenuContainer>
      )
  }
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
position:relative;
display:inline-block;
`
const StyledIconMenuContainer = styled.div<FarmMenuStyle>`
  width: ${(props) => props.noWidth ? "200px" : "800px" };
  margin: ${(props) => props.noWidth ? "0 auto" : "auto"};
  text-align:'center',
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default FarmMenus
