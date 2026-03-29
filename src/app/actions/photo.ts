"use server";

import { db } from "@/src/db";
import { exhibitionPhotos } from "@/src/db/schema";

export async function savePhotoMetadata(data: {
  title: string;
  description: string;
  r2Key: string;
  fileSize: number;
  exifInfo: any;
}) {
  try {
    // Drizzle ORM을 사용하여 D1 데이터베이스에 Insert
    const result = await db.insert(exhibitionPhotos).values({
      title: data.title,
      description: data.description,
      r2Key: data.r2Key,
      fileSize: data.fileSize,
      exifInfo: data.exifInfo,
    }).returning();

    return { success: true, data: result[0] };
  } catch (error) {
    console.error("DB 저장 실패:", error);
    return { success: false, error: "데이터베이스 저장에 실패했습니다." };
  }
}