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
    <Container size="lg" className="py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <Title
          order={1}
          className="spy-family-text mb-4 md:mb-6 twinkle text-3xl md:text-5xl"
          style={{ letterSpacing: '2px md:tracking-[3px]' }}
        >
          CONTACT WISE AGENCY
        </Title>
        <Text size="lg" c="anya" className="mb-6 md:mb-8 anya-text text-lg md:text-xl">
          "For confidential communications regarding Operation Strix and world peace initiatives."
        </Text>
      </div>

      <Card shadow="xl" padding="xl" className="spy-family-card spy-glow mb-8">
        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <TextInput
              label="Your Name (For agent identification)"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.currentTarget.value)}
              required
              size="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '2px solid #FFEEDD',
                '--input-bd-focus': '2px solid #FFC380',
                '--input-bg': 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                '--input-color': '#2C3E50'
              }}
              className="anya-text"
            />
            <TextInput
              label="Your Communication Channel"
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
              required
              size="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '2px solid #FFEEDD',
                '--input-bd-focus': '2px solid #FFC380',
                '--input-bg': 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                '--input-color': '#2C3E50'
              }}
              className="anya-text"
            />
            <Textarea
              label="Your Message to WISE"
              placeholder="Share your intelligence or request assistance..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.currentTarget.value)}
              rows={6}
              required
              size="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '2px solid #FFEEDD',
                '--input-bd-focus': '2px solid #FFC380',
                '--input-bg': 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F0 100%)',
                '--input-color': '#2C3E50'
              }}
              className="anya-text"
            />
            <Button
              type="submit"
              size="md"
              color="loid"
              variant="filled"
              className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
              style={{
                boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
                letterSpacing: '1px'
              }}
            >
              TRANSMIT TO AGENCY
            </Button>
          </Stack>
        </form>
      </Card>

      <div className="mission-briefing mb-8">
        <Text size="lg" c="dimmed" className="anya-text">
          "All communications are encrypted and handled with the utmost discretion. For the sake of world peace."
        </Text>
      </div>

      <Group justify="center" gap="md" className="flex-col sm:flex-row">
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
          to="/about"
          size="md"
          color="yor"
          variant="filled"
          className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 spy-glow"
          style={{
            boxShadow: '0 4px 16px rgba(255, 100, 0, 0.3)',
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