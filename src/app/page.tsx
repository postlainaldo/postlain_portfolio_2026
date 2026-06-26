"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Music, Youtube, Instagram, Terminal, Award, Globe, ArrowDown, ArrowUp } from 'lucide-react';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN KỸ THUẬT SỐ (FM SYNTHESIZER ENGINE)
// ----------------------------------------------------
class TechSynth {
  private ctx: AudioContext | null = null;
  init() {
    if (!this.ctx && typeof window !== "undefined") {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }
  playTick() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.04);
  }
  playWhoosh() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.15);
  }
  playSuccess() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1040, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.25);
  }
}

const synth = new TechSynth();

// THÔNG TIN CASE STUDIES CHUẨN KINH DOANH CHO CÔNG TY LỚN
const careerImpacts = [
  {
    num: "01",
    role: "STORE MANAGER",
    company: "ALDO GO! DALAT",
    period: "2025—2026",
    metrics: "Giảm Thất Thoát Kho Bãi <1%",
    highlight: "Tăng Trưởng Doanh Số 15%",
    detail: "Tối ưu hóa sơ đồ trưng bày sản phẩm dựa trên dữ liệu khách du lịch địa phương. Thiết lập KPI thực chiến giúp thúc đẩy tối đa doanh số bán lẻ.",
    icon: <Globe size={20} className="text-purple-600" />
  },
  {
    num: "02",
    role: "STUDIO MANAGER",
    company: "SB STUDIO",
    period: "2023—2024",
    metrics: "Tiết Kiệm 40% Chi Phí Sản Xuất",
    highlight: "Tăng Hiệu Suất Vận Hành 200%",
    detail: "Thiết lập hệ thống tự động quản trị lịch trình phòng thu và đối tác truyền thông qua Google Sheets API, rút ngắn 50% thời gian điều phối.",
    icon: <Music size={20} className="text-purple-600" />
  },
  {
    num: "03",
    role: "KITCHEN CAPTAIN / CHEF",
    company: "PHUI STEAK",
    period: "2024—2025",
    metrics: "Giảm 20% Thời Gian Chờ Của Khách",
    highlight: "Sắp Xếp Quy Trình Bếp Đạt Mốc 100%",
    detail: "Áp dụng phương pháp di chuyển tam giác vàng trong bếp công nghiệp, phân phối mượt mà các món Âu chất lượng cao trong khu giờ cao điểm.",
    icon: <Zap size={20} className="text-purple-600" />
  }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. CONSOLE LOADING GIẢ LẬP ĐẲNG CẤP CAO
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          synth.playSuccess();
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        if (prev % 15 === 0) synth.playTick();
        return prev + 1;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  // 2. THE CUSTOM MOUSE LENS
  useEffect(() => {
    if (loading) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [loading]);

  // 3. THUẬT TOÁN ĐIỀU PHỐI CUỘN THÔNG MINH (SCROLL INTERCEPT ENGINE)
  useEffect(() => {
    if (loading) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 30 && activeSlide < 3) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1000); // Khóa 1s để hiệu ứng hoàn tất
      } else if (e.deltaY < -30 && activeSlide > 0) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      if (e.key === "ArrowDown" && activeSlide < 3) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (e.key === "ArrowUp" && activeSlide > 0) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, activeSlide, isScrolling]);

  // 4. THUẬT TOÁN XOAY THẺ 3D (PERSPECTIVE TILT)
  const handle3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1000px) rotateY(${x * 0.07}deg) rotateX(${-y * 0.07}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const reset3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  // 5. NỀN NƯỚC SINH HỌC CHẢY NGẦM PHÍA SAU
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;
    let tick = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.0025;

      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.0018 + tick) * Math.cos(x * 0.001 + tick * 0.4) * 55 + height * 0.72;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "rgba(139, 92, 246, 0.02)";
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#FAF8F5]">
      
      {/* NỀN SÓNG NƯỚC CHẢY CHẬM */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* CUSTOM CURSOR LENS */}
      {!loading && (
        <motion.div 
          className="fixed w-10 h-10 border border-[#121212] rounded-full pointer-events-none z-[9999] mix-blend-difference"
          animate={{
            x: cursorPos.x - 20,
            y: cursorPos.y - 20,
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
      )}

      {/* CONSOLE LOADING SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#121212] text-white z-[9999] flex flex-col justify-between p-8 font-mono"
          >
            <div className="flex justify-between items-center text-xs opacity-50 border-b border-white/5 pb-4">
              <span className="flex items-center gap-2">
                <Terminal size={14} /> POSTLAIN OS_
              </span>
              <span>DALAT // SYSTEM CONSOLE</span>
            </div>
            <div className="text-center">
              <span className="text-[14vw] font-black leading-none font-space text-purple-500">{progress}%</span>
            </div>
            <div className="flex justify-between items-end text-xs opacity-50">
              <span>INITIALIZING FULL-STAGE DECK...</span>
              <span>©2026 CORES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="h-full w-full relative z-20">
          
          {/* HEADER NAV CHUẨN ĐAN MẠCH */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#121212]/5 bg-[#FAF8F5]/80 backdrop-blur-md">
            <span 
              onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
              onMouseLeave={() => setIsHovered(false)}
              className="font-space font-black tracking-tighter text-2xl"
            >
              POSTLAIN*
            </span>
            <div className="flex gap-4 items-center">
              <span className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Deck Active: Slide 0{activeSlide + 1}</span>
            </div>
          </nav>

          {/* BỘ CHỈ BÁO TRANG CỐ ĐỊNH PHÍA BÊN PHẢI (SIDE NAVIGATION BULLETS) */}
          <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-6 hidden md:flex">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx}
                onClick={() => { synth.playWhoosh(); setActiveSlide(idx); }}
                className="group flex items-center justify-end gap-4"
              >
                <span className={`font-mono text-[9px] tracking-widest transition-opacity duration-300 ${activeSlide === idx ? "opacity-100 font-bold" : "opacity-0 group-hover:opacity-40"}`}>
                  0{idx + 1}
                </span>
                <span className={`w-3 h-3 rounded-full border border-black/20 transition-all duration-300 ${activeSlide === idx ? "bg-purple-600 border-purple-600 scale-125" : "bg-transparent group-hover:bg-zinc-300"}`} />
              </button>
            ))}
          </div>

          {/* THÔNG BÁO HƯỚNG DẪN CUỘN */}
          <div className="fixed bottom-8 left-8 z-50 font-mono text-[9px] tracking-widest uppercase opacity-40 flex items-center gap-4">
             <div className="flex flex-col gap-1 items-center">
               <ArrowUp size={12} className="animate-bounce" />
               <ArrowDown size={12} className="animate-bounce" />
             </div>
             <span>Use Mouse Scroll or Arrow Keys to Swivel Sections</span>
          </div>

          {/* KHÔNG GIAN CHUYỂN SLIDE CHUYÊN NGHIỆP (STAGED SLIDE DECK) */}
          <AnimatePresence mode="wait">
            
            {/* ---------------------------------------------------- */}
            {/* SLIDE 01: HERO HEADER INTRO */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 0 && (
              <motion.section 
                key="slide-1"
                initial={{ y: "100%", opacity: 0, scale: 0.95 }}
                animate={{ y: "0%", opacity: 1, scale: 1 }}
                exit={{ y: "-100%", opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-10 h-[1px] bg-purple-600" />
                      <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-purple-600">The Operations & AI Architecture</span>
                    </div>
                    <h1 className="text-[12vw] md:text-[8.5vw] font-black font-space leading-[0.8] tracking-[-0.06em] uppercase">
                      OPERATIONS<br />
                      <span className="italic font-light text-zinc-400">DESIGNED TO</span><br />
                      PERFECT.
                    </h1>
                  </div>
                  <div className="md:col-span-4 md:text-right md:pt-14">
                    <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block mb-4">// EXECUTIVE PROFILE</span>
                    <p className="text-xl text-zinc-600 font-light leading-relaxed">
                      Tôi là Ngô Phúc (POSTLAIN) — Nhà điều hành hệ thống chuyên sâu về tối ưu hóa nhân sự và tích hợp tự động hóa trí tuệ nhân tạo (AI Engine).
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#121212]/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  <div>
                    <p className="text-zinc-400 mb-1">01 / RETAIL LEADER</p>
                    <p className="font-bold text-[#121212]">ALDO GO! DALAT</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 mb-1">02 / MEDIA DIRECTOR</p>
                    <p className="font-bold text-[#121212]">SB STUDIO</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 mb-1">03 / PERFORMANCE</p>
                    <p className="font-bold text-purple-600">100% PROGRAMMED</p>
                  </div>
                  <div className="text-right flex justify-end items-end gap-2 text-purple-600">
                    <span>PANEL_01_READY</span>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 02: THE VALUE & CORE BELIEFS */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 1 && (
              <motion.section 
                key="slide-2"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="md:col-span-6">
                    <p className="font-mono text-[9px] tracking-[0.4em] text-zinc-400 uppercase mb-4">// THE ARCHITECTURE OF PERFORMANCE</p>
                    <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter uppercase leading-none mb-10">
                      BẢN LĨNH<br />QUẢN TRỊ.
                    </h2>
                  </div>
                  <div className="md:col-span-6 space-y-12">
                    <div className="flex gap-6 items-start">
                       <Bot size={32} className="text-purple-600 shrink-0 mt-1" />
                       <div>
                          <h4 className="text-xl font-bold uppercase font-space mb-2">Tự Động Hóa AI Thực Chiến</h4>
                          <p className="text-zinc-500 font-light leading-relaxed">
                            Không lý thuyết suông. Tôi có khả năng lập trình và ứng dụng AI để tạo ra các công cụ quản lý lịch, tối ưu phân phối việc làm tự động.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-start">
                       <Zap size={32} className="text-purple-600 shrink-0 mt-1" />
                       <div>
                          <h4 className="text-xl font-bold uppercase font-space mb-2">Quản Trị Đa Ngành Cường Độ Cao</h4>
                          <p className="text-zinc-500 font-light leading-relaxed">
                            Thực chiến bền bỉ tại các môi trường khắt khe nhất: Quản trị Retail Quốc tế (ALDO), Phòng sản xuất nghệ thuật (SB Studio), và Bếp cao điểm (Phủi Steak).
                          </p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                   // REAL-WORLD SOLUTIONS FOR SCALE // BUILT TO CONVERT RECRUITERS
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 03: CASE STUDIES WITH 3D PERSPECTIVE */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 2 && (
              <motion.section 
                key="slide-3"
                initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.2, opacity: 0, rotate: 2 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                <div className="flex justify-between items-end border-b border-[#121212]/5 pb-6">
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">// CAREER DATA CASE STUDIES (CLICK AND HEAR)</span>
                  <span className="font-mono text-[9px] text-purple-600 font-bold tracking-widest">TAP_CARDS_TO_WHOOSH</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-center">
                  {careerImpacts.map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseMove={handle3DTilt}
                      onMouseLeave={reset3DTilt}
                      onMouseEnter={() => synth.playWhoosh()}
                      className="bg-white border border-[#121212]/5 p-8 rounded-[36px] shadow-sm flex flex-col justify-between h-[420px] cursor-pointer group scan-glow"
                    >
                       <div className="flex justify-between items-start">
                          <span className="font-space text-5xl font-black text-stroke">{item.num}</span>
                          <span className="font-mono text-[9px] bg-purple-50 px-3 py-1 rounded-full text-purple-600 uppercase tracking-wider">{item.period}</span>
                       </div>
                       <div>
                          <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1">{item.company}</p>
                          <h4 className="text-2xl font-space font-black tracking-tight text-[#121212] group-hover:text-purple-600 transition-colors uppercase leading-none mb-4">{item.role}</h4>
                          <p className="text-sm text-zinc-500 font-light leading-relaxed italic">{item.detail}</p>
                       </div>
                       <div className="pt-4 border-t border-zinc-100 flex flex-col gap-1">
                          <span className="font-mono text-[10px] font-bold text-emerald-600">{item.metrics}</span>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">{item.highlight}</span>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                   // REALMETRICS // CLICK TO INQUIRE DETAILS
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 04: CONTACT PORTAL AND DETAILS */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 3 && (
              <motion.section 
                key="slide-4"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-[#121212] text-white"
              >
                <div className="text-center my-auto">
                  <span className="font-mono text-[9px] tracking-[0.6em] text-purple-400 uppercase block mb-12">// RECRUITMENT GATEWAY</span>
                  <motion.div 
                    whileHover={{ scale: 0.96 }}
                    className="inline-block cursor-pointer"
                  >
                    <a 
                      href="mailto:studionopu@gmail.com" 
                      onClick={() => synth.playSuccess()}
                      className="text-[8vw] md:text-[5vw] font-bold font-space leading-none tracking-tighter hover:text-purple-400 border-b-4 border-white hover:border-purple-400 transition-all duration-300 pb-4 inline-block text-white"
                    >
                      STUDIONOPU@GMAIL.COM
                    </a>
                  </motion.div>

                  <div className="flex justify-center gap-10 mt-16">
                    {[
                      { icon: <Music />, url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                      { icon: <Youtube />, url: "https://youtube.com/@postlain" },
                      { icon: <Instagram />, url: "https://www.instagram.com/postlainagain" }
                    ].map((soc, idx) => (
                      <a key={idx} href={soc.url} target="_blank" className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                         {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-500 gap-6">
                  <span>SYSTEM CONFIGURATION: NEXTJS + INTERCEPTOR + DECK</span>
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
