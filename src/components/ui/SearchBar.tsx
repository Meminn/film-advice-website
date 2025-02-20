'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      router.push(`/search?q=${encodeURIComponent(prompt)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., I need something uplifting after a long day..."
          className="w-full h-14 px-6 text-lg rounded-full border border-gray-300 
                     dark:border-gray-700 dark:bg-gray-800 
                     focus:outline-none focus:ring-2 focus:ring-primary-500
                     shadow-sm hover:shadow-md transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-3 p-3 text-gray-600 hover:text-primary-600
                     dark:text-gray-400 dark:hover:text-primary-500"
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
} 

