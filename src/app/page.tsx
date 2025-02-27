'use client';

import { useRouter } from 'next/navigation';
import SearchBar from "@/components/ui/SearchBar";

export default function Home() {
  const router = useRouter();

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/recommendations?prompt=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary-600">
          Moodvice
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tell us how&apos;s your mood, we&apos;ll advice you a movie to watch...
        </p>
        <SearchBar 
          defaultValue=""
          placeholder="How are you feeling today?"
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}