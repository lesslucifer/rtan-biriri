import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto max-w-7xl py-6 md:py-12 spy-family-presence">
      <div className="text-center mb-8 md:mb-12">
        <h1
          className="spy-family-text mb-3 md:mb-4 twinkle text-3xl md:text-6xl font-bold"
          style={{
            letterSpacing: '2px'
          }}
        >
          OPERATION STRIX
        </h1>
        <p className="text-lg md:text-xl mb-6 md:mb-8 anya-text text-[hsl(var(--primary))]">
          "For world peace! 🌟" - Anya Forger
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
        <Card className="spy-family-card spy-glow shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4 family-bounce">🕵️‍♂️</div>
            <h3 className="text-xl font-semibold mb-3 spy-family-text text-[hsl(210_100%_65%)]">
              Twilight
            </h3>
            <p className="text-muted-foreground anya-text">
              Master spy codenamed Twilight. Poses as psychiatrist Loid Forger to complete Operation Strix.
            </p>
          </CardContent>
        </Card>

        <Card className="spy-family-card spy-glow shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4 family-bounce">👧</div>
            <h3 className="text-xl font-semibold mb-3 spy-family-text text-[hsl(var(--primary))]">
              Anya
            </h3>
            <p className="text-muted-foreground anya-text">
              Telepathic child who can read minds. Adopted by Loid to help with his mission.
            </p>
          </CardContent>
        </Card>

        <Card className="spy-family-card spy-glow shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4 family-bounce">🌸</div>
            <h3 className="text-xl font-semibold mb-3 spy-family-text text-[hsl(0_84%_60%)]">
              Yor
            </h3>
            <p className="text-muted-foreground anya-text">
              Assassin codenamed Thorn Princess. Marries Loid to maintain her cover and complete their fake family.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mission-briefing mb-8 text-center">
        <p className="text-lg text-muted-foreground anya-text">
          "Mission Objective: Create the perfect fake family to infiltrate Eden Academy and prevent war between Westalis and Ostania."
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
          <Link to="/about">MEET THE FAMILY</Link>
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
          <Link to="/contact">CONTACT WISE</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;