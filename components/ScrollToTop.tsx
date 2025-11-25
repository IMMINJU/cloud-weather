'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-6 right-6 z-50',
        'bg-white/95 backdrop-blur-md rounded-2xl p-4',
        'shadow-2xl border-2 border-white/50',
        'transform transition-all duration-300',
        'hover:scale-110 hover:shadow-blue-500/50',
        'group',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      aria-label="맨 위로 이동"
    >
      <svg
        className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
