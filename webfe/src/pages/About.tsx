import { Button, Container, Title, Text, Card, List, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';

function About() {
  return (
    <Container size="lg" className="py-12">
      <div className="text-center mb-12">
        <Title
          order={1}
          className="gradient-text mb-6"
          style={{ fontSize: '3rem' }}
        >
          🌟 About Our Kawaii World 🌟
        </Title>
        <Text size="xl" c="dimmed" className="mb-8" style={{ fontSize: '1.2rem' }} >
          Welcome to our magical corner of the internet where everything is colorful, cute, and full of joy! 💖
        </Text>
      </div>

      <Card shadow="xl" padding="xl" radius="xl" className="cute-card mb-8">
        <Text size="lg" className="mb-6" style={{ lineHeight: 1.8 }} >
          ✨ We've created a delightful web experience that combines the power of React Router DOM
          with the beauty of Mantine UI components. Our mission is to make every interaction
          feel magical and bring smiles to your face! 🌈
        </Text>
        <Text size="lg" className="mb-8" fw={600} c="pink" >
          🎀 What makes our app special:
        </Text>

        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color="pink" size={24} radius="xl">
              <IconHeart size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <Text fw={600} c="purple">Client-side routing</Text> with React Router DOM -
            <Text span c="dimmed">Smooth navigation between magical pages ✨</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="mint">Mantine UI components</Text> -
            <Text span c="dimmed">Beautiful, accessible, and customizable 🎨</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="peach">Responsive design</Text> -
            <Text span c="dimmed">Perfect on desktop, tablet, and mobile 📱</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="sky">Colorful animations</Text> -
            <Text span c="dimmed">Playful interactions that spark joy! 🌟</Text>
          </List.Item>
        </List>
      </Card>

      <div className="flex justify-center gap-6">
        <Button
          component={Link}
          to="/"
          size="lg"
          radius="xl"
          color="purple"
          variant="filled"
          leftSection={<span className="text-xl">🏠</span>}
          style={{
            boxShadow: '0 8px 24px rgba(179, 102, 245, 0.3)',
            fontSize: '1.1rem',
            padding: '16px 32px'
          }}
          className="bounce"
        >
          Back to Home
        </Button>
        <Button
          component={Link}
          to="/contact"
          size="lg"
          radius="xl"
          color="mint"
          variant="filled"
          leftSection={<span className="text-xl">💌</span>}
          style={{
            boxShadow: '0 8px 24px rgba(102, 245, 179, 0.3)',
            fontSize: '1.1rem',
            padding: '16px 32px'
          }}
          className="bounce"
        >
          Contact Us
        </Button>
      </div>
    </Container>
  );
}

export default About;