import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MantineProvider, AppShell, Text, Button, createTheme } from '@mantine/core'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

const deathNoteTheme = createTheme({
  colors: {
    deathNote: [
      '#0a0a0a',
      '#1a1a1a',
      '#2a2a2a',
      '#3a3a3a',
      '#4a4a4a',
      '#5a5a5a',
      '#6a6a6a',
      '#7a7a7a',
      '#8a8a8a',
      '#9a9a9a'
    ],
    blood: [
      '#8B0000',
      '#A00000',
      '#B50000',
      '#CA0000',
      '#DC143C',
      '#FF0000',
      '#FF3333',
      '#FF6666',
      '#FF9999',
      '#FFCCCC'
    ],
    shinigami: [
      '#2F2F2F',
      '#404040',
      '#515151',
      '#626262',
      '#737373',
      '#848484',
      '#959595',
      '#A6A6A6',
      '#B7B7B7',
      '#C8C8C8'
    ],
    parchment: [
      '#F5F5DC',
      '#F0F0D6',
      '#EBEBD0',
      '#E6E6CA',
      '#E1E1C4',
      '#DCDCBE',
      '#D7D7B8',
      '#D2D2B2',
      '#CDCDAC',
      '#C8C8A6'
    ],
    ink: [
      '#000000',
      '#1A1A1A',
      '#333333',
      '#4D4D4D',
      '#666666',
      '#808080',
      '#999999',
      '#B3B3B3',
      '#CCCCCC',
      '#E6E6E6'
    ]
  },
  primaryColor: 'blood',
  primaryShade: { light: 0, dark: 0 },
  fontFamily: 'Crimson Text, serif',
  headings: {
    fontFamily: 'Cinzel, serif',
    fontWeight: '600'
  },
  radius: {
    xs: '0px',
    sm: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  components: {
    Button: {
      styles: () => ({
        root: {
          borderRadius: 0,
          border: '2px solid #8B0000',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          color: '#e0e0e0',
          fontFamily: 'Cinzel, serif',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)',
            borderColor: '#DC143C',
            boxShadow: '0 0 20px rgba(139, 0, 0, 0.5)',
            transform: 'translateY(-1px)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.2), transparent)',
            transition: 'left 0.5s'
          },
          '&:hover::before': {
            left: '100%'
          }
        }
      })
    },
    Card: {
      styles: () => ({
        root: {
          borderRadius: 0,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          border: '2px solid #3a3a3a',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: '#8B0000',
            boxShadow: '0 12px 40px rgba(139, 0, 0, 0.3)',
            transform: 'translateY(-2px)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(139, 0, 0, 0.1) 50%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.3s ease'
          },
          '&:hover::before': {
            opacity: 1
          }
        }
      })
    }
  }
})

function App() {
  return (
    <MantineProvider theme={deathNoteTheme}>
      <BrowserRouter>
        <AppShell
          padding={{ base: 'sm', md: 'md' }}
          header={{ height: { base: 60, md: 80 } }}
          style={{
            header: {
              background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
              borderBottom: '2px solid #8B0000',
              boxShadow: '0 4px 20px rgba(139, 0, 0, 0.3)'
            }
          }}
        >
          <div className="flex items-center justify-between h-full px-4 md:px-6 shinigami-presence">
            <Text
              size="xl"
              fw={700}
              c="blood"
              className="death-note-text flicker text-base md:text-xl"
              style={{
                textShadow: '2px 2px 4px rgba(139, 0, 0, 0.8)',
                letterSpacing: '1px md:tracking-[3px]'
              }}
            >
              DEATH NOTE
            </Text>
            <div className="flex gap-1 md:gap-2">
              <Button
                component={Link}
                to="/"
                variant="filled"
                size="compact-xs"
                color="blood"
                className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minWidth: 'fit-content'
                }}
              >
                RULES
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="filled"
                size="compact-xs"
                color="shinigami"
                className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minWidth: 'fit-content'
                }}
              >
                MORE
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="filled"
                size="compact-xs"
                color="ink"
                className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minWidth: 'fit-content'
                }}
              >
                CONTACT
              </Button>
            </div>
          </div>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
