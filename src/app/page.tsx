import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-white mb-6">
        Time Capsule Gallery
      </h1>
      <Link href="/admin" className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 transition-colors">
        관리자 대시보드 입장
      </Link>
    </main>
  );
}
