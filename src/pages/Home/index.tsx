import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'
import Game from '../../models/Game'

import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import starWars from '../../assets/images/star_wars.png'
import zelda from '../../assets/images/zelda.png'

const promotions: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['-10%', 'R$ 250'],
    image: resident
  },
  {
    id: 2,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Diablo',
    system: 'Windows',
    infos: ['-10%', 'R$ 250'],
    image: diablo
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Star Wars',
    system: 'Windows',
    infos: ['-10%', 'R$ 250'],
    image: starWars
  },
  {
    id: 4,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Zelda',
    system: 'Windows',
    infos: ['-10%', 'R$ 250'],
    image: zelda
  }
]

const emBreve: Game[] = [
  {
    id: 5,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Resident Evil 4',
    system: 'Windows',
    infos: ['17/05'],
    image: resident
  },
  {
    id: 6,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Diablo',
    system: 'Windows',
    infos: ['01/08'],
    image: diablo
  },
  {
    id: 7,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Star Wars',
    system: 'Windows',
    infos: ['10/10'],
    image: starWars
  },
  {
    id: 8,
    category: 'Ação',
    description:
      'Resident Evil 4, conhecido no Japão como Biohazard 4, é um jogo eletrônico de survival horror',
    title: 'Zelda',
    system: 'Windows',
    infos: ['20/03'],
    image: zelda
  }
]

const Home = () => (
  <>
    <Banner />
    <ProductsList games={promotions} title="Promoções" background="gray" />
    <ProductsList games={emBreve} title="Em breve" background="black" />
  </>
)

export default Home
