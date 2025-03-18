// import { useParams } from 'react-router-dom'
import Gallery from '../../components/Gallery'
import Hero from '../../components/Hero'
import Section from '../../components/Section'

import resident from '../../assets/images/resident.png'

const Product = () => {
  // const { id } = useParams()

  return (
    <>
      <Hero />
      <Section title="Sobre o jogo" background="black">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          exercitationem delectus qui repellat molestiae doloremque nemo
          possimus fuga unde vel! Obcaecati labore velit a cupiditate soluta
          porro suscipit, tempore harum. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. At omnis, itaque sapiente dolores odit, non aliquid
          perspiciatis deserunt cum excepturi reiciendis recusandae. Atque sequi
          exercitationem non quo ratione officiis cum!
        </p>
      </Section>
      <Section title="Mais detalhes" background="gray">
        <p>
          <b>Plataforma:</b> Playstation 5 <br />
          <b>Desenvolvedor:</b> Avalanche Software <br />
          <b>Editora:</b> Portkey Games, subsidiária da Warner Bros. Interactive
          Entertainment <br />
          <b>Idiomas:</b> O jogo oferece suporte a diversos idiomas, incluindo
          inglês, espanhol, francês, alemão, italiano, português, entre outros.
          As opções de áudio e legendas podem ser ajustadas nas configurações do
          jogo.
        </p>
      </Section>
      <Gallery name="Jogo teste" defaultCover={resident} />
    </>
  )
}

export default Product
