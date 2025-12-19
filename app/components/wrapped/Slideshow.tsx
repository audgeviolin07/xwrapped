'use client';

import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { WrappedData } from '@/types/wrapped';
import SlideContainer from './SlideContainer';

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

export default function Slideshow() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<WrappedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (status === 'authenticated' && !data && !loading) {
      async function fetchWrappedData() {
        setLoading(true);
        try {
          const response = await fetch('/api/wrapped/data');

          if (!response.ok) {
            const errorData = await response.json();

            // If session expired, sign out and force re-auth
            if (response.status === 401 && errorData.error?.includes('expired')) {
              console.log('[Slideshow] Session expired, signing out...');
              await signOut({ redirect: false });
              setError('Session expired. Please sign in again.');
              return;
            }

            throw new Error(errorData.error || 'Failed to fetch wrapped data');
          }

          const wrappedData = await response.json();
          setData(wrappedData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      }

      fetchWrappedData();
    }
  }, [status, data, loading]);

  const slideColor = getSlideColor(currentSlide);

  return (
    <>
      <SlideContainer
        data={data}
        loading={loading}
        error={error}
        isAuthenticated={status === 'authenticated'}
        onSlideChange={setCurrentSlide}
      />

      {/* Sign out button */}
      {status === 'authenticated' && (
        <button
          onClick={() => signOut()}
          className="fixed top-8 left-8 p-3 bg-black transition-all font-sans z-50 hover:opacity-80"
          style={{
            border: `1px solid ${slideColor}`,
            color: slideColor,
            boxShadow: 'none'
          }}
        >
          <LogOut size={20} />
        </button>
      )}
    </>
  );
}
