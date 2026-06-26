"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Youtube, Instagram, ArrowDown, ArrowUp } from 'lucide-react';
import Lenis from 'lenis';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN KỸ THUẬT SỐ (REAL-TIME SYNTH ENGINE)
// ----------------------------------------------------
class TechSynth {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false;

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  enableSound(status: boolean) {
    this.soundEnabled = status;
    if (status) this.init();
  }

  playTick() {
    if (!this.soundEnabled) return;
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.04);
  }

  playWhoosh() {
    if (!this.soundEnabled) return;
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.18);
  }

  playSuccess() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(660, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.3);
  }
}

const synth = new TechSynth();

const careerImpacts = [
  {
    num: "01",
    role: "QUẢN LÝ CỬA HÀNG (STORE MANAGER)",
    company: "ALDO GO! DALAT",
    period: "2025 — 2026",
    metrics: "Giảm tỉ lệ thất thoát kho bãi xuống dưới 1%",
    highlight: "Thúc đẩy doanh thu tăng trưởng vượt mốc 15%",
    detail: "Định vị và tái cơ cấu quy trình phân phối sản phẩm dựa trên phân tích tệp khách hàng cao cấp tại địa phương. Thiết lập hệ thống vận hành và điều phối nhân sự tối ưu."
  },
  {
    num: "02",
    role: "QUẢN LÝ PHÒNG THU (STUDIO MANAGER)",
    company: "SB STUDIO",
    period: "2023 — 2024",
    metrics: "Tiết kiệm 40% tổng chi phí sản xuất",
    highlight: "Tăng trưởng hiệu suất vận hành lên đến 200%",
    detail: "Hệ thống hóa toàn bộ quy trình làm việc giữa các nghệ sĩ, đối tác truyền thông quốc tế và MCN qua các giải pháp lưu trữ thông minh giúp loại bỏ các khâu trung gian thừa thãi."
  },
  {
    num: "03",
    role: "TRƯỞNG CA / ĐIỀU HÀNH LOGISTICS BẾP",
    company: "PHỦI STEAK",
    period: "2024 — 2025",
    metrics: "Rút ngắn 20% thời gian chờ đợi của khách",
    highlight: "Sắp xếp chuỗi cung ứng đạt mốc hoàn hảo 100%",
    detail: "Áp dụng tư duy hình học không gian vào quản trị logistics nguyên vật liệu Âu cao cấp, đảm bảo hiệu suất phục vụ liên tục trong các khung giờ áp lực lớn nhất."
  }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState(2023);
  const [showGateway, setShowGateway] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. CONSOLE LOADING: ĐẾM NĂM 2023 -> 2026 CHUẨN 375 STUDIO
  useEffect(() => {
    let year = 2023;
    const interval = setInterval(() => {
      if (year < 2026) {
        year += 1;
        setCurrentYear(year);
        // Tự động kích hoạt Audio Context ảo để phát click nhẹ
        synth.enableSound(true);
        synth.playTick();
      } else {
        clearInterval(interval);
        setShowGateway(true);
      }
    }, 600); // Mỗi năm chạy 0.6 giây
    return () => clearInterval(interval);
  }, []);

  // 2. SMOOTH SCROLL LENIS
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [loading]);

  // 3. SCROLL INTERCEPT ENGINE (KHÓA DỌC TRƯỢT NGANG SLIDE)
  useEffect(() => {
    if (loading) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 30 && activeSlide < 3) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1200);
      } else if (e.deltaY < -30 && activeSlide > 0) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1200);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      if (e.key === "ArrowDown" && activeSlide < 3) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1200);
      } else if (e.key === "ArrowUp" && activeSlide > 0) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1200);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, activeSlide, isScrolling]);

  // 4. XOAY THẺ 3D PERSPECTIVE SANG TRỌNG
  const handle3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1200px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const reset3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  // 5. NỀN NƯỚC HỔ PHÁCH VÀ VÀNG ĐỒNG CHẢY CHẬM TOẢ SÁNG (GLOW EMISSION)
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;
    let tick = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.0015;

      // HÀO QUANG TOẢ SÁNG CỰC LỚN (GIẢM SỰ TỐI TĂM CHO WEB)
      const orbX = width * 0.5 + Math.sin(tick) * 50;
      const orbY = height * 0.5 + Math.cos(tick * 0.8) * 50;
      const grad = ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, 600);
      grad.addColorStop(0, "rgba(197, 168, 128, 0.08)"); /* Vầng hào quang Champagne rực rỡ từ tâm */
      grad.addColorStop(0.5, "rgba(139, 92, 246, 0.02)"); /* Tím nhẹ mờ */
      grad.addColorStop(1, "rgba(28, 35, 51, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 600, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // HÀM KÍCH HOẠT VÀO TRANG CÓ/KHÔNG CÓ NHẠC
  const enterPortfolio = (withSound: boolean) => {
    synth.enableSound(withSound);
    if (withSound) {
      synth.playSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#1C2333] text-[#FAF8F5]">
      
      {/* CANVAS HÀO QUANG VÀNG ĐỒNG */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* 375 STUDIO YEAR PRELOADER GATEWAY */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#1C2333] text-[#FAF8F5] z-[9999] flex flex-col justify-center items-center font-sans"
          >
            <div className="text-center space-y-12">
              {/* ĐẾM NĂM KHỔNG LỒ CHUẨN 375 */}
              <motion.h2 
                key={currentYear}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-[14vw] md:text-[10vw] font-black tracking-tighter text-[#FAF8F5] select-none"
              >
                {currentYear}
              </motion.h2>

              {/* HAI NÚT BẤM KÍNH MỜ KHUẾCH TÁN ÂM THANH */}
              <AnimatePresence>
                {showGateway && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                  >
                    <button 
                      onClick={() => enterPortfolio(true)}
                      className="px-8 py-3.5 border border-[#C5A880] rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#C5A880] hover:text-[#1C2333] transition-all duration-300 bg-transparent text-[#C5A880]"
                    >
                      ENTER WITH SOUND
                    </button>
                    <button 
                      onClick={() => enterPortfolio(false)}
                      className="px-8 py-3.5 border border-white/20 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-[#1C2333] transition-all duration-300 bg-transparent text-white/70"
                    >
                      ENTER WITHOUT SOUND
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="h-full w-full relative z-20">
          
          {/* HEADER NAV */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#1C2333]/80 backdrop-blur-md">
            <span className="font-serif-luxury italic font-medium tracking-tight text-xl text-[#C5A880]">
              POSTLAIN*
            </span>
            <div className="flex gap-4 items-center font-sans text-[9px] tracking-[0.25em] text-[#C5A880] uppercase">
              <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
              <span>STAGE // 0{activeSlide + 1}</span>
            </div>
          </nav>

          {/* BLUEPRINT NAVIGATION PHÍA BÊN PHẢI */}
          <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-8 hidden md:flex border-l border-white/5 pl-4 py-8">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx}
                onClick={() => { synth.playWhoosh(); setActiveSlide(idx); }}
                className="group flex items-center justify-end gap-4 relative"
              >
                <span className={`font-sans text-[9px] tracking-[0.3em] transition-opacity duration-300 ${activeSlide === idx ? "opacity-100 font-bold text-[#C5A880]" : "opacity-30 group-hover:opacity-100 text-white"}`}>
                  0{idx + 1}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-[#C5A880] scale-[2] ring-4 ring-[#C5A880]/10" : "bg-white/20 group-hover:bg-white"}`} />
              </button>
            ))}
          </div>

          {/* TIẾN TRÌNH CUỘN Ở CHÂN TRANG */}
          <div className="fixed bottom-8 left-8 z-50 font-sans text-[8px] tracking-[0.3em] uppercase opacity-30 flex items-center gap-6">
             <div className="flex gap-1 items-center">
               <ArrowUp size={10} className="text-[#C5A880]" />
               <div className="w-8 h-[1px] bg-white/20" />
               <ArrowDown size={10} className="text-[#C5A880]" />
             </div>
             <span>Lăn chuột hoặc dùng phím mũi tên để xem các phần</span>
          </div>

          {/* ANMATE PRESENCE CÁC SLIDES */}
          <AnimatePresence mode="wait">
            
            {/* SLIDE 01: HERO */}
            {activeSlide === 0 && (
              <motion.section 
                key="slide-1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-8 h-[1px] bg-[#C5A880] opacity-50" />
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C5A880]">Creative Operations Architect</span>
                    </div>
                    <h1 className="text-[10vw] md:text-[7.5vw] font-bold font-serif-luxury leading-[0.85] tracking-tight text-[#FAF8F5]">
                      TƯ DUY VẬN HÀNH<br />
                      <span className="italic font-light text-[#C5A880] lowercase" style={{ textTransform: "none" }}>thiết kế để</span><br />
                      TỐI ƯU HÓA.
                    </h1>
                  </div>
                  <div className="md:col-span-4 md:text-right md:pt-16">
                    <span className="font-sans text-[8px] tracking-[0.3em] uppercase block mb-4 text-[#C5A880]">// GIỚI THIỆU TỔNG QUAN //</span>
                    <p className="text-xl text-[#FAF8F5]/80 font-serif-luxury italic leading-relaxed font-light">
                      Tôi là Ngô Phúc (POSTLAIN) — Nhà điều phối hệ thống. Tôi kết nối và giải quyết các bài toán vận hành phức tạp của doanh nghiệp thông qua sức mạnh của logic kỹ thuật và tự động hóa AI.
                    </p>
                  </div>
                </div>

                {/* Grid Chân Trang */}
                <div className="border-t border-white/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[9px] font-sans uppercase tracking-[0.25em] text-zinc-500 relative z-10">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#C5A880] flex items-center gap-1">01 / STORE MANAGER</p>
                    <p className="font-medium text-[#FAF8F5]">ALDO GO! DALAT</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[#C5A880] flex items-center gap-1">02 / STUDIO MANAGER</p>
                    <p className="font-medium text-[#FAF8F5]">SB STUDIO</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[#C5A880] flex items-center gap-1">03 / SPECIAL SKILL</p>
                    <p className="font-medium text-purple-400">AI AUTOMATION LOGIC</p>
                  </div>
                  <div className="text-right flex justify-end items-end gap-2 text-[#C5A880] font-bold">
                    <span>HỆ THỐNG SẴN SÀNG</span>
                  </div>
                </div>
              </motion.section>
            )}

            {/* SLIDE 02: BẢN LĨNH QUẢN TRỊ */}
            {activeSlide === 1 && (
              <motion.section 
                key="slide-2"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-[#181F2F]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 my-auto">
                  <div className="md:col-span-5 space-y-8">
                    <span className="font-sans text-[8px] tracking-[0.35em] text-[#C5A880] uppercase block">// TRIẾT LÝ THIẾT KẾ QUY TRÌNH</span>
                    <h2 className="text-5xl md:text-6xl font-serif-luxury font-bold tracking-tight text-[#FAF8F5]">
                      BẢN LĨNH<br /><span className="italic text-[#C5A880] font-light">QUẢN TRỊ.</span>
                    </h2>
                    <p className="text-zinc-400 font-serif-luxury italic leading-relaxed text-lg font-light">
                      "Quản trị giỏi là khi hệ thống có thể tự vận hành chính xác đến từng mili-giây mà không cần sự can thiệp thủ công liên tục."
                    </p>
                  </div>

                  <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-8 border border-white/5 rounded-[24px] bg-[#1C2333] flex flex-col justify-between h-[230px]">
                        <span className="text-[#C5A880] font-serif-luxury text-3xl italic">A.</span>
                        <div>
                          <h4 className="text-lg font-medium font-serif-luxury text-[#FAF8F5]">Giải Pháp Công Nghệ</h4>
                          <p className="text-xs text-zinc-500 mt-2 font-light leading-relaxed">Phát triển phần mềm quản lý tự động, tinh giảm 80% sức lao động của các khâu trung gian.</p>
                        </div>
                     </div>
                     <div className="p-8 border border-white/5 rounded-[24px] bg-[#1C2333] flex flex-col justify-between h-[230px]">
                        <span className="text-[#C5A880] font-serif-luxury text-3xl italic">B.</span>
                        <div>
                          <h4 className="text-lg font-medium font-serif-luxury text-[#FAF8F5]">Quản Trị Đội Ngũ</h4>
                          <p className="text-xs text-zinc-500 mt-2 font-light leading-relaxed">Năng lực duy trì lửa nhiệt huyết, phân bổ sơ đồ dịch vụ hiệu quả trong môi trường áp lực.</p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="border-t border-white/5 py-8 text-[8px] font-sans uppercase tracking-[0.25em] text-zinc-500 flex justify-between items-center">
                   <span>// ĐỒNG BỘ DỮ LIỆU ĐA CHIỀU</span>
                   <span>ỔN ĐỊNH HỆ THỐNG: 100%</span>
                </div>
              </motion.section>
            )}

            {/* SLIDE 03: CASE STUDIES */}
            {activeSlide === 2 && (
              <motion.section 
                key="slide-3"
                initial={{ scale: 0.9, opacity: 0, rotateY: 30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotateY: -30 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <span className="font-sans text-[8px] tracking-[0.25em] text-zinc-500 uppercase">// DỮ LIỆU CASE STUDIES THỰC TIỄN //</span>
                  <span className="font-sans text-[9px] text-[#C5A880] font-bold tracking-widest flex items-center gap-2">RECRUITER OVERVIEW</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto items-center">
                  {careerImpacts.map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseMove={handle3DTilt}
                      onMouseLeave={reset3DTilt}
                      onMouseEnter={() => synth.playWhoosh()}
                      className="bg-[#1C2333] border border-white/5 p-10 rounded-[36px] shadow-sm flex flex-col justify-between h-[440px] cursor-pointer group scan-glow transition-all duration-300"
                    >
                       <div className="flex justify-between items-start">
                          <span className="font-serif-luxury text-5xl font-light text-stroke-gold group-hover:text-[#C5A880] transition-all italic">{item.num}</span>
                          <span className="font-sans text-[8px] bg-[#C5A880]/10 px-3 py-1.5 rounded-full text-[#C5A880] uppercase tracking-wider font-bold">{item.period}</span>
                       </div>
                       <div>
                          <p className="font-sans text-[8px] text-zinc-500 uppercase tracking-widest mb-1">{item.company}</p>
                          <h4 className="text-xl font-serif-luxury font-bold tracking-tight text-[#FAF8F5] uppercase leading-tight mb-4">{item.role}</h4>
                          <p className="text-xs text-zinc-400 font-light leading-relaxed font-serif-luxury italic">{item.detail}</p>
                       </div>
                       <div className="pt-6 border-t border-white/5 flex flex-col gap-1">
                          <span className="font-sans text-[10px] font-black text-[#C5A880] uppercase tracking-widest">{item.metrics}</span>
                          <span className="font-sans text-[8px] uppercase tracking-widest text-zinc-500">{item.highlight}</span>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/5 py-8 text-[8px] font-sans uppercase tracking-[0.25em] text-zinc-500">
                   // CHỈ SỐ LƯỢNG HÓA CHỨNG MINH NĂNG LỰC ĐIỀU HÀNH
                </div>
              </motion.section>
            )}

            {/* SLIDE 04: CONTACT PORTAL */}
            {activeSlide === 3 && (
              <motion.section 
                key="slide-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-[#141923]"
              >
                <div className="text-center my-auto relative z-10">
                  <span className="font-sans text-[8px] tracking-[0.4em] text-[#C5A880] uppercase block mb-12 animate-pulse">// THÔNG TIN LIÊN HỆ TRỰC TIẾP //</span>
                  
                  <motion.div 
                    whileHover={{ scale: 0.98 }}
                    className="inline-block cursor-pointer"
                  >
                    <a 
                      href="mailto:studionopu@gmail.com" 
                      onClick={() => synth.playSuccess()}
                      className="text-[8vw] md:text-[5vw] font-bold font-serif-luxury leading-none tracking-tight text-[#FAF8F5] hover:text-[#C5A880] border-b-2 border-white hover:border-[#C5A880] transition-all duration-500 pb-4 inline-block italic"
                    >
                      studionopu@gmail.com
                    </a>
                  </motion.div>

                  <div className="flex justify-center gap-12 mt-16">
                    {[
                      { icon: <Music />, url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                      { icon: <Youtube />, url: "https://youtube.com/@postlain" },
                      { icon: <Instagram />, url: "https://www.instagram.com/postlainagain" }
                    ].map((soc, idx) => (
                      <a 
                        key={idx} 
                        href={soc.url} 
                        target="_blank" 
                        onMouseEnter={() => synth.playTick()}
                        className="p-5 rounded-full border border-white/5 hover:bg-[#FAF8F5] hover:text-black transition-all duration-500 transform hover:scale-105 text-[#C5A880]"
                      >
                         {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] font-sans uppercase tracking-[0.25em] text-zinc-500 gap-6 relative z-10">
                  <span>SYSTEM SPEC: NEXTJS + STAGED SLIDERS</span>
                  <span>Ngô Phúc // POSTLAIN © 2026</span>
                  <span>+84 938-649-420</span>
                </div>
              </motion.section>
            )}

          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
