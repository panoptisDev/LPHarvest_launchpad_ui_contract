import React from 'react'
import styled from 'styled-components'


interface CardProps {
  noglow?: Boolean
}

const Card: React.FC<CardProps> = ({ children, noglow }) => (!noglow ? <StyledCard>{children}</StyledCard> : <StyledCardNoGlow>{children}</StyledCardNoGlow>)

const StyledCard = styled.div`
  background: ${(props) => props.theme.color.dark[200]};
  border: 1px solid ${(props) => props.theme.color.dark[100]}ff;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
  &:hover{
  	    box-shadow: 0 0 2rem #2CF48B;
  }
`
const StyledCardNoGlow = styled.div`
  background: ${(props) => props.theme.color.dark[200]};
  border: 1px solid ${(props) => props.theme.color.dark[100]}ff;
  border-radius: 12px;
  display: flex;
  flex: 1;
  flex-direction: column;
`
export default Card
