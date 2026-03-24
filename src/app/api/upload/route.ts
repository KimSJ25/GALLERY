import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// R2 클라이언트 초기화
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: "파일명과 컨텐츠 타입이 필요합니다." }, { status: 400 });
    }

    // 파일 이름 충돌 방지를 위해 고유한 파일명(key) 생성
    const uniqueFilename = `${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
    });

    // 60초 동안만 유효한 업로드 전용 URL 생성
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 60 });

    return NextResponse.json({ 
      url: signedUrl, 
      key: uniqueFilename 
    });

  } catch (error) {
    console.error("Presigned URL 발급 에러:", error);
    return NextResponse.json({ error: "URL 발급에 실패했습니다." }, { status: 500 });
  }
}