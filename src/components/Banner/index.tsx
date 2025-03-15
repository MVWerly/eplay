import * as S from './styles'

import bannerImg from '../../assets/images/banner-homem-aranha.png'
import Tag from '../Tag'
import Button from '../Button'

const Banner = () => (
  <S.Image style={{ backgroundImage: `url(${bannerImg})` }}>
    <div className="container">
      <Tag size="big">Destaque do dia</Tag>
      <div>
        <S.Title>Marvel&apos;s Spider-Man: Miles Morales PS4 & PS5</S.Title>
        <S.Prices>
          De <s>R$ 250,00</s> <br />
          por apenas R$ 99,90
        </S.Prices>
      </div>
      <Button
        type="link"
        to="/produto"
        title="Clique aqui para aproveitar essa oferta"
      >
        Aproveitar
      </Button>
    </div>
  </S.Image>
)

export default Banner
