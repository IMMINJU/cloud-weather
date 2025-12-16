'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-white focus:text-blue-600 focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500"
    >
      Skip to main content
    </a>
  );
}
