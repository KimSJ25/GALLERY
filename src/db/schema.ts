import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 온라인 사진전 이미지 데이터 테이블 
export const exhibitionPhotos = sqliteTable('exhibition_photos', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 자동 증가 고유 식별자 [cite: 25]
  title: text('title').notNull(), // 작품명 [cite: 25]
  description: text('description'), // 작품 설명 (작가의 의도 등) [cite: 25]
  r2Key: text('r2_key').notNull(), // R2 저장소 내 파일 경로 [cite: 25]
  fileSize: integer('file_size').notNull(), // 파일 크기 (Bytes) [cite: 25]
  exifInfo: text('exif_info', { mode: 'json' }), // 촬영 정보 (ISO, Shutter, Aperture, Model 등) [cite: 25]
  order: integer('order').default(0), // 전시회 내 노출 순서 [cite: 25]
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()), // 업로드 일시 [cite: 25]
});