import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { open } from '../../store/reducers/cart'

import * as S from './styles'

import logo from '../../assets/images/logo.svg'
import cartImg from '../../assets/images/carrinho.svg'
import { RootReducer } from '../../store'

const Header = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
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
      <S.CartButton href="#" onClick={openCart}>
        {items.length} - produtos(s)
        <img src={cartImg} alt="Shopping Cart" />
      </S.CartButton>
    </S.HeaderBar>
  )
}

export default Header
