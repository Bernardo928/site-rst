import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import About from './components/About'
import Experiences from './components/Experiences'
import Drinks from './components/Drinks'
import MobileBar from './components/MobileBar'
import MenuSection from './components/MenuSection'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import TikTokSection from './components/TikTokSection'
import Location, { FinalCta } from './components/Location'
import Footer from './components/Footer'
import { useScrollAnimations } from './hooks/useScrollAnimations'

export default function App() {
  useScrollAnimations()
  return (
    <>
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-forest">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Experiences />
        <Drinks />
        <MenuSection />
        <Gallery />
        <Reviews />
        <TikTokSection />
        <FinalCta />
        <Location />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
