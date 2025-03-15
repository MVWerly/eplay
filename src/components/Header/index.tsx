import { Link } from 'react-router-dom'

import * as S from './styles'

import logo from '../../assets/images/logo.svg'
import cartImg from '../../assets/images/carrinho.svg'

const Header = () => (
  <S.HeaderBar>
    <div>
      <Link to="/">
        <img src={logo} alt="EPLAY" />
      </Link>
      <nav>
        <S.Links>
          <S.LinksItem>
            <Link to="/categories">Categorias</Link>
          </S.LinksItem>
          <S.LinksItem>
            <a href="#">Novidades</a>
          </S.LinksItem>
          <S.LinksItem>
            <a href="#">Promoções</a>
          </S.LinksItem>
        </S.Links>
      </nav>
    </div>
    <S.LinkCart href="#">
      0 - produtos(s)
      <img src={cartImg} alt="Shopping Cart" />
    </S.LinkCart>
  </S.HeaderBar>
)

export default Header
