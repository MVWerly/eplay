import styled from 'styled-components'

import { Props } from '.'
import { colors } from '../../styles'
import { Card } from '../Product/styles'

export const Container = styled.section<Omit<Props, 'title' | 'games'>>`
  padding: 32px 0;
  background-color: ${(props) =>
    props.background === 'black' ? colors.black : colors.gray};

  ${Card} {
    background-color: ${(props) =>
      props.background === 'black' ? colors.gray : colors.black};
  }
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
`

export const List = styled.ul`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
`
