import { SlideProps } from '@/types/wrapped';
import PixelBlast from '@/components/PixelBlast';

export default function SummarySlide({ data }: SlideProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen p-4 md:p-8 bg-[#0a0a0a] overflow-hidden">
      {/* PixelBlast background - Cyan */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#00f5ff"
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
        {/* Title */}
        <h2 className="font-geometric text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] font-black text-[#00f5ff] neon-glow-cyan mb-6 md:mb-12 tracking-tighter leading-tight uppercase">
          YOUR YEAR<br/>ON X
        </h2>

        <p className="text-base sm:text-lg md:text-2xl text-[#00f5ff] font-sans mb-8 md:mb-16">
          Here's what you accomplished in 2025
        </p>

        {/* Stats grid */}
        <div className="space-y-4 md:space-y-6 max-w-2xl mx-auto">
          {/* Tweets */}
          <div className="bg-black p-4 md:p-8 border border-[#00f5ff]">
            <div className="font-geometric text-4xl sm:text-5xl md:text-6xl font-black text-[#00f5ff] mb-2">
              {data.user.metrics.tweetCount.toLocaleString()}
            </div>
            <div className="text-[#00f5ff] font-sans text-sm md:text-lg uppercase tracking-wider">Tweets</div>
          </div>

          {/* Followers & Following */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="bg-black p-3 md:p-6 border border-[#00f5ff]">
              <div className="font-geometric text-2xl sm:text-3xl md:text-4xl font-black text-[#00f5ff] mb-2">
                {data.user.metrics.followersCount.toLocaleString()}
              </div>
              <div className="text-[#00f5ff] font-sans text-xs md:text-sm uppercase tracking-wider">Followers</div>
            </div>

            <div className="bg-black p-3 md:p-6 border border-[#00f5ff]">
              <div className="font-geometric text-2xl sm:text-3xl md:text-4xl font-black text-[#00f5ff] mb-2">
                {data.user.metrics.followingCount.toLocaleString()}
              </div>
              <div className="text-[#00f5ff] font-sans text-xs md:text-sm uppercase tracking-wider">Following</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-[#00f5ff] font-sans text-xs sm:text-sm mt-8 md:mt-16">
          Thanks for being part of X in 2025 ✨
        </p>
      </div>
    </div>
  );
}
