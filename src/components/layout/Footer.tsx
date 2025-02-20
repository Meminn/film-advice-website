// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Moodvice. All rights reserved.</p>
      </div>
    </footer>
  );
}