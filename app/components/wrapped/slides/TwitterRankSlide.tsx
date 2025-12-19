import { SlideProps } from '@/types/wrapped';
import PixelBlast from '@/components/PixelBlast';

export default function TwitterRankSlide({ data }: SlideProps) {
  const { rank, percentile, category, classification } = data.rank;

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen p-4 md:p-8 bg-[#0a0a0a] overflow-hidden">
      {/* PixelBlast background - Pink */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#ff006e"
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
        <div className="text-[#ff006e] font-sans text-xs sm:text-sm uppercase tracking-widest mb-4 md:mb-8">
          YOUR TWEET COUNT THIS YEAR
        </div>

        {/* Huge tweet count number */}
        <div className="font-geometric text-[80px] sm:text-[100px] md:text-[120px] lg:text-[160px] font-black text-[#ff006e] neon-glow-pink mb-4 md:mb-8 tracking-tight leading-none">
          {data.user.metrics.tweetCount.toLocaleString()}
        </div>

        {/* Top percentage in highlighted box */}
        <div className="mb-6 md:mb-12">
          <p className="text-base sm:text-lg md:text-2xl text-[#ff006e] font-sans mb-3 md:mb-4 px-2">
            You were in the{' '}
            <span className="inline-block bg-black px-3 sm:px-4 py-1 sm:py-2 border border-[#ff006e]">
              <span className="text-[#ff006e] font-bold text-xl sm:text-2xl md:text-3xl">Top {percentile}%</span>
            </span>
            {' '}for tweets
          </p>
          <p className="text-sm sm:text-base md:text-xl text-[#ff006e] font-sans">
            on X!
          </p>
        </div>

        {/* Yapper Classification Badge */}
        <div className="inline-block bg-black px-4 sm:px-6 md:px-8 py-4 md:py-6 border border-[#ff006e]">
          <div className="text-[#ff006e] font-sans text-xs uppercase tracking-widest mb-2">
            Level {classification.level} Yapper
          </div>
          <div className="text-[#ff006e] text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide">
            {classification.title}
          </div>
        </div>
      </div>
    </div>
  );
}
