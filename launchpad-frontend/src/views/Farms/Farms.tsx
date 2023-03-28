import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

//import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'
import Spacer from '../../components/Spacer'
import FarmCards from './components/FarmCards'
import FarmMenus from './components/FarmMenus'
const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={false}
                subtitle="Earn MARK tokens by staking Uniswap V2 LP Tokens."
                title="Choose a Pool"
              />
              <Spacer size="md" />
              <FarmMenus auth={true}/>
              <Spacer size="md" />
              <FarmCards auth={true}/>
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm/>
            </Route>
            <Spacer size="lg" />
          </>
        ) : (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={false}
                subtitle="Earn MARK tokens by staking Uniswap V2 LP Tokens."
                title="Choose a Pool"
              />
              <Spacer size="md" />
              <FarmMenus auth={false}/>
              <Spacer size="md" />
              <FarmCards auth={false}/>
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm/>
            </Route>
            <Spacer size="lg" />
          </>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
