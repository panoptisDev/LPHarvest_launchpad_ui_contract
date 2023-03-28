import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void,
  noPadding?:boolean
}

const Modal: React.FC<ModalProps> = ({ children, noPadding }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal noPadding={noPadding}>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 512px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`
interface StyledModalProps {
  noPadding?: boolean
}
const StyledModal = styled.div<StyledModalProps>`
  padding: ${(props) => props.noPadding ? "0px" : "0 20px"};
  background: ${(props) => props.theme.color.black};
  border: 1px solid ${(props) => props.theme.color.dark[100]};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`

const StyledModalContent = styled.div``

export default Modal
