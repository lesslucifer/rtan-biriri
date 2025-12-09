import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PlayerAssignment from './pages/PlayerAssignment'
import ColorPage from './pages/ColorPage'
import OneHundredHeartsPage from './pages/OneHundredHeartsPage'
import AdminPage from './pages/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import BlindSantaPage from './pages/BlindSantaPage'
import BlindSantaPageRedirect from './pages/BlindSantaPageRedirect'
import AdminSantaPage from './pages/AdminSantaPage'
import { Color, ColorPaths } from './types/playerAssignment'
import { SoSNavigation } from './components/roles/SixOfSpades'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad24r7" element={<PlayerAssignment />} />
          <Route path="/mi2r52" element={<AdminPage />} />

          {Object.entries(ColorPaths).map(([color, path]) => {
            return <Route path={`/${path}`} element={<ColorPage color={color as Color} />} />
          })}
          
          <Route path="/100h" element={<OneHundredHeartsPage />} />

          <Route path="/LQL1" element={<SoSNavigation code='C2D' />} />
          <Route path="/XNF2" element={<SoSNavigation code='E3F' />} />
          <Route path="/Q1B3" element={<SoSNavigation code='G4H' />} />
          <Route path="/72V4" element={<SoSNavigation code='I5J' />} />

          <Route path="/blind-santa" element={<BlindSantaPage />} />
          <Route path="/blind-sant*" element={<BlindSantaPageRedirect />} />
          <Route path="/8892adminst" element={<AdminSantaPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
