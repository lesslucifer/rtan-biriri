import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PlayerAssignment from './pages/PlayerAssignment'
import ColorPage from './pages/ColorPage'
import OneHundredHeartsPage from './pages/OneHundredHeartsPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/ad24r7" element={<PlayerAssignment />} />
          <Route path="/color/:color" element={<ColorPage />} />
          <Route path="/100h" element={<OneHundredHeartsPage />} />
          <Route path="/mi2r52" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
