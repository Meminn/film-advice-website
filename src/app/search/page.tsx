import { Suspense } from 'react';
import SearchBar from '@/components/ui/SearchBar';


/*export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
})  */

  
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Movie cards will be rendered here */}
        </div>
      </Suspense>
    </div>
  );
}
