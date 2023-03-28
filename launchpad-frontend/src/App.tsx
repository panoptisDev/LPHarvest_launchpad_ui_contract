import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import SushiProvider from './contexts/SushiProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import FarmMenus from './views/Farms/components/FarmMenus'
import Logo from './components/Logo'
import EthPriceProvider from './contexts/EthPriceProvider'
import APYProvider from './contexts/APYProvider'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <ShowDesktop>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/pools">
            <Farms />
          </Route>
        </Switch>
        </ShowDesktop>
        <ShowMobile>
        <br/><br/>
          <Logo/>
          <br/>
          <p style={{color:"#fff", textAlign:"center", maxWidth:"80%", margin:"0 auto"}}>Please load the launchpad on desktop to stake the LP tokens below and earn MARK.</p>
          <br/><br/>
          <FarmMenus auth={false} noWidth={true}/>
        </ShowMobile>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const ShowDesktop = styled.span`
  @media (max-width: 899px) {
    display:none;
  }
`
const ShowMobile = styled.span`
  display:none;
  @media (max-width: 899px) {
    display:inline !important;
  }
`

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          fortmatic: { apiKey: 'pk_live_82BB2A0E81B6F62A' },
          portis: { dAppId: 'f8669947-169a-445c-a6cf-ad6ae7c01a59' },
        }}
      >
      <EthPriceProvider>
      
       
        <SushiProvider>
        <APYProvider>
          <TransactionProvider>
            <FarmsProvider>
             
                <ModalsProvider>{children}</ModalsProvider>
              
            </FarmsProvider>
          </TransactionProvider>
          </APYProvider>
        </SushiProvider>
        
        </EthPriceProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
