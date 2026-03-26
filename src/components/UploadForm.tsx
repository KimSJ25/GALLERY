"use client";

import { useState } from "react";
import exifr from "exifr";
import { savePhotoMetadata } from "@/src/app/actions/photo";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [exifInfo, setExifInfo] = useState<any>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        const parsedExif = await exifr.parse(selectedFile);
        if (parsedExif) {
          const extracted = {
            model: parsedExif.Model || "Unknown",
            iso: parsedExif.ISO,
            shutter: parsedExif.ExposureTime ? `1/${Math.round(1 / parsedExif.ExposureTime)}s` : undefined,
            aperture: parsedExif.FNumber ? `f/${parsedExif.FNumber}` : undefined,
          };
          setExifInfo(extracted);
        } else {
          setExifInfo(null);
        }
      } catch (error) {
        setExifInfo(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      setMessage("사진과 작품명을 모두 입력해주세요.");
      return;
    }

    setIsUploading(true);
    setMessage("업로드 준비 중...");

    try {
      // 1. Presigned URL 발급
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!res.ok) throw new Error("URL 발급 실패");
      const { url, key } = await res.json();

      // 2. R2로 다이렉트 업로드
      setMessage("R2 스토리지에 원본 사진 전송 중...");
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("R2 업로드 실패");

      setMessage("데이터베이스에 메타데이터 기록 중...");
      
      // 3. 서버 액션을 호출하여 D1 DB에 정보 저장
      const dbRes = await savePhotoMetadata({
        title,
        description,
        r2Key: key,
        fileSize: file.size,
        exifInfo,
      });

      if (!dbRes.success) throw new Error("DB 저장 실패");

      setMessage("🎉 업로드 및 DB 저장 완료!");
      
      // 입력 폼 초기화
      setFile(null);
      setTitle("");
      setDescription("");
      setExifInfo(null);

    } catch (error) {
      console.error(error);
      setMessage("업로드 과정에서 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
      <h2 className="text-xl font-semibold text-white mb-4">작품 업로드</h2>
      
      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="작품명"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-md p-2 text-sm focus:outline-none focus:border-neutral-500"
        />

        <textarea
          placeholder="작품 설명 및 작가의 의도"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-md p-2 text-sm focus:outline-none focus:border-neutral-500 resize-none"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
        />
        
        {exifInfo && (
          <div className="bg-neutral-800 p-3 rounded text-sm text-neutral-300 font-mono">
            <p>카메라: {exifInfo.model}</p>
            {exifInfo.iso && <p>ISO: {exifInfo.iso}</p>}
            {exifInfo.aperture && <p>조리개: {exifInfo.aperture}</p>}
            {exifInfo.shutter && <p>셔터: {exifInfo.shutter}</p>}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || !title || isUploading}
          className="px-4 py-3 bg-white text-black font-semibold rounded-md hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? "처리 중..." : "작품 등록하기"}
        </button>

        {message && <p className="text-sm mt-1 text-neutral-300">{message}</p>}
      </div>
    </div>
  );
}