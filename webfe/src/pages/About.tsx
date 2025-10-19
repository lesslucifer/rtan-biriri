import { Button, Container, Title, Text, Card, List, ThemeIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSpy } from '@tabler/icons-react';

function About() {
  return (
    <Container size="lg" className="py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="spy-family-text mb-4 md:mb-6 twinkle text-3xl md:text-5xl"
          style={{ letterSpacing: '2px md:tracking-[3px]' }}
        >
          THE FORGER FAMILY
        </Title>
        <Text size="lg" c="anya" className="mb-6 md:mb-8 anya-text text-lg md:text-xl">
          "A fake family formed for a real mission... but maybe they're becoming a real family after all."
        </Text>
      </div>

      <Card shadow="xl" padding="xl" className="spy-family-card mb-8 spy-glow">
        <Text size="lg" className="mb-6 anya-text" style={{ lineHeight: 1.8 }} >
          Operation Strix requires master spy Twilight to create the perfect fake family to infiltrate Eden Academy.
          What starts as a mission becomes something more as this unlikely trio discovers the true meaning of family bonds.
        </Text>
        <Text size="lg" className="mb-8 spy-family-text" fw={600} c="loid" >
          Mission Objectives:
        </Text>

        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color="loid" size={24} radius={12}>
              <IconSpy size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <Text fw={600} c="loid">Operation Strix</Text> -
            <Text span c="dimmed" className="anya-text">Prevent war between Westalis and Ostania through peaceful means</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="anya">Family Formation</Text> -
            <Text span c="dimmed" className="anya-text">Create the perfect fake family to infiltrate elite society</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="yor">Eden Academy</Text> -
            <Text span c="dimmed" className="anya-text">Get close to target Donovan Desmond through his son Damian</Text>
          </List.Item>
          <List.Item>
            <Text fw={600} c="bond">World Peace</Text> -
            <Text span c="dimmed" className="anya-text">Maintain peace between nations through intelligence and diplomacy</Text>
          </List.Item>
        </List>
      </Card>

      <div className="mission-briefing mb-8">
        <Text size="lg" c="dimmed" className="anya-text">
          "Sometimes the best missions are the ones where you discover something unexpected... like love, family, and belonging."
        </Text>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
        <Button
          component={Link}
          to="/"
          size="md"
          color="loid"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
          style={{
            boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
            letterSpacing: '1px'
          }}
        >
          BACK TO MISSION
        </Button>
        <Button
          component={Link}
          to="/contact"
          size="md"
          color="anya"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
          style={{
            boxShadow: '0 4px 16px rgba(184, 134, 255, 0.3)',
            letterSpacing: '1px'
          }}
        >
          CONTACT WISE
        </Button>
      </div>
    </Container>
  );
}

export default About;