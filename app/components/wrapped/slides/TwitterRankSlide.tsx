import { SlideProps } from '@/types/wrapped';

const levelColors: Record<number, string> = {
  1: 'from-zinc-400 to-zinc-500',
  2: 'from-green-500 to-emerald-600',
  3: 'from-blue-500 to-indigo-600',
  4: 'from-purple-500 to-pink-600',
  5: 'from-yellow-400 to-orange-500',
};

export default function TwitterRankSlide({ data }: SlideProps) {
  const { rank, percentile, category, classification } = data.rank;
  const gradientClass = levelColors[classification.level];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-black">
      <div className="w-full max-w-md text-center">
        <div className="text-sm text-zinc-500 mb-4 uppercase tracking-wider">
          Your Twitter Rank
        </div>

        <h2 className="text-4xl font-bold text-black dark:text-white mb-8">
          Top {percentile}%
        </h2>

        <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl p-6 mb-4 text-white`}>
          <div className="text-sm opacity-80 mb-1">Level {classification.level}</div>
          <div className="text-3xl font-bold">{classification.title}</div>
          <div className="text-sm opacity-80 mt-2">
            {data.user.metrics.tweetCount.toLocaleString()} tweets
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-8 mb-6">
          <div className="text-sm text-zinc-500 mb-2">Ranked</div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            #{rank.toLocaleString()}
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            in {category}
          </div>
        </div>

        <p className="text-zinc-500">You're making waves on the platform</p>
      </div>
    </div>
  );
}
