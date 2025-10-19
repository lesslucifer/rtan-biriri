import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto max-w-4xl py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <h1
          className="spy-family-text mb-4 md:mb-6 twinkle text-3xl md:text-5xl font-bold"
          style={{ letterSpacing: '2px' }}
        >
          CONTACT WISE AGENCY
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 anya-text text-[hsl(var(--primary))]">
          "For confidential communications regarding Operation Strix and world peace initiatives."
        </p>
      </div>

      <Card className="spy-family-card spy-glow mb-8 shadow-xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Your Name (For agent identification)
                </label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.currentTarget.value)}
                  required
                  className="anya-text text-lg rounded-2xl border-2 border-[#FFEEDD] focus:border-[#FFC380] bg-gradient-to-br from-white to-[#FFF8F0]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Your Communication Channel
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.currentTarget.value)}
                  required
                  className="anya-text text-lg rounded-2xl border-2 border-[#FFEEDD] focus:border-[#FFC380] bg-gradient-to-br from-white to-[#FFF8F0]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Your Message to WISE
                </label>
                <Textarea
                  id="message"
                  placeholder="Share your intelligence or request assistance..."
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.currentTarget.value)}
                  rows={6}
                  required
                  className="anya-text text-lg rounded-2xl border-2 border-[#FFEEDD] focus:border-[#FFC380] bg-gradient-to-br from-white to-[#FFF8F0]"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="spy-glow text-sm md:text-base w-full sm:w-auto"
                style={{
                  boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
                  letterSpacing: '1px'
                }}
              >
                TRANSMIT TO AGENCY
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mission-briefing mb-8 text-center">
        <p className="text-lg text-muted-foreground anya-text">
          "All communications are encrypted and handled with the utmost discretion. For the sake of world peace."
        </p>
      </div>

      <div className="flex justify-center gap-4 flex-col sm:flex-row items-center">
        <Button
          asChild
          size="lg"
          className="spy-glow text-sm md:text-base"
          style={{
            boxShadow: '0 4px 16px rgba(77, 171, 255, 0.3)',
            letterSpacing: '1px'
          }}
        >
          <Link to="/">BACK TO MISSION</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="spy-glow text-sm md:text-base"
          style={{
            boxShadow: '0 4px 16px rgba(255, 100, 0, 0.3)',
            letterSpacing: '1px'
          }}
        >
          <Link to="/about">LEARN MORE</Link>
        </Button>
      </div>
    </div>
  );
}

export default Contact;