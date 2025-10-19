import { Button, Container, Title, Text, TextInput, Textarea, Stack, Card, Group } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container size="lg" className="py-6 md:py-12 shinigami-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="death-note-text mb-4 md:mb-6 flicker text-3xl md:text-5xl"
          style={{ letterSpacing: '2px md:tracking-[3px]' }}
        >
          CONTACT THE SHINIGAMI
        </Title>
        <Text size="lg" c="shinigami" className="mb-6 md:mb-8 shinigami-text text-lg md:text-xl">
          "To communicate with the gods of death, one must possess the Death Note."
        </Text>
      </div>

      <Card shadow="xl" padding="xl" className="death-note-card ominous-glow mb-8">
        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <TextInput
              label="Your Name (Write it carefully...)"
              placeholder="The name you were given at birth"
              value={formData.name}
              onChange={(e) => handleChange('name', e.currentTarget.value)}
              required
              size="lg"
              style={{
                '--input-radius': '0px',
                '--input-bd': '2px solid #8B0000',
                '--input-bd-focus': '2px solid #DC143C',
                '--input-bg': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                '--input-color': '#e0e0e0'
              }}
              className="shinigami-text"
            />
            <TextInput
              label="Your Connection to the Human World"
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
              required
              size="lg"
              style={{
                '--input-radius': '0px',
                '--input-bd': '2px solid #8B0000',
                '--input-bd-focus': '2px solid #DC143C',
                '--input-bg': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                '--input-color': '#e0e0e0'
              }}
              className="shinigami-text"
            />
            <Textarea
              label="Your Message to the Shinigami Realm"
              placeholder="What would you ask the gods of death?"
              value={formData.message}
              onChange={(e) => handleChange('message', e.currentTarget.value)}
              rows={6}
              required
              size="lg"
              style={{
                '--input-radius': '0px',
                '--input-bd': '2px solid #8B0000',
                '--input-bd-focus': '2px solid #DC143C',
                '--input-bg': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                '--input-color': '#e0e0e0'
              }}
              className="shinigami-text"
            />
            <Button
              type="submit"
              size="md"
              color="blood"
              variant="filled"
              className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 ominous-glow"
              style={{
                boxShadow: '0 4px 16px rgba(139, 0, 0, 0.3)',
                letterSpacing: '1px'
              }}
            >
              SEND MESSAGE TO RYUK
            </Button>
          </Stack>
        </form>
      </Card>

      <div className="rule-of-death-note mb-8">
        <Text size="lg" c="dimmed" className="shinigami-text">
          "The human who touches the Death Note can recognize the image and voice of the Shinigami who owns it."
        </Text>
      </div>

      <Group justify="center" gap="md" className="flex-col sm:flex-row">
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
          to="/about"
          size="md"
          color="shinigami"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 ominous-glow"
          style={{
            boxShadow: '0 4px 16px rgba(47, 47, 47, 0.3)',
            letterSpacing: '1px'
          }}
        >
          LEARN MORE
        </Button>
      </Group>
    </Container>
  );
}

export default Contact;