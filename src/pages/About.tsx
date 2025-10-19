import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

function About() {
  return (
    <div className="container mx-auto max-w-4xl py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <h1
          className="spy-family-text mb-4 md:mb-6 twinkle text-3xl md:text-5xl font-bold"
          style={{ letterSpacing: '2px' }}
        >
          THE FORGER FAMILY
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 anya-text text-[hsl(var(--primary))]">
          "A fake family formed for a real mission... but maybe they're becoming a real family after all."
        </p>
      </div>

      <Card className="spy-family-card mb-8 spy-glow shadow-xl">
        <CardContent className="p-6">
          <p className="text-lg mb-6 anya-text leading-relaxed">
            Operation Strix requires master spy Twilight to create the perfect fake family to infiltrate Eden Academy.
            What starts as a mission becomes something more as this unlikely trio discovers the true meaning of family bonds.
          </p>
          <p className="text-lg mb-8 spy-family-text font-semibold text-[hsl(210_100%_65%)]">
            Mission Objectives:
          </p>

          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(210_100%_65%)] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-[hsl(210_100%_65%)]">Operation Strix</span>
                {' - '}
                <span className="text-muted-foreground anya-text">Prevent war between Westalis and Ostania through peaceful means</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-[hsl(var(--primary))]">Family Formation</span>
                {' - '}
                <span className="text-muted-foreground anya-text">Create the perfect fake family to infiltrate elite society</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(0_84%_60%)] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-[hsl(0_84%_60%)]">Eden Academy</span>
                {' - '}
                <span className="text-muted-foreground anya-text">Get close to target Donovan Desmond through his son Damian</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(30_100%_50%)] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-[hsl(30_100%_50%)]">World Peace</span>
                {' - '}
                <span className="text-muted-foreground anya-text">Maintain peace between nations through intelligence and diplomacy</span>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="mission-briefing mb-8 text-center">
        <p className="text-lg text-muted-foreground anya-text">
          "Sometimes the best missions are the ones where you discover something unexpected... like love, family, and belonging."
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
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
          className="spy-glow text-sm md:text-base"
          style={{
            boxShadow: '0 4px 16px rgba(184, 134, 255, 0.3)',
            letterSpacing: '1px'
          }}
        >
          <Link to="/contact">CONTACT WISE</Link>
        </Button>
      </div>
    </div>
  );
}

export default About;