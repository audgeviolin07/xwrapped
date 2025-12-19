import { WrappedData } from '@/types/wrapped';
import { signIn } from 'next-auth/react';
import PixelBlast from '@/components/PixelBlast';

interface WelcomeSlideProps {
    data: WrappedData | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    onStart: () => void;
}

export default function WelcomeSlide({ data, loading, error, isAuthenticated, onStart }: WelcomeSlideProps) {
    const getButtonContent = () => {
        if (!isAuthenticated) {
            return {
                text: 'SIGN IN WITH X',
                icon: '→',
                onClick: () => signIn('twitter'),
                disabled: false
            };
        }

        if (error) {
            return {
                text: 'TRY AGAIN',
                icon: '↻',
                onClick: () => window.location.reload(),
                disabled: false
            };
        }

        if (loading) {
            return {
                text: 'LOADING...',
                icon: '⟳',
                onClick: () => { },
                disabled: true
            };
        }

        if (data) {
            return {
                text: 'START',
                icon: '▶',
                onClick: onStart,
                disabled: false
            };
        }

        return {
            text: 'LOADING...',
            icon: '⟳',
            onClick: () => { },
            disabled: true
        };
    };

    const button = getButtonContent();

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
                {/* Massive "YOUR X WRAPPED" text */}
                <h1 className="font-geometric text-[60px] sm:text-[80px] md:text-[120px] lg:text-[140px] font-black text-[#00f5ff] neon-glow-cyan mb-4 md:mb-6 tracking-tighter leading-[0.85] uppercase">
                    YOUR X<br />WRAPPED
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00f5ff] font-sans mb-8 md:mb-16 tracking-wide">
                    Look back at your 2025 on X
                </p>

                {/* Error message */}
                {error && (
                    <p className="text-red-500 text-lg mb-8">
                        {error}
                    </p>
                )}

                {/* Action button */}
                <div className="flex justify-center">
                    <button
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={`bg-black px-6 sm:px-8 md:px-12 py-3 md:py-4 transition-all border-[0.05px] border-[#00f5ff] border-r-4 border-b-4 font-sans ${button.disabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-[#00f5ff]/10'
                            }`}
                        style={{ boxShadow: 'none' }}
                    >
                        <div className="flex items-center gap-2 md:gap-3 text-[#00f5ff]">
                            <span className={`text-xl md:text-2xl ${loading ? 'animate-spin' : ''}`}>{button.icon}</span>
                            <span className=" text-lg sm:text-xl md:text-2xl font-bold tracking-wider uppercase">{button.text}</span>
                        </div>
                    </button>
                </div>

                {/* User info - subtle at bottom */}
                {data && (
                    <div className="mt-8 md:mt-16 text-gray-500 text-sm">
                        @{data.user.username}
                    </div>
                )}
            </div>
        </div>
    );
}
