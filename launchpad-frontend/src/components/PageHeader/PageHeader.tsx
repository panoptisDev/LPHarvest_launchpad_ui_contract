import React from 'react'
import styled from 'styled-components'
import Spacer from '../../components/Spacer'
import Container from '../Container'
import logo from '../../assets/img/logo-no-icon.png'


interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>
        { !icon ? <Spacer size="lg" /> :  <StyledIcon>{icon}</StyledIcon> }

        { !icon ? <>
          <StyledTitle>{title}</StyledTitle>
          <Spacer size="md" />
          <StyledSubtitle>{subtitle}</StyledSubtitle>
          </>

          :
          <div style={{position:"relative", marginTop:-150, marginBottom:30}}>
          <StyledTitle>{title}</StyledTitle>
          <Spacer size="md" />
          <StyledSubtitle>{subtitle}</StyledSubtitle>
          </div>
        }

      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  text-align: center;
  z-index:0;

`

const StyledTitle = styled.h1`
  font-family: 'Goldman', sans-serif;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  z-index:2;
  text-shadow: -0.1rem -0.1rem 1rem #666, 0.1rem 0.1rem 1rem #666, 0 0 1rem #2CF48B, 0 0 2rem #2CF48B, 0 0 3rem #2CF48B;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
