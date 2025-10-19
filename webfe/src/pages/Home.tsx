import { Button, Container, Title, Text, Card, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container size="xl" className="py-12">
      <div className="text-center mb-12">
        <Title
          order={1}
          className="gradient-text mb-4 float"
          style={{ fontSize: '3.5rem' }}
        >
          🌸 Welcome to Kawaii World! 🌸
        </Title>
        <Text size="xl" c="dimmed" className="mb-8" style={{ fontSize: '1.3rem' }} >
          Dive into a colorful universe full of joy and cuteness! ✨
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card shadow="lg" padding="xl" radius="lg" className="cute-card sparkle">
          <div className="text-center">
            <div className="text-4xl mb-4">🌈</div>
            <Title order={3} c="pink" className="mb-3">
              Colorful Design
            </Title>
            <Text c="dimmed">
              Experience a vibrant world with pastel colors and cute gradients that make every interaction delightful!
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" radius="lg" className="cute-card sparkle">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <Title order={3} c="purple" className="mb-3">
              Creative UI
            </Title>
            <Text c="dimmed">
              Beautiful components with smooth animations and playful interactions that spark joy!
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" radius="lg" className="cute-card sparkle">
          <div className="text-center">
            <div className="text-4xl mb-4">💫</div>
            <Title order={3} c="mint" className="mb-3">
              Magic Experience
            </Title>
            <Text c="dimmed">
              Every click, hover, and interaction is designed to feel magical and bring a smile to your face!
            </Text>
          </div>
        </Card>
      </div>

      <Group justify="center" gap="lg">
        <Button
          component={Link}
          to="/about"
          size="lg"
          radius="xl"
          color="pink"
          variant="filled"
          style={{
            boxShadow: '0 8px 24px rgba(255, 90, 163, 0.3)',
            fontSize: '1.1rem',
            padding: '16px 32px'
          }}
          className="bounce"
        >
          💖 Discover More
        </Button>
        <Button
          component={Link}
          to="/contact"
          size="lg"
          radius="xl"
          color="peach"
          variant="filled"
          style={{
            boxShadow: '0 8px 24px rgba(255, 160, 132, 0.3)',
            fontSize: '1.1rem',
            padding: '16px 32px'
          }}
          className="bounce"
        >
          📧 Get In Touch
        </Button>
      </Group>
    </Container>
  );
}

export default Home;