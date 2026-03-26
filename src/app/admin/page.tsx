import UploadForm from "@/src/components/UploadForm";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            전시 관리자 대시보드
          </h1>
          <p className="text-neutral-400">
            Time Capsule 전시회 작품 업로드 및 메타데이터 관리
          </p>
        </header>

        <section>
          <UploadForm />
        </section>
      </div>
    </main>
  );
}