import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import markIcon from '../../../assets/img/MARK.png'
const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const sushi = useSushi()
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))

  return (
    <Modal>
      <ModalTitle text="My Wallet" />
      <ModalContent>

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <img src={markIcon} style={{maxHeight:48, maxWidth:48}}/>
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(sushiBalance)} />
              <Label text="MARK Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text="View on Etherscan"
          variant="secondary"
        />
        <Spacer />
      </ModalContent>
      <ModalActions>
                      <div style={{textAlign:"center", display:"block",}}>
          <a style={{color:"#999", textAlign:"center", display:"inline-block", padding:14, border:"1px solid #999", borderRadius:12}} onClick={onDismiss}>Close</a>
        </div>
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
