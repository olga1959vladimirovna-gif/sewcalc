import Nav from './components/Nav'
import Hero from './components/Hero'
import PriceBreakdown from './components/PriceBreakdown'
import Calculator from './components/Calculator'
import HowItWorks from './components/HowItWorks'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <PriceBreakdown />
        <Calculator />
        <HowItWorks />
        <Stats />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
