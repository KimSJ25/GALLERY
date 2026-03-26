"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("업로드할 사진을 선택해주세요.");
      return;
    }

    setIsUploading(true);
    setMessage("업로드 준비 중...");

    try {
      // 1. 서버(Next.js API)에 Presigned URL 발급 요청
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!res.ok) throw new Error("URL 발급 실패");
      
      const { url, key } = await res.json();

      // 2. 발급받은 URL을 사용하여 R2로 다이렉트 업로드 (PUT 요청)
      setMessage("R2 스토리지에 원본 사진 전송 중...");
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("R2 업로드 실패");

      setMessage(`업로드 성공! (저장된 키: ${key})`);
      setFile(null); // 초기화
      
      // TODO: 이후 단계에서 추출한 EXIF 정보와 이 key값을 D1 DB에 저장하는 로직 추가 예정

    } catch (error) {
      console.error(error);
      setMessage("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
      <h2 className="text-xl font-semibold text-white mb-4">작품 업로드</h2>
      <p className="text-sm text-neutral-400 mb-6">
        Lumix S9, Canon R10 등으로 촬영한 고해상도 원본(15MB 이상)의 직접 업로드를 지원합니다.
      </p>

      <div className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-neutral-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-neutral-800 file:text-white
            hover:file:bg-neutral-700 cursor-pointer"
        />
        
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? "업로드 진행 중..." : "R2에 업로드하기"}
        </button>

        {message && (
          <p className="text-sm mt-2 text-neutral-300">{message}</p>
        )}
      </div>
    </div>
  );
}