import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Welcome to MyBookEncyclopedia</div>
      <Link href="/books">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Go to Books
        </button>
      </Link>
    </>
  );
}
