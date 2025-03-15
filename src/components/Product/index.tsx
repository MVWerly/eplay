import Tag from '../Tag'

import * as S from './styles'

type Props = {
  title: string
  category: string
  system: string
  description: string
  infos: string[]
  image: string
}

const Product = ({
  title,
  category,
  system,
  description,
  image,
  infos
}: Props) => (
  <S.Card>
    <img src={image} alt={title} />
    <S.Infos>
      {infos.map((info, index) => (
        <Tag key={index}>{info}</Tag>
      ))}
    </S.Infos>
    <S.Title>{title}</S.Title>
    <Tag>{category}</Tag>
    <Tag>{system}</Tag>
    <S.Description>{description}</S.Description>
  </S.Card>
)

export default Product
