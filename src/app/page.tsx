"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Music, Youtube, Instagram, Terminal, Award, Globe, ArrowDown, ArrowUp, Compass, Cpu, Activity, LayoutGrid } from 'lucide-react';
import Lenis from 'lenis';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN KỸ THUẬT SỐ (REAL-TIME SYNTH ENGINE)
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
    gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.04);
  }
  playWhoosh() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
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

// ĐỮ LIỆU CHỈ SỐ THỰC CHIẾN (RECRUITER TARGET)
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
    detail: "Áp dụng phương pháp di chuyển tam giác vàng trong bếp công nghiệp, phân phối mượt mà các món Âu chất lượng cao trong khung giờ cao điểm.",
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

  // 1. CHẠY PRELOADER CONSOLE
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

  // 3. MOUSE LENS CONTROLLER
  useEffect(() => {
    if (loading) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [loading]);

  // 4. SCROLL INTERCEPT ENGINE (KHÓA CUỘN DỌC TRỰT SLIDE TỰ ĐỘNG)
  useEffect(() => {
    if (loading) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 30 && activeSlide < 3) {
        setIsScrolling(true);
        synth.playWhoosh();
        setActiveSlide(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1200); // 1.2s lock để animation chuyển mượt
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

  // 5. XOAY 3D THẺ HOÀNH TRÁNG (3D ROTATION ENGINE)
  const handle3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `perspective(1200px) rotateY(${x * 0.08}deg) rotateX(${-y * 0.08}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const reset3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  };

  // 6. NỀN NƯỚC SINH HỌC CHUYỂN ĐỘNG CHẬM & QUAY THIẾT BỊ HUYỀN ẢO
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
      tick += 0.002;

      // HÀO QUANG TRÔI NỔI (LUXURY FLOATING ORBS)
      const orbX = width * 0.7 + Math.sin(tick) * 100;
      const orbY = height * 0.3 + Math.cos(tick * 1.5) * 100;
      const grad = ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, 350);
      grad.addColorStop(0, "rgba(124, 58, 237, 0.06)"); // Tím nhạt
      grad.addColorStop(1, "rgba(250, 248, 245, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 350, 0, Math.PI * 2);
      ctx.fill();

      // SÓNG LỎNG CHẢY CHẬM
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.0015 + tick) * Math.cos(x * 0.001 + tick * 0.5) * 50 + height * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "rgba(18, 18, 18, 0.015)";
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#FAF8F5] blueprint-grid">
      
      {/* NỀN SÓNG NƯỚC & HÀO QUANG CHẢY CHẬM */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* CUSTOM CURSOR LENS (KÍNH LÚP HOÀNH TRÁNG) */}
      {!loading && (
        <motion.div 
          className="fixed w-12 h-12 border border-[#121212] rounded-full pointer-events-none z-[9999] mix-blend-difference"
          animate={{
            x: cursorPos.x - 24,
            y: cursorPos.y - 24,
            scale: isHovered ? 1.8 : 1,
            borderWidth: isHovered ? "2px" : "1px",
            backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
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
                <Terminal size={14} className="animate-spin text-purple-500" /> POSTLAIN SYS_CORE V4.0
              </span>
              <span>DALAT // GENERATIVE INTERFACE</span>
            </div>
            <div className="text-center">
              <span className="text-[14vw] font-black leading-none font-space text-purple-500">{progress}%</span>
            </div>
            <div className="flex justify-between items-end text-xs opacity-50">
              <span>SYNTHESIZING MECHANICAL INTERACTION CORE...</span>
              <span>©2026 CORES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="h-full w-full relative z-20">
          
          {/* HEADER NAV CHUẨN BẮC ÂU */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#121212]/5 bg-[#FAF8F5]/80 backdrop-blur-md">
            <span 
              onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
              onMouseLeave={() => setIsHovered(false)}
              className="font-space font-black tracking-tighter text-2xl"
            >
              POSTLAIN*
            </span>
            <div className="flex gap-4 items-center font-mono text-[9px] tracking-widest text-zinc-400">
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-ping" />
              <span>ACTIVE SYSTEM: COORD_0{activeSlide + 1}</span>
            </div>
          </nav>

          {/* BỘ CHỈ BÁO TRANG LỘNG LẪY PHÍA BÊN PHẢI (BLUEPRINT NAVIGATION) */}
          <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-8 hidden md:flex border-l border-zinc-200 pl-4 py-8">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx}
                onClick={() => { synth.playWhoosh(); setActiveSlide(idx); }}
                className="group flex items-center justify-end gap-4 relative"
              >
                <span className={`font-mono text-[10px] tracking-widest transition-opacity duration-300 ${activeSlide === idx ? "opacity-100 font-black text-purple-600" : "opacity-30 group-hover:opacity-100"}`}>
                  STAGE_0{idx + 1}
                </span>
                <span className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-purple-600 scale-[2] ring-4 ring-purple-100" : "bg-zinc-300 group-hover:bg-zinc-800"}`} />
              </button>
            ))}
          </div>

          {/* DÒNG TIẾN TRÌNH CUỘN Ở CHÂN TRANG */}
          <div className="fixed bottom-8 left-8 z-50 font-mono text-[9px] tracking-widest uppercase opacity-40 flex items-center gap-6">
             <div className="flex gap-1 items-center">
               <ArrowUp size={12} className="text-purple-600" />
               <div className="w-12 h-[1px] bg-zinc-300" />
               <ArrowDown size={12} className="text-purple-600" />
             </div>
             <span>Swivel Mouse Wheel / Swipe to explore</span>
          </div>

          {/* KHÔNG GIAN KHỞI TẠO CÁC SLIDE HOÀNH TRÁNG */}
          <AnimatePresence mode="wait">
            
            {/* ---------------------------------------------------- */}
            {/* SLIDE 01: HERO - HOÀNH TRÁNG & KIẾN TRÚC GRAPHIC */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 0 && (
              <motion.section 
                key="slide-1"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                {/* Đồ họa vector sinh học xoay chậm tạo sự lộng lẫy */}
                <div className="absolute right-[5%] top-[15%] w-[350px] h-[350px] opacity-[0.06] pointer-events-none hidden md:block">
                  <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_60s_linear_infinite]">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" />
                    <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke="currentColor" strokeWidth="0.2" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Terminal size={14} className="text-purple-600" />
                      <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-purple-600">Postlain Operations Hub</span>
                    </div>
                    {/* Sự kết hợp giữa Serif hoành tráng và Sans-serif mạnh mẽ */}
                    <h1 className="text-[12vw] md:text-[9vw] font-black font-space leading-[0.8] tracking-[-0.06em] uppercase text-[#121212]">
                      OPERATIONS<br />
                      <span className="italic font-serif font-light text-zinc-400 lowercase" style={{ textTransform: "none" }}>designed to</span><br />
                      OPTIMIZE.
                    </h1>
                  </div>
                  <div className="md:col-span-4 md:text-right md:pt-16">
                    <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block mb-4">// EXEC PROFILE //</span>
                    <p className="text-xl text-zinc-600 font-light leading-relaxed font-serif italic">
                      Tôi là Ngô Phúc (POSTLAIN) — Chuyên gia định vị hệ thống, quản lý vận hành đa kênh tích hợp tự động hóa lập trình AI thực chiến.
                    </p>
                  </div>
                </div>

                {/* Grid Chân Trang lấp đầy khoảng trống cực sang trọng */}
                <div className="border-t border-[#121212]/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500 relative z-10">
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 flex items-center gap-1"><Cpu size={12}/> 01 / RETAIL MANAGER</p>
                    <p className="font-bold text-[#121212]">ALDO GO! DALAT</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 flex items-center gap-1"><Activity size={12}/> 02 / MEDIA DIRECTOR</p>
                    <p className="font-bold text-[#121212]">SB STUDIO</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-400 flex items-center gap-1"><Compass size={12}/> 03 / COORDINATE</p>
                    <p className="font-bold text-purple-600">DALAT NODE // VN</p>
                  </div>
                  <div className="text-right flex justify-end items-end gap-2 text-purple-600 font-bold">
                    <span>SYSTEMS ONLINE</span>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 02: OPERATIONS DASHBOARD (BẢN ĐIỀU KHIỂN HOÀNH TRÁNG) */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 1 && (
              <motion.section 
                key="slide-2"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 my-auto">
                  <div className="md:col-span-5 space-y-8">
                    <span className="font-mono text-[9px] tracking-[0.4em] text-purple-600 uppercase block">// VALUE METRICS MATRIX</span>
                    <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter uppercase leading-none text-[#121212]">
                      BẢN LĨNH<br />VẬN HÀNH.
                    </h2>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg font-serif italic">
                      "Không chỉ dừng lại ở vai trò quản lý tĩnh; tôi thiết lập các hệ số tăng trưởng thực tế dựa trên dữ liệu hệ thống."
                    </p>
                  </div>

                  {/* Bản hiển thị đồ họa Dashboard dữ liệu kỹ thuật số phức tạp */}
                  <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-8 border border-zinc-100 rounded-[32px] bg-[#FAF8F5] hover:border-purple-600/30 transition-all flex flex-col justify-between h-[250px]">
                        <Bot size={32} className="text-purple-600" />
                        <div>
                          <h4 className="text-lg font-bold uppercase font-space text-[#121212]">Lập trình Tác Vụ AI</h4>
                          <p className="text-xs text-zinc-400 mt-2 font-mono uppercase tracking-wider">KPI AUTOMATION // GOOGLE API</p>
                        </div>
                     </div>
                     <div className="p-8 border border-zinc-100 rounded-[32px] bg-[#FAF8F5] hover:border-purple-600/30 transition-all flex flex-col justify-between h-[250px]">
                        <Zap size={32} className="text-purple-600" />
                        <div>
                          <h4 className="text-lg font-bold uppercase font-space text-[#121212]">Vận Hành Đa Kênh</h4>
                          <p className="text-xs text-zinc-400 mt-2 font-mono uppercase tracking-wider">RETAIL • MEDIA • RESTAURANT</p>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400 flex justify-between items-center">
                   <span>// STRUCTURAL INTEGRITY // HIGH CONVERT CORES</span>
                   <span>STABILITY: 100%</span>
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 03: 3D GLASS PERSPECTIVE (CASE STUDIES) */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 2 && (
              <motion.section 
                key="slide-3"
                initial={{ scale: 0.9, opacity: 0, rotateY: 45 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 1.1, opacity: 0, rotateY: -45 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24"
              >
                <div className="flex justify-between items-end border-b border-[#121212]/5 pb-6">
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">// CAREER DATA CASE STUDIES (CLICK AND HEAR)</span>
                  <span className="font-mono text-[9px] text-purple-600 font-bold tracking-widest flex items-center gap-2"><LayoutGrid size={12}/> HOVER_TO_ACTIVATE_TILT</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto items-center">
                  {careerImpacts.map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseMove={handle3DTilt}
                      onMouseLeave={reset3DTilt}
                      onMouseEnter={() => synth.playWhoosh()}
                      className="glass-panel p-10 rounded-[48px] shadow-sm flex flex-col justify-between h-[450px] cursor-pointer group scan-glow transition-all"
                    >
                       <div className="flex justify-between items-start">
                          <span className="font-space text-6xl font-black text-stroke group-hover:text-purple-600 transition-all">{item.num}</span>
                          <span className="font-mono text-[9px] bg-purple-50 px-3 py-1.5 rounded-full text-purple-600 uppercase tracking-wider font-bold">{item.period}</span>
                       </div>
                       <div>
                          <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mb-1">{item.company}</p>
                          <h4 className="text-2xl font-space font-black tracking-tight text-[#121212] uppercase leading-tight mb-4">{item.role}</h4>
                          <p className="text-sm text-zinc-500 font-light leading-relaxed font-serif italic">{item.detail}</p>
                       </div>
                       <div className="pt-6 border-t border-zinc-200 flex flex-col gap-1">
                          <span className="font-mono text-xs font-black text-purple-600 uppercase tracking-widest">{item.metrics}</span>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">{item.highlight}</span>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                   // REAL-WORLD EXEC DATA DECK // DESIGNED BY POSTLAIN
                </div>
              </motion.section>
            )}

            {/* ---------------------------------------------------- */}
            {/* SLIDE 04: THE MONOLITH CONTACT REACTOR (PORTAL HOÀNH TRÁNG) */}
            {/* ---------------------------------------------------- */}
            {activeSlide === 3 && (
              <motion.section 
                key="slide-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-[#121212] text-white"
              >
                {/* Một khối cầu năng lượng lớn rực sáng xoay ngầm phía sau tạo tính hoành tráng */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="text-center my-auto relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.8em] text-purple-400 uppercase block mb-12 animate-pulse">// RECRUITMENT GATEWAY CORE //</span>
                  
                  <motion.div 
                    whileHover={{ scale: 0.97 }}
                    className="inline-block cursor-pointer"
                  >
                    <a 
                      href="mailto:studionopu@gmail.com" 
                      onClick={() => synth.playSuccess()}
                      className="text-[10vw] md:text-[6vw] font-black font-space leading-none tracking-tighter hover:text-purple-400 border-b-[8px] md:border-b-[15px] border-white hover:border-purple-400 transition-all duration-300 pb-4 inline-block text-white uppercase italic"
                    >
                      LET'S CONNECT.
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
                        className="p-5 rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-110"
                      >
                         {soc.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-500 gap-6 relative z-10">
                  <span>SYSTEM SPEC: NEXTJS + GRAPHIC CORE V4</span>
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
