import Image from "next/image";
import { db } from "@/src/db";
import { exhibitionPhotos } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// 페이지 접속 시마다 항상 최신 DB 데이터를 불러오도록 설정
export const dynamic = "force-dynamic";

// R2 클라이언트 초기화
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export default async function GalleryPage() {
  // 1. D1 데이터베이스에서 데이터 조회 (최신 업로드 순 정렬)
  const photos = await db.select().from(exhibitionPhotos).orderBy(desc(exhibitionPhotos.createdAt));

  // 2. 화면에 이미지를 출력하기 위한 일회성 접근 권한(Presigned GET URL) 발급
  // (실제 배포 시에는 Cloudflare 커스텀 도메인으로 대체할 수 있습니다)
  const photosWithUrls = await Promise.all(
    photos.map(async (photo) => {
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: photo.r2Key,
      });
      // 브라우저에서 읽을 수 있도록 1시간 동안 유효한 URL 생성
      const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
      return { ...photo, imageUrl: url };
    })
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-wider mb-2">Time Capsule</h1>
        <p className="text-neutral-400">온라인 사진전</p>
      </header>

      {/* 업로드된 데이터가 없을 경우의 UI */}
      {photosWithUrls.length === 0 ? (
        <div className="text-center text-neutral-500 mt-32">
          <p>아직 전시된 작품이 없습니다.</p>
          <p className="text-sm mt-2">/admin 페이지에서 첫 작품을 등록해 보세요.</p>
        </div>
      ) : (
        /* Adaptive Gallery Grid */
        <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photosWithUrls.map((photo) => {
            // EXIF 데이터 타입 단언 (Drizzle이 JSON 객체로 파싱해줌)
            const exif = photo.exifInfo as { model?: string; iso?: number; shutter?: string; aperture?: string } | null;

            return (
              <article 
                key={photo.id} 
                className="group relative aspect-square overflow-hidden bg-neutral-900 cursor-pointer rounded-sm"
              >
                {/* Next.js의 자체 이미지 최적화 기능이 R2의 15MB 원본을 압축하여 브라우저에 서빙합니다 */}
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h2 className="text-lg font-semibold text-white">{photo.title}</h2>
                  <p className="text-sm text-neutral-300 truncate">{photo.description}</p>
                  
                  {/* 동적으로 추출된 메타데이터 출력 */}
                  {exif && (
                    <p className="text-xs text-neutral-500 mt-2 font-mono">
                      {exif.model || "Unknown Camera"} {exif.iso && `| ISO ${exif.iso}`}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}