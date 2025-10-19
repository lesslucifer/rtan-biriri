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
    <Container size="lg" className="py-12">
      <div className="text-center mb-12">
        <Title
          order={1}
          className="gradient-text mb-6"
          style={{ fontSize: '3rem' }}
        >
          💌 Let's Chat! 💌
        </Title>
        <Text size="xl" c="dimmed" className="mb-8" style={{ fontSize: '1.2rem' }} >
          We'd love to hear from you! Send us a message and we'll get back to you with sparkles! ✨
        </Text>
      </div>

      <Card shadow="xl" padding="xl" radius="xl" className="cute-card sparkle mb-8">
        <form onSubmit={handleSubmit}>
          <Stack gap="lg">
            <TextInput
              label="✨ Your Magical Name"
              placeholder="What should we call you?"
              value={formData.name}
              onChange={(e) => handleChange('name', e.currentTarget.value)}
              required
              size="lg"
              radius="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '3px solid #ffe0f0',
                '--input-bd-focus': '3px solid #ff5aa3'
              }}
            />
            <TextInput
              label="📧 Your Email Address"
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
              required
              size="lg"
              radius="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '3px solid #ffe0f0',
                '--input-bd-focus': '3px solid #ff5aa3'
              }}
            />
            <Textarea
              label="💬 Your Wonderful Message"
              placeholder="Tell us something amazing..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.currentTarget.value)}
              rows={6}
              required
              size="lg"
              radius="lg"
              style={{
                '--input-radius': '16px',
                '--input-bd': '3px solid #ffe0f0',
                '--input-bd-focus': '3px solid #ff5aa3'
              }}
            />
            <Button
              type="submit"
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
              🚀 Send Message with Love!
            </Button>
          </Stack>
        </form>
      </Card>

      <Group justify="center" gap="lg">
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
          to="/about"
          size="lg"
          radius="xl"
          color="peach"
          variant="filled"
          leftSection={<span className="text-xl">💖</span>}
          style={{
            boxShadow: '0 8px 24px rgba(255, 160, 132, 0.3)',
            fontSize: '1.1rem',
            padding: '16px 32px'
          }}
          className="bounce"
        >
          About Us
        </Button>
      </Group>
    </Container>
  );
}

export default Contact;