import React from 'react'
import styled from 'styled-components'
import etherscan from '../../../assets/img/etherscan.png'
import github from '../../../assets/img/github.png'
import uniswap from '../../../assets/img/uniswap.png'
import discord from '../../../assets/img/discord.png'
import twitter from '../../../assets/img/twitter.png'
import benchmark from '../../../assets/img/icon.png'
import coingecko from '../../../assets/img/coingecko.png'
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0x6544b1cd2d28c6c53b52a1ffb8e547740e426b33#code"
      >
        <img src={etherscan} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>Launchpad Contract</span>
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/benchmarkprotocol">
      <img src={github} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>Github</span>
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://info.uniswap.org/pair/0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3"
      >
      <img src={uniswap} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>MARK-ETH</span>
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://info.uniswap.org/pair/0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15"
      >
      <img src={uniswap} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>MARK-USDC</span>
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://www.coingecko.com/en/coins/benchmark-protocol"
      >
      <img src={coingecko} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>CoinGecko</span>
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/HcxAEaHG3X">
      <img src={discord} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>Discord</span>
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/Benchmark_DeFi">
      <img src={twitter} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>Twitter</span>
      </StyledLink>
      <StyledLink target="_blank" href="https://benchmarkprotocol.finance">
      <img src={benchmark} style={{maxHeight:24, marginRight:6}}/>
        <span style={{verticalAlign:'top'}}>Main Site</span>
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    transform: scale(1.15);
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
