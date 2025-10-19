import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MantineProvider, AppShell, Text, Button, createTheme } from '@mantine/core'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

const cuteTheme = createTheme({
  colors: {
    pink: [
      '#fff0f8',
      '#ffe0f0',
      '#ffc2e0',
      '#ff9fce',
      '#ff7bb8',
      '#ff5aa3',
      '#ff3d8f',
      '#e62a7a',
      '#cc1f68',
      '#b31556'
    ],
    purple: [
      '#f8f0ff',
      '#f0e0ff',
      '#e0c2ff',
      '#d0a3ff',
      '#c084fc',
      '#b366f5',
      '#a347ee',
      '#8a2be2',
      '#7a1fd9',
      '#6a15c7'
    ],
    mint: [
      '#f0fff8',
      '#e0fff0',
      '#c2ffe0',
      '#a3ffd0',
      '#84fcc0',
      '#66f5b3',
      '#47eea6',
      '#2be299',
      '#1fd98a',
      '#15c77a'
    ],
    peach: [
      '#fff8f0',
      '#fff0e0',
      '#ffe0c2',
      '#ffd0a3',
      '#ffc084',
      '#ffb366',
      '#ffa347',
      '#ff8a2b',
      '#f97a1f',
      '#f06a15'
    ],
    sky: [
      '#f0f8ff',
      '#e0f0ff',
      '#c2e0ff',
      '#a3d0ff',
      '#84c0fc',
      '#66b3f5',
      '#47a3ee',
      '#2b8ae2',
      '#1f7ad9',
      '#156ac7'
    ]
  },
  primaryColor: 'pink',
  primaryShade: { light: 5, dark: 5 },
  fontFamily: 'Comic Sans MS, cursive, sans-serif',
  headings: {
    fontFamily: 'Comic Sans MS, cursive, sans-serif',
    fontWeight: '700'
  },
  radius: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px'
  },
  spacing: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
})

function App() {
  return (
    <MantineProvider theme={cuteTheme}>
      <BrowserRouter>
        <AppShell
          padding="md"
          header={{ height: 80 }}
          style={{
            header: {
              background: 'linear-gradient(135deg, #ff5aa3 0%, #b366f5 100%)'
            }
          }}
        >
          <div className="flex items-center justify-between h-full px-6">
            <Text
              size="xl"
              fw={700}
              c="white"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontSize: '28px'
              }}
            >
              🌸 Kawaii App 🌸
            </Text>
            <div className="flex gap-3">
              <Button
                component={Link}
                to="/"
                variant="filled"
                size="sm"
                color="mint"
                radius="lg"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontWeight: 600
                }}
              >
                🏠 Home
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="filled"
                size="sm"
                color="peach"
                radius="lg"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontWeight: 600
                }}
              >
                💖 About
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="filled"
                size="sm"
                color="sky"
                radius="lg"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontWeight: 600
                }}
              >
                📧 Contact
              </Button>
            </div>
          </div>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-mint-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </AppShell>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
