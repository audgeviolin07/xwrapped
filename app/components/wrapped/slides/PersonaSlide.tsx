import { SlideProps } from '@/types/wrapped';
import PixelBlast from '@/components/PixelBlast';

export default function PersonaSlide({ data }: SlideProps) {
  const { persona } = data;
  const mbti = persona.mbti;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen p-4 md:p-8 bg-[#0a0a0a] overflow-hidden">
      {/* PixelBlast background - Purple */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#a855f7"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples={true}
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={true}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent={true}
          className=""
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center px-4">
        {/* Small label */}
        <div className="text-[#a855f7] font-sans text-xs sm:text-sm uppercase tracking-widest mb-4 md:mb-8">
          YOUR PERSONALITY
        </div>

        {/* MBTI Code - BIG */}
        {mbti?.code && (
          <div className="font-geometric text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black text-[#a855f7] neon-glow-purple mb-4 md:mb-6 tracking-wider">
            {mbti.code}
          </div>
        )}

        {/* Persona Title - BIGGER */}
        <h2 className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-black text-[#a855f7] mb-4 md:mb-8 leading-tight px-2">
          {persona.title}
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#a855f7] font-sans mb-6 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
          {persona.description}
        </p>

        {/* Category badge with glow */}
        {mbti?.category && (
          <div className="inline-block bg-black px-4 sm:px-6 py-2 sm:py-3 border border-[#a855f7]">
            <span className="text-[#a855f7] text-base sm:text-lg font-bold uppercase tracking-wide">
              {mbti.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
