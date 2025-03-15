import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'
import Header from './components/Header'
import Paths from './routes'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <div className="container">
        <Header />
      </div>
      <Paths />
      <Footer />
    </BrowserRouter>
  )
}

export default App
