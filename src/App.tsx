import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PlayerAssignment from './pages/PlayerAssignment'
import ColorPage from './pages/ColorPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ad24r7" element={<PlayerAssignment />} />
        <Route path="/color/:color" element={<ColorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
