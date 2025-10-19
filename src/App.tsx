import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { MantineProvider, AppShell, Text, Button, createTheme } from '@mantine/core'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

const spyFamilyTheme = createTheme({
  colors: {
    twilight: [
      '#FFF8F0',
      '#FFEEDD',
      '#FFE4CC',
      '#FFD9B3',
      '#FFCE99',
      '#FFC380',
      '#FFB866',
      '#FFAD4D',
      '#FFA233',
      '#FF971A'
    ],
    anya: [
      '#F0E6FF',
      '#E6D6FF',
      '#DDC6FF',
      '#D4B6FF',
      '#CAA6FF',
      '#C196FF',
      '#B886FF',
      '#AF76FF',
      '#A566FF',
      '#9C56FF'
    ],
    loid: [
      '#E6F3FF',
      '#CCE7FF',
      '#B3DBFF',
      '#99CFFF',
      '#80C3FF',
      '#66B7FF',
      '#4DABFF',
      '#339FFF',
      '#1A93FF',
      '#0087FF'
    ],
    yor: [
      '#FFE6F0',
      '#FFCCE0',
      '#FFB3D1',
      '#FF99C2',
      '#FF80B3',
      '#FF66A3',
      '#FF4D94',
      '#FF3385',
      '#FF1A75',
      '#FF0066'
    ],
    bond: [
      '#FFF0E6',
      '#FFE0CC',
      '#FFD1B3',
      '#FFC199',
      '#FFB280',
      '#FFA266',
      '#FF934D',
      '#FF8333',
      '#FF741A',
      '#FF6400'
    ],
    spy: [
      '#2C3E50',
      '#34495E',
      '#3E4C5E',
      '#48596E',
      '#52667E',
      '#5C738E',
      '#66809E',
      '#708DAE',
      '#7A9ABE',
      '#84A7CE'
    ]
  },
  primaryColor: 'loid',
  primaryShade: { light: 6, dark: 4 },
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600'
  },
  radius: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px'
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
          borderRadius: '16px',
          border: '2px solid transparent',
          background: 'linear-gradient(135deg, #4DABFF 0%, #66B7FF 100%)',
          color: '#FFFFFF',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #66B7FF 0%, #80C3FF 100%)',
            borderColor: '#B3DBFF',
            boxShadow: '0 8px 24px rgba(77, 171, 255, 0.4)',
            transform: 'translateY(-2px) scale(1.02)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            transition: 'left 0.6s'
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
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2px solid #FFEEDD',
          boxShadow: '0 8px 32px rgba(255, 174, 221, 0.2)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: '#FFC380',
            boxShadow: '0 12px 40px rgba(255, 174, 221, 0.3)',
            transform: 'translateY(-4px) scale(1.01)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 195, 128, 0.1) 50%, transparent 70%)',
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
    <MantineProvider theme={spyFamilyTheme}>
      <BrowserRouter>
        <AppShell
          padding={{ base: 'sm', md: 'md' }}
          header={{ height: { base: 60, md: 80 } }}
          style={{
            header: {
              background: 'linear-gradient(135deg, #E6F3FF 0%, #CCE7FF 100%)',
              borderBottom: '2px solid #FFEEDD',
              boxShadow: '0 4px 20px rgba(255, 174, 221, 0.2)'
            }
          }}
        >
          <div className="flex items-center justify-between h-full px-4 md:px-6 spy-family-presence">
            <Text
              size="xl"
              fw={700}
              c="spy"
              className="spy-family-text twinkle text-base md:text-xl"
              style={{
                textShadow: '2px 2px 4px rgba(44, 62, 80, 0.3)',
                letterSpacing: '1px md:tracking-[3px]'
              }}
            >
              SPY × FAMILY
            </Text>
            <div className="flex gap-1 md:gap-2">
              <Button
                component={Link}
                to="/"
                variant="filled"
                size="compact-xs"
                color="loid"
                className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minWidth: 'fit-content'
                }}
              >
                MISSION
              </Button>
              <Button
                component={Link}
                to="/about"
                variant="filled"
                size="compact-xs"
                color="anya"
                className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                style={{
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  minWidth: 'fit-content'
                }}
              >
                FAMILY
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="filled"
                size="compact-xs"
                color="yor"
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
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
