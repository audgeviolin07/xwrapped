'use client';

import { useState, useEffect } from 'react';
import { WrappedData } from '@/types/wrapped';
import { TOTAL_SLIDES, TRANSITION_DURATION } from '@/lib/wrapped/constants';
import NavigationButtons from './NavigationButtons';
import ProgressIndicator from './ProgressIndicator';
import WelcomeSlide from './slides/WelcomeSlide';
import PersonaSlide from './slides/PersonaSlide';
import ReplyGuySlide from './slides/ReplyGuySlide';
import TwitterRankSlide from './slides/TwitterRankSlide';
import SummarySlide from './slides/SummarySlide';

interface SlideContainerProps {
  data: WrappedData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  onSlideChange?: (slideIndex: number) => void;
}

export default function SlideContainer({ data, loading, error, isAuthenticated, onSlideChange }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    onSlideChange?.(currentSlide);
  }, [currentSlide, onSlideChange]);

  const getSlideColor = (index: number): string => {
    switch (index) {
      case 0: return '#00f5ff'; // cyan
      case 1: return '#a855f7'; // purple
      case 2: return '#00ff88'; // green
      case 3: return '#ff006e'; // pink
      case 4: return '#00f5ff'; // cyan
      default: return '#00f5ff';
    }
  };

  const transitionToSlide = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= TOTAL_SLIDES) return;

    setFadeState('out');
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setFadeState('in');
    }, TRANSITION_DURATION);
  };

  const goToNext = () => transitionToSlide(currentSlide + 1);
  const goToPrev = () => transitionToSlide(currentSlide - 1);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentSlide > 0) goToNext();
      if (e.key === 'ArrowLeft' && currentSlide > 0) goToPrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <WelcomeSlide
            data={data}
            loading={loading}
            error={error}
            isAuthenticated={isAuthenticated}
            onStart={goToNext}
          />
        );
      case 1:
        return data ? <PersonaSlide data={data} /> : null;
      case 2:
        return data ? <ReplyGuySlide data={data} /> : null;
      case 3:
        return data ? <TwitterRankSlide data={data} /> : null;
      case 4:
        return data ? <SummarySlide data={data} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div
        className={`
          transition-opacity duration-300 ease-in-out
          ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {renderSlide()}
      </div>

      {currentSlide > 0 && (
        <>
          <ProgressIndicator current={currentSlide + 1} total={TOTAL_SLIDES} color={getSlideColor(currentSlide)} />

          <NavigationButtons
            onPrev={goToPrev}
            onNext={goToNext}
            canGoPrev={currentSlide > 0}
            canGoNext={currentSlide < TOTAL_SLIDES - 1}
            color={getSlideColor(currentSlide)}
          />
        </>
      )}
    </div>
  );
}
