import Game from '../../models/Game'
import Product from '../Product'
import * as S from './styles'

export type Props = {
  title: string
  background: 'gray' | 'black'
  games: Game[]
}

const ProductsList = ({ background, title, games }: Props) => (
  <S.Container background={background}>
    <div className="container">
      <S.Title>{title}</S.Title>
      <S.List>
        {games.map((game) => (
          <Product
            key={game.id}
            title={game.title}
            category={game.category}
            description={game.description}
            image={game.image}
            infos={game.infos}
            system={game.system}
          />
        ))}
      </S.List>
    </div>
  </S.Container>
)

export default ProductsList
