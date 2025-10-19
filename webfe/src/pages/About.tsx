import { Button, Container, Title, Text, Card, List, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSkull } from '@tabler/icons-react';

function About() {
  return (
    <Container size="lg" className="py-6 md:py-12 shinigami-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="death-note-text mb-4 md:mb-6 flicker text-3xl md:text-5xl"
          style={{ letterSpacing: '2px md:tracking-[3px]' }}
        >
          THE SHINIGAMI REALM
        </Title>
        <Text size="lg" c="shinigami" className="mb-6 md:mb-8 shinigami-text text-lg md:text-xl">
          "The gods of death have existed since the beginning of time, observing the human world with detached curiosity."
        </Text>
      </div>

      <Card shadow="xl" padding="xl" className="death-note-card mb-8 ominous-glow">
        <Text size="lg" className="mb-6 shinigami-text" style={{ lineHeight: 1.8 }} >
          The Death Note is a supernatural notebook that grants its user the ability to kill anyone by writing their name while picturing their face.
          This dark power comes with strict rules and consequences that bind both the human user and the Shinigami who owns the note.
        </Text>
        <Text size="lg" className="mb-8 death-note-text" fw={600} c="blood" >
          The Rules of the Death Note:
        </Text>

        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color="blood" size={24} radius={0}>
              <IconSkull size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <Text fw={600} c="blood">The Name Rule</Text> -
            <Text span c="dimmed" className="shinigami-text">The human whose name is written in this note shall die</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="blood">The Face Rule</Text> -
            <Text span c="dimmed" className="shinigami-text">The writer must have the person's face in their mind</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="blood">The Time Rule</Text> -
            <Text span c="dimmed" className="shinigami-text">The death will occur 40 seconds after the name is written</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="blood">The Ownership Rule</Text> -
            <Text span c="dimmed" className="shinigami-text">The human who touches the Death Note can see the Shinigami</Text>
          </List.Item>
        </List>
      </Card>

      <div className="rule-of-death-note mb-8">
        <Text size="lg" c="dimmed" className="shinigami-text">
          "The person in possession of the Death Note is possessed by a god of death, its original owner, until they die."
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
        <Button
          component={Link}
          to="/"
          size="md"
          color="blood"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 ominous-glow"
          style={{
            boxShadow: '0 4px 16px rgba(139, 0, 0, 0.3)',
            letterSpacing: '1px'
          }}
        >
          RETURN TO RULES
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
      </div>
    </Container>
  );
}

export default About;