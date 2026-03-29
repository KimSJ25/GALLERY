'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calendar, Layers, ChevronDown } from 'lucide-react';

const LATEST_EXHIBITION = {
  id: 'time-capsule-2026',
  title: 'TIME CAPSULE',
  subtitle: '2026 Spring Main Exhibition',
  description: '찰나의 순간을 영원으로 박제하는 시간의 상자 속에 당신을 초대합니다.',
  imageUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop',
  date: '2026.03.24',
  exif: { model: 'Leica Q2', iso: '400', shutter: '1/60', aperture: 'f/1.7' }
};

const ARCHIVES = [
  { imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800', title: 'URBAN GEOMETRY', subtitle: '도시의 선과 면', date: '2025.08.15', model: 'Fujifilm X-T4' },
  { imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800', title: 'SILENT VALLEY', subtitle: '고요한 계곡의 숨결', date: '2025.05.20', model: 'Sony A7 IV' },
  { imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800', title: 'NIGHT ALPS', subtitle: '알프스의 밤을 담다', date: '2025.02.11', model: 'Nikon Z6 II' },
  { imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800', title: 'LOST ROADS', subtitle: '길 위의 고독', date: '2024.11.30', model: 'Leica M11' },
  { imageUrl: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=800', title: 'WET LIGHT', subtitle: '빗속의 빛', date: '2024.09.03', model: 'Canon R5' },
  { imageUrl: 'https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?q=80&w=800', title: 'IRON COAST', subtitle: '철의 해안선', date: '2024.06.22', model: 'Fujifilm GFX 50S' },
  { imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800', title: 'TIDE MARKS', subtitle: '파도가 남긴 흔적', date: '2024.03.14', model: 'Sony A7R V' },
  { imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=800', title: 'GREEN HOUR', subtitle: '새벽 숲의 시간', date: '2023.12.01', model: 'Nikon Z9' },
].map((item, i) => ({ ...item, id: `archive-${i}`, title: `${item.title} Vol.${i + 1}` }));

export default function GalleryPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const archiveRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const scrollToArchive = () => {
    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-yellow-400 selection:text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ── 노이즈 오버레이 ── */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '128px' }}
      />

      {/* ── 네비게이션 ── */}
      <nav className="fixed top-0 w-full z-40 px-8 md:px-14 py-6 flex justify-between items-center bg-gradient-to-b from-[#080808]/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <h1 className="text-xl font-black tracking-[-0.05em]">DGRM<span className="text-yellow-400">.</span></h1>
        </div>
        <div className="flex items-center gap-8">
          <span className="hidden md:block text-[10px] tracking-[0.25em] font-semibold text-stone-500 uppercase">2026 Online Exhibition</span>
          <button
            onClick={scrollToArchive}
            className="text-[11px] tracking-[0.2em] font-bold text-stone-300 hover:text-yellow-400 transition-colors uppercase"
          >
            Archive
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════
          히어로 섹션 — 현재 전시
      ══════════════════════════════════ */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <img
            src={LATEST_EXHIBITION.imageUrl}
            alt={LATEST_EXHIBITION.title}
            className={`w-full h-full object-cover transition-all duration-[2500ms] ease-out ${isLoaded ? 'scale-100 opacity-70' : 'scale-108 opacity-0'}`}
            style={{ transform: isLoaded ? 'scale(1)' : 'scale(1.08)' }}
          />
          {/* 그라디언트 레이어 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/40" />
        </div>

        {/* 콘텐츠 */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-8 md:px-14 max-w-[1800px] mx-auto">

          {/* 상단 배지 */}
          <div
            className={`mb-8 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="inline-flex items-center gap-2 border border-yellow-400/60 text-yellow-400 text-[10px] tracking-[0.3em] font-bold px-4 py-2 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Current Exhibition · {LATEST_EXHIBITION.date}
            </span>
          </div>

          {/* 메인 타이틀 */}
          <div className={`transition-all duration-1000 delay-[350ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-stone-400 text-xs tracking-[0.4em] uppercase font-semibold mb-3">{LATEST_EXHIBITION.subtitle}</p>
            <h2 className="text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.04em] leading-[0.85] mb-6">
              <span className="block text-white">THE</span>
              <span className="block relative">
                <span className="relative z-10">{LATEST_EXHIBITION.title}</span>
                <span
                  className="absolute bottom-1 left-0 h-[30%] bg-yellow-400 z-0 transition-all duration-1000 delay-700"
                  style={{ width: isLoaded ? '100%' : '0%' }}
                />
              </span>
            </h2>
          </div>

          {/* 설명 + CTA + EXIF */}
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between gap-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="max-w-md">
              <p className="text-stone-300 text-base leading-relaxed mb-8 border-l-2 border-yellow-400 pl-4">
                {LATEST_EXHIBITION.description}
              </p>
              <Link
                href={`/exhibition/${LATEST_EXHIBITION.id}`}
                className="group inline-flex items-center gap-4 bg-yellow-400 text-black px-8 py-4 font-black text-sm tracking-[0.15em] uppercase hover:bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(234,179,8,0.4)]"
              >
                View Collection
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* EXIF 데이터 */}
            <div className="flex gap-6 text-[10px] font-mono text-stone-500 tracking-widest uppercase">
              {Object.entries(LATEST_EXHIBITION.exif).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-stone-600">{k}</span>
                  <span className="text-stone-300 font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <button
          onClick={scrollToArchive}
          className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2 text-stone-500 hover:text-yellow-400 transition-colors"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase font-bold writing-mode-vertical rotate-90 mb-2">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </button>
      </section>

      {/* ══════════════════════════════════
          아카이브 그리드 섹션
      ══════════════════════════════════ */}
      <section ref={archiveRef} className="py-24 px-8 md:px-14 w-full max-w-[1800px] mx-auto">

        {/* 섹션 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/[0.07]">
          <div className="flex items-end gap-4">
            <Layers size={28} className="text-yellow-400 mb-0.5" />
            <div>
              <p className="text-[10px] tracking-[0.35em] text-stone-500 uppercase font-semibold mb-1">Dongguk Photography Club</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em]">
                PAST EXHIBITIONS
              </h3>
            </div>
          </div>
          <p className="text-[11px] font-mono text-stone-600 mt-4 md:mt-0">
            {ARCHIVES.length} archives — scroll to explore
          </p>
        </div>

        {/* 그리드: 기본 4열, xl 5열 */}
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-px bg-white/[0.05]">
          {ARCHIVES.map((item, index) => (
            <ArchiveCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="border-t border-white/[0.06] bg-[#080808] py-16 px-8 md:px-14">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <p className="text-5xl font-black tracking-[-0.05em] text-white/10 mb-3">DGRM.</p>
            <p className="text-xs text-stone-600 font-mono leading-relaxed max-w-xs">
              동국대학교 사진 동아리.<br />Digital & Film archive since 2020.
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-mono text-stone-600 tracking-tight">Location: Seoul, South Korea</p>
            <p className="text-[10px] font-mono text-stone-600 tracking-tight">Stack: Next.js + Tailwind + Cloudflare</p>
            <p className="text-[10px] text-stone-700 mt-3">&copy; 2026 Kim Se-jin & DGRM.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── 아카이브 카드 컴포넌트 ── */
function ArchiveCard({ item, index }: { item: typeof ARCHIVES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/exhibition/${item.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block bg-[#080808] overflow-hidden"
    >
      {/* 이미지 컨테이너 — 고정 비율 4:5 */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${hovered ? 'scale-110 grayscale-0 opacity-100' : 'scale-100 grayscale opacity-60'}`}
        />

        {/* 호버 오버레이 */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* 인덱스 번호 */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-mono font-bold text-white/30 group-hover:text-yellow-400/70 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* 화살표 아이콘 */}
        <div className={`absolute top-3 right-3 bg-yellow-400 p-1.5 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0 -translate-y-0' : 'opacity-0 translate-x-2 -translate-y-2'}`}>
          <ArrowUpRight size={14} className="text-black" />
        </div>

        {/* 호버 시 하단 텍스트 (이미지 위) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <p className="text-xs text-stone-300 font-light">{item.subtitle}</p>
        </div>
      </div>

      {/* 카드 하단 텍스트 정보 */}
      <div className="p-4 bg-[#080808] border-t border-white/[0.04]">
        <h4 className={`text-sm font-black tracking-[-0.02em] leading-tight mb-1.5 transition-colors duration-200 ${hovered ? 'text-yellow-400' : 'text-white'}`}>
          {item.title}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-600 flex items-center gap-1.5">
            <Calendar size={9} />
            {item.date}
          </span>
          <span className="text-[10px] font-mono text-stone-700 hidden sm:block">{item.model}</span>
        </div>
      </div>
    </Link>
  );
}