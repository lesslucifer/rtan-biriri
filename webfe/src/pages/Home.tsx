import { Button, Container, Title, Text, Card, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container size="xl" className="py-6 md:py-12 shinigami-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="death-note-text mb-3 md:mb-4 flicker text-3xl md:text-6xl"
          style={{
            letterSpacing: '2px md:tracking-[4px]'
          }}
        >
          THE RULES OF THE DEATH NOTE
        </Title>
        <Text
          size="lg"
          c="shinigami"
          className="mb-6 md:mb-8 shinigami-text text-lg md:text-xl"
        >
          "The human whose name is written in this note shall die."
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
        <Card shadow="lg" padding="xl" className="death-note-card ominous-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 flicker">⚰️</div>
            <Title order={3} c="blood" className="mb-3 death-note-text">
              Rule I
            </Title>
            <Text c="dimmed" className="shinigami-text">
              The human whose name is written in this note shall die. This note will not take effect unless the writer has the person's face in their mind.
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" className="death-note-card ominous-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 flicker">📜</div>
            <Title order={3} c="blood" className="mb-3 death-note-text">
              Rule II
            </Title>
            <Text c="dimmed" className="shinigami-text">
              This note shall become the property of the human world, once it touches the ground of (arrives in) the human world.
            </Text>
          </div>
        </Card>

        <Card shadow="lg" padding="xl" className="death-note-card ominous-glow">
          <div className="text-center">
            <div className="text-4xl mb-4 flicker">💀</div>
            <Title order={3} c="blood" className="mb-3 death-note-text">
              Rule III
            </Title>
            <Text c="dimmed" className="shinigami-text">
              The owner of the note can recognize the image and voice of the original owner, a god of death.
            </Text>
          </div>
        </Card>
      </div>

      <div className="rule-of-death-note mb-8">
        <Text size="lg" c="dimmed" className="shinigami-text">
          "The person in possession of the Death Note is possessed by a god of death, its original owner, until they die."
        </Text>
      </div>

      <Group justify="center" gap="md" className="flex-col sm:flex-row">
        <Button
          component={Link}
          to="/about"
          size="md"
          color="blood"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 ominous-glow"
          style={{
            boxShadow: '0 4px 16px rgba(139, 0, 0, 0.3)',
            letterSpacing: '1px'
          }}
        >
          LEARN MORE
        </Button>
        <Button
          component={Link}
          to="/contact"
          size="md"
          color="shinigami"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 ominous-glow"
          style={{
            boxShadow: '0 4px 16px rgba(47, 47, 47, 0.3)',
            letterSpacing: '1px'
          }}
        >
          CONTACT RYUK
        </Button>
      </Group>
    </Container>
  );
}

export default Home;