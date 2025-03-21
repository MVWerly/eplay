import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../../styles'

import { Props } from '.'

export const ButtonContainer = styled.button<Props>`
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.$variant === 'primary' ? colors.green : colors.white)};
  border-radius: 8px;
  color: ${colors.white};
  background-color: ${(props) =>
    props.$variant === 'primary' ? colors.green : 'transparent'};
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
`
export const ButtonLink = styled(Link)`
  border: 2px solid ${colors.white};
  border-radius: 8px;
  color: ${colors.white};
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  text-decoration: none;
`
