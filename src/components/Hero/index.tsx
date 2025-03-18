import bannerImg from '../../assets/images/fundo_hogwarts.png'
import Button from '../Button'
import Tag from '../Tag'

import * as S from './styles'

const Hero = () => (
  <S.Banner style={{ backgroundImage: `url(${bannerImg})` }}>
    <div className="container">
      <div>
        <Tag>RPG</Tag>
        <Tag>PS5</Tag>
      </div>
      <S.Infos>
        <h2>Hogwarts Legacy</h2>
        <p>
          <span>
            De <s>R$ 250,00</s>
          </span>
          Por R$ 190,00
        </p>
        <Button
          title="Clique aqui para adicionar este jogo ao carrinho"
          variant="primary"
          type="button"
        >
          Adicionar ao carrinho
        </Button>
      </S.Infos>
    </div>
  </S.Banner>
)

export default Hero
