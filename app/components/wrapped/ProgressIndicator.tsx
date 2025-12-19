interface ProgressIndicatorProps {
  current: number;
  total: number;
  color: string;
}

export default function ProgressIndicator({ current, total, color }: ProgressIndicatorProps) {
  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-1 rounded-full transition-all ${
              index < current ? '' : 'bg-gray-700'
            }`}
            style={index < current ? { backgroundColor: color } : {}}
          />
        ))}
      </div>
    </div>
  );
}
