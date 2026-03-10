import { AnimatedLogo } from "./AnimatedLogo";

export function Banner() {
  return (
    <section className="relative w-full min-h-[15vh] sm:min-h-[12vh] py-4 sm:py-6 flex items-center justify-center overflow-hidden border-b border-border">
      {/* Background Layer with Dark Overlay & BC Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Dynamics_365.svg/1024px-Dynamics_365.svg.png')",
          opacity: 0.15,
          backgroundSize: "300px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90 z-0" />
      
      <div className="container mx-auto text-center relative z-10 flex flex-col items-center px-4 sm:px-6">
        <AnimatedLogo />
        <p className="text-sm sm:text-base text-muted-foreground mb-2 max-w-2xl mx-auto leading-relaxed font-medium">
          The premier knowledge-sharing hub for Microsoft Dynamics 365 Business Central developers,
          architects, and ERP professionals.
        </p>
      </div>
    </section>
  );
}
