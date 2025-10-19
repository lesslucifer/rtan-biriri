import { Button, Container, Title, Text, Card, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container size="xl" className="py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="spy-family-text mb-3 md:mb-4 twinkle text-3xl md:text-6xl"
          style={{
            letterSpacing: '2px md:tracking-[4px]'
          }}
        >
          OPERATION STRIX
        </Title>
        <Text
          size="lg"
          c="anya"
          className="mb-6 md:mb-8 anya-text text-lg md:text-xl"
        >
          "For world peace! 🌟" - Anya Forger
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
        <Card shadow="lg" padding="xl" className="spy-family-card spy-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 family-bounce">🕵️‍♂️</div>
            <Title order={3} c="loid" className="mb-3 spy-family-text">
              Twilight
            </Title>
            <Text c="dimmed" className="anya-text">
              Master spy codenamed Twilight. Poses as psychiatrist Loid Forger to complete Operation Strix.
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" className="spy-family-card spy-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 family-bounce">👧</div>
            <Title order={3} c="anya" className="mb-3 spy-family-text">
              Anya
            </Title>
            <Text c="dimmed" className="anya-text">
              Telepathic child who can read minds. Adopted by Loid to help with his mission.
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" className="spy-family-card spy-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 family-bounce">🌸</div>
            <Title order={3} c="yor" className="mb-3 spy-family-text">
              Yor
            </Title>
            <Text c="dimmed" className="anya-text">
              Assassin codenamed Thorn Princess. Marries Loid to maintain her cover and complete their fake family.
            </Text>
          </div>
        </Card>
      </div>

      <div className="mission-briefing mb-8">
        <Text size="lg" c="dimmed" className="anya-text">
          "Mission Objective: Create the perfect fake family to infiltrate Eden Academy and prevent war between Westalis and Ostania."
        </Text>
      </div>

      <Group justify="center" gap="md" className="flex-col sm:flex-row">
        <Button
          component={Link}
          to="/about"
          size="md"
          color="loid"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
          style={{
            boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
            letterSpacing: '1px'
          }}
        >
          MEET THE FAMILY
        </Button>
        <Button
          component={Link}
          to="/contact"
          size="md"
          color="bond"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
          style={{
            boxShadow: '0 4px 16px rgba(255, 100, 0, 0.3)',
            letterSpacing: '1px'
          }}
        >
          CONTACT WISE
        </Button>
      </Group>
    </Container>
  );
}

export default Home;