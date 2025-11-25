import React from 'react';

/**
 * Highlights matching text in a string with a mark element
 * @param text - The text to search in
 * @param query - The search query to highlight
 * @returns The text with highlighted matches
 */
export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={index} className="bg-yellow-300 text-gray-900 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
