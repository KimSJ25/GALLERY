'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoveRight, Image as ImageIcon } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────
const LATEST_EXHIBITION = {
  id: 'time-capsule-2026',
  title: 'TIME CAPSULE',
  subtitle: '2026 Spring Main Exhibition',
  description: '찰나의 순간을 영원으로 박제하는 시간의 상자 속에 당신을 초대합니다. 빛과 그림자가 교차하는 순간들을 담았습니다.',
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
].map((item, i) => ({ ...item, id: `archive-${i}`, title: `${item.title}` }));

// ─── UTILS & HOOKS ─────────────────────────────────────────────────────────
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting] as const;
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────

// 부드럽게 나타나는 애니메이션 래퍼
const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function GalleryPage() {
  const archiveRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    archiveRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-800 selection:text-white font-sans overflow-x-hidden">
      
      {/* ── 노이즈 텍스처 (아주 미세하게) ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />

      {/* ── 글로벌 네비게이션 ── */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-neutral-950/90 backdrop-blur-md border-white/10 py-4 shadow-sm' : 'bg-transparent border-transparent py-8'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="/" className="text-sm font-medium tracking-widest uppercase text-white hover:text-neutral-300 transition-colors">
            DGRM<span className="text-neutral-500">.</span>
          </a>
          <div className="flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-neutral-400">
            <span className="hidden md:block">Est. 2020</span>
            <button onClick={scrollToArchive} className="hover:text-white transition-colors duration-300 uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded">
              Exhibitions
            </button>
          </div>
        </div>
      </nav>

      {/* ── 메인 히어로 섹션 (Editorial Style) ── */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* 좌측 텍스트 정보 */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <Reveal delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-neutral-600"></div>
                <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-medium">
                  Current Exhibition
                </span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-light tracking-tight leading-none mb-8 text-white">
                TIME<br />
                <span className="italic text-neutral-400">CAPSULE</span>
              </h1>
            </Reveal>

            <Reveal delay={500}>
              <div className="space-y-6 max-w-md">
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {LATEST_EXHIBITION.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-800">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Date</p>
                    <p className="text-xs font-medium tracking-wider text-neutral-200">{LATEST_EXHIBITION.date}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Camera</p>
                    <p className="text-xs font-medium tracking-wider text-neutral-200">{LATEST_EXHIBITION.exif.model}</p>
                  </div>
                </div>

                <div className="pt-8">
                  <a href={`/exhibition/${LATEST_EXHIBITION.id}`} className="group inline-flex items-center gap-4 text-xs font-medium tracking-[0.2em] uppercase text-white hover:text-neutral-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-full pr-2">
                    Explore Collection
                    <span className="p-2 border border-neutral-700 rounded-full group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                      <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 우측 메인 이미지 (액자 느낌) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <Reveal delay={700}>
              <div className="relative aspect-[4/5] md:aspect-[3/2] overflow-hidden bg-neutral-900 rounded-sm">
                <img
                  src={LATEST_EXHIBITION.imageUrl}
                  alt={LATEST_EXHIBITION.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-out opacity-90 hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none ring-1 ring-inset ring-white/5"></div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </section>

      {/* ── 아카이브 (갤러리 그리드) 섹션 ── */}
      <section ref={archiveRef} id="archive" className="relative z-10 py-32 px-6 md:px-12 bg-neutral-900">
        <div className="max-w-[1600px] mx-auto">
          
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-light mb-4 text-white">Past Exhibitions</h2>
                <p className="text-sm text-neutral-400 font-light">동국대학교 사진 동아리 디지털 & 필름 아카이브</p>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-6 md:mt-0 font-medium">
                Total {ARCHIVES.length} Collections
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {ARCHIVES.map((item, index) => (
              <ArchiveCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="relative z-10 border-t border-neutral-800 py-20 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-serif font-light text-neutral-500 mb-6">DGRM.</h3>
            <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              사진을 통해 세상을 바라보는 시선을 공유합니다.<br />
              Dongguk Photography Club Archive.
            </p>
          </div>
          <div className="grid grid-cols-2 md:text-right gap-12 md:gap-8">
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-widest text-neutral-600 mb-4 font-semibold">Information</p>
              <a href="#" className="block text-xs text-neutral-400 hover:text-white transition-colors">About Us</a>
              <a href="#" className="block text-xs text-neutral-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-widest text-neutral-600 mb-4 font-semibold">Social</p>
              <a href="#" className="block text-xs text-neutral-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="block text-xs text-neutral-400 hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-20 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between text-[10px] text-neutral-600 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} DGRM All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed & Built for Canvas</p>
        </div>
      </footer>
    </main>
  );
}

// ─── 서브 컴포넌트: 아카이브 카드 ───
function ArchiveCard({ item, index }: { item: typeof ARCHIVES[0], index: number }) {
  return (
    <a href={`/exhibition/${item.id}`} className="group block w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-900 rounded-sm">
      <div className={`relative overflow-hidden bg-neutral-950 mb-6 rounded-sm aspect-[4/5]`}>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-[1500ms] ease-out opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 ring-1 ring-inset ring-white/5"></div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="bg-black/40 backdrop-blur-md rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-white/10">
             <ImageIcon size={20} className="text-white" />
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pr-8">
        <div className="flex items-center gap-4 border-b border-neutral-800 pb-3">
          <span className="text-[10px] font-mono text-neutral-600 font-medium">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h4 className="text-lg md:text-xl font-serif tracking-wide text-neutral-300 group-hover:text-white transition-colors">
            {item.title}
          </h4>
        </div>
        <div className="flex justify-between items-center text-xs text-neutral-500 font-light">
          <span>{item.subtitle}</span>
          <span className="tracking-wider font-medium">{item.date.slice(0, 4)}</span>
        </div>
      </div>
    </a>
  );
}