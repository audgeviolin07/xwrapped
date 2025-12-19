import { SlideProps } from '@/types/wrapped';
import PixelBlast from '@/components/PixelBlast';

export default function ReplyGuySlide({ data }: SlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen p-4 md:p-8 bg-[#0a0a0a] overflow-hidden">
      {/* PixelBlast background - Green */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#00ff88"
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
        <div className="text-[#00ff88] font-sans text-xs sm:text-sm uppercase tracking-widest mb-4 md:mb-8">
          YOUR REPLY GUY
        </div>

        {/* Reply count - huge number */}
        <div className="font-geometric text-[80px] sm:text-[100px] md:text-[120px] lg:text-[160px] font-black text-[#00ff88] neon-glow-green mb-4 md:mb-8 tracking-tight leading-none">
          {data.replyGuy.replyCount}
        </div>

        {/* Description text */}
        <div className="mb-6 md:mb-12">
          <p className="text-base sm:text-lg md:text-2xl text-[#00ff88] font-sans mb-4 md:mb-6 px-2">
            You replied to{' '}
            <span className="inline-block bg-black px-3 sm:px-4 py-1 sm:py-2 border border-[#00ff88]">
              <span className="text-[#00ff88] font-bold text-xl sm:text-2xl md:text-3xl">@{data.replyGuy.username}</span>
            </span>
          </p>
          <p className="text-sm sm:text-base md:text-xl text-[#00ff88] font-sans">
            the most this year
          </p>
        </div>

        {/* Name badge */}
        <div className="text-[#00ff88] font-sans text-sm sm:text-base md:text-lg">
          {data.replyGuy.name}
        </div>
      </div>
    </div>
  );
}
