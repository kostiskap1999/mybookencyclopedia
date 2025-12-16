import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to MyBookEncyclopedia
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your personal collection of books and characters
        </p>
        <div className="space-y-4">
          <Link href="/books">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
              Browse Books
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
