import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PlayerAssignment from './pages/PlayerAssignment'
import ColorPage from './pages/ColorPage'
import OneHundredHeartsPage from './pages/OneHundredHeartsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/ad24r7" element={<PlayerAssignment />} />
          <Route path="/color/:color" element={<ColorPage />} />
          <Route path="/100h" element={<OneHundredHeartsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
