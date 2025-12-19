interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  color: string;
}

export default function NavigationButtons({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  color
}: NavigationButtonsProps) {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-between px-8 z-50">
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        className={`px-8 py-3 bg-black transition-all font-sans font-bold uppercase tracking-wider text-sm ${
          canGoPrev
            ? 'cursor-pointer hover:opacity-80'
            : 'opacity-30 cursor-not-allowed'
        }`}
        style={canGoPrev ? {
          border: `1px solid ${color}`,
          borderRight: `4px solid ${color}`,
          borderBottom: `4px solid ${color}`,
          color: color,
          boxShadow: 'none'
        } : {}}
      >
        ← Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`px-8 py-3 bg-black transition-all font-sans font-bold uppercase tracking-wider text-sm ${
          canGoNext
            ? 'cursor-pointer hover:opacity-80'
            : 'opacity-30 cursor-not-allowed'
        }`}
        style={canGoNext ? {
          border: `1px solid ${color}`,
          borderRight: `4px solid ${color}`,
          borderBottom: `4px solid ${color}`,
          color: color,
          boxShadow: 'none'
        } : {}}
      >
        Next →
      </button>
    </div>
  );
}
