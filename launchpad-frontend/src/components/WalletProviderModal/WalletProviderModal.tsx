import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import metamaskLogo from '../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/wallet-connect.svg'
import fortmaticLogo from '../../assets/img/fortmatic.svg'
import portisLogo from '../../assets/img/portis.svg'
import authereumLogo from '../../assets/img/authereum.svg'
import torusLogo from '../../assets/img/torus.svg'

import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'

import WalletCard from './components/WalletCard'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  return (
    <Modal noPadding={true}>
      <ModalInnerContainer>
      <Spacer size="md" />
      <ModalTitle text="Select a wallet provider" />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ height: 32 }} />}
              onConnect={() => connect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          <Spacer size="md" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect"
            />
          </StyledWalletCard>
          <VerticalSpacer/>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={fortmaticLogo} style={{ height: 24 }} />}
              onConnect={() => connect('fortmatic')}
              title="Fortmatic"
            />
          </StyledWalletCard>
          <Spacer size="md" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={portisLogo} style={{ height: 24 }} />}
              onConnect={() => connect('portis')}
              title="Portis"
            />
          </StyledWalletCard>
          <VerticalSpacer/>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={authereumLogo} style={{ height: 24 }} />}
              onConnect={() => connect('authereum')}
              title="Authereum"
            />
          </StyledWalletCard>
          <Spacer size="md" />
          <StyledWalletCard>
            <WalletCard
              icon={<img src={torusLogo} style={{ height: 24 }} />}
              onConnect={() => connect('torus')}
              title="Torus"
            />
          </StyledWalletCard>


        </StyledWalletsWrapper>
              <ModalActions>
              <div style={{textAlign:"center", display:"block",}}>
          <a style={{color:"#999", textAlign:"center", display:"inline-block", padding:14, border:"1px solid #999", borderRadius:12}} onClick={onDismiss}>Close</a>
        </div>
      </ModalActions>
      </ModalContent>
      </ModalInnerContainer>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`
const ModalInnerContainer = styled.div`
    max-height: 500px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    position: relative;
`
const VerticalSpacer = styled.div`
display:block;
height:24px;
width:100%;
`

const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[3]}px);
`

export default WalletProviderModal
