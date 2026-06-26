"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Bot, Zap, Music, Youtube, Instagram, Terminal, Award, Globe, ArrowUpRight, HelpCircle, Eye } from 'lucide-react';
import Lenis from 'lenis';

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
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.25);
  }
}

const synth = new TechSynth();

// ĐỮ LIỆU CASE STUDIES VỚI CHỈ SỐ DOANH NGHIỆP CỰC MẠNH
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. CHẠY CONSOLE LOADING GIẢ LẬP ĐẲNG CẤP CAO
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
    }, 20);
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

  // 3. THE CUSTOM MOUSE LENS
  useEffect(() => {
    if (loading) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [loading]);

  // 4. NỀN NƯỚC CHẢY SINH HỌC CHUYỂN ĐỘNG CHẬM (FLUID WAVE NETWORKS)
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
      tick += 0.003;

      // Vẽ sóng lỏng mềm mại (Liquid Ink Flow)
      ctx.beginPath();
      ctx.moveTo(0, height);
      
      for (let x = 0; x < width; x++) {
        // Thuật toán sóng Sine kép tạo nhiễu sinh học cực mượt
        const y = Math.sin(x * 0.002 + tick) * Math.cos(x * 0.001 + tick * 0.5) * 60 + height * 0.7;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = "rgba(139, 92, 246, 0.02)"; // Tím rất mỏng
      ctx.fill();

      // Vẽ sóng lỏng 2
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * 0.0015 - tick * 0.8) * Math.cos(x * 0.0025 + tick) * 45 + height * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = "rgba(20, 20, 20, 0.01)"; // Sóng kem đậm
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // 5. THUẬT TOÁN XOAY 3D THEO TỌA ĐỘ CHUỘT (PERSPECTIVE 3D ROTATION)
  const handle3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Điều chỉnh lực xoay mượt mà
    el.style.transform = `perspective(1000px) rotateY(${x * 0.07}deg) rotateX(${-y * 0.07}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = "transform 0.1s ease-out";
  };

  const reset3DTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    el.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#121212] overflow-hidden">
      
      {/* NỀN SÓNG NƯỚC CHẢY CHẬM */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* CUSTOM CURSOR LENS (MẮT KÍNH THEO DÕI) */}
      {!loading && (
        <motion.div 
          className="fixed w-10 h-10 border border-[#121212] rounded-full pointer-events-none z-[9999] custom-cursor mix-blend-difference"
          animate={{
            x: cursorPos.x - 20,
            y: cursorPos.y - 20,
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        />
      )}

      {/* LOADING SCREEN CONSOLE CHUẨN XỊN */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#121212] text-white z-[9999] flex flex-col justify-between p-8 font-mono"
          >
            <div className="flex justify-between items-center text-xs opacity-50 border-b border-white/5 pb-4">
              <span className="flex items-center gap-2">
                <Terminal size={14} className="animate-pulse" /> POSTLAIN OS_
              </span>
              <span>DALAT // CAMLY FLUID NODE</span>
            </div>
            <div className="text-center">
              <span className="text-[14vw] font-black leading-none font-space text-purple-500">{progress}%</span>
            </div>
            <div className="flex justify-between items-end text-xs opacity-50">
              <span>CALIBRATING MULTI-STAGE MECHANISM...</span>
              <span>©2026 CORES</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-20">
          
          {/* HEADER NAV CHUẨN ĐAN MẠCH */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#121212]/5 bg-[#FAF8F5]/80 backdrop-blur-md">
            <span 
              onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
              onMouseLeave={() => setIsHovered(false)}
              className="font-space font-black tracking-tighter text-2xl"
            >
              POSTLAIN*
            </span>
            <div className="flex gap-8 items-center text-[10px] font-mono tracking-widest uppercase opacity-60">
              <a 
                href="#case-studies" 
                onClick={() => synth.playWhoosh()}
                onMouseEnter={() => synth.playTick()}
                className="hover:text-purple-600 transition"
              >
                01 / Portfolio
              </a>
              <a 
                href="#values" 
                onClick={() => synth.playWhoosh()}
                onMouseEnter={() => synth.playTick()}
                className="hover:text-purple-600 transition"
              >
                02 / Strengths
              </a>
              <a 
                href="mailto:studionopu@gmail.com" 
                onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-[#121212] text-white px-5 py-2.5 rounded-full hover:bg-purple-600 transition font-bold"
              >
                Inquire Core
              </a>
            </div>
          </nav>

          {/* ==================================================== */}
          {/* SECTION 1: HERO - TEXT REVEAL MASK */}
          {/* ==================================================== */}
          <section className="min-h-screen flex flex-col justify-between pt-40 px-6 md:px-12 relative border-b border-[#121212]/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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

            {/* Hệ Thống Grid Chân Trang */}
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
                <span>SCROLL TO SYSTEM DECK</span>
              </div>
            </div>
          </section>

          {/* ==================================================== */}
          {/* SECTION 2: 3D PERSPECTIVE CARDS (PORTFOLIO CHI TIẾT) */}
          {/* ==================================================== */}
          <section id="case-studies" className="py-40 px-6 md:px-12 border-b border-[#121212]/5">
            <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#121212]/5 pb-8">
              <div>
                <p className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest">// SELECTED CASE STUDIES</p>
                <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter uppercase mt-2">Dữ Liệu Thực Chiến</h2>
              </div>
              <p className="max-w-xs text-sm text-zinc-500 leading-relaxed italic">
                 Di chuyển chuột lên các thẻ để cảm nhận không gian 3 chiều vật lý phản hồi theo thời gian thực.
              </p>
            </div>

            {/* GRID THẺ 3D XOAY PERSPECTIVE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careerImpacts.map((item, idx) => (
                <div 
                  key={idx}
                  onMouseMove={handle3DTilt}
                  onMouseLeave={reset3DTilt}
                  onMouseEnter={() => synth.playWhoosh()}
                  className="bg-white border border-[#121212]/5 p-10 rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 h-[480px] flex flex-col justify-between group scan-glow"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-space text-5xl font-black text-zinc-300 group-hover:text-purple-600 transition-all">{item.num}</span>
                    <div className="p-3 bg-purple-50 rounded-2xl">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-2">{item.company} // {item.period}</span>
                    <h3 className="text-3xl font-space font-black tracking-tight uppercase group-hover:text-purple-600 transition-colors mb-4">{item.role}</h3>
                    <p className="text-zinc-500 font-light leading-relaxed text-sm italic">{item.detail}</p>
                  </div>
                  <div className="pt-6 border-t border-zinc-100">
                    <h5 className="font-mono text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{item.metrics}</h5>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase mt-1 tracking-widest">{item.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ==================================================== */}
          {/* SECTION 3: EDITORIAL GRID PANEL (CREATIVE DENMARK STYLE) */}
          {/* ==================================================== */}
          <section id="values" className="py-40 px-6 md:px-12 bg-white border-b border-[#121212]/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 space-y-8">
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block">// ARCHITECTURE OF AUTOMATION</span>
                <h2 className="text-5xl md:text-6xl font-space font-black tracking-tighter uppercase leading-none">
                  GIẢI PHÁP<br />TỰ ĐỘNG HÓA.
                </h2>
                <p className="text-zinc-600 font-light leading-relaxed text-lg">
                  Tôi viết mã để quản lý thay vì dùng giấy tờ thủ công. Quy trình hóa hệ thống giúp các doanh nghiệp tiết kiệm hàng nghìn giờ làm việc mệt mỏi và loại bỏ hoàn toàn các lỗi sai lệch từ con người.
                </p>
                <div className="flex gap-4">
                  <div className="p-5 border border-zinc-100 rounded-3xl flex-1">
                    <h4 className="font-space font-bold text-xl mb-1">40%</h4>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Tiết Kiệm Chi Phí</p>
                  </div>
                  <div className="p-5 border border-zinc-100 rounded-3xl flex-1">
                    <h4 className="font-space font-bold text-xl mb-1">200%</h4>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">Tăng Trưởng Hiệu Suất</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-8 border border-zinc-100 rounded-[36px] bg-[#FAF8F5] flex flex-col justify-between h-[300px] hover:border-purple-600/20 transition-all">
                  <Terminal size={32} className="text-purple-600" />
                  <div>
                    <h4 className="font-space font-bold text-xl uppercase mb-2">Google API Integration</h4>
                    <p className="text-sm text-zinc-500 font-light">Tự động kết nối dữ liệu kho bãi ALDO và lịch phòng thu SB Studio lên đám mây lưu trữ đồng bộ.</p>
                  </div>
                </div>
                <div className="p-8 border border-zinc-100 rounded-[36px] bg-[#FAF8F5] flex flex-col justify-between h-[300px] hover:border-purple-600/20 transition-all">
                  <Award size={32} className="text-purple-600" />
                  <div>
                    <h4 className="font-space font-bold text-xl uppercase mb-2">Tư Duy Thiết Kế Web</h4>
                    <p className="text-sm text-zinc-500 font-light">Kiến thức nền tảng từ Cao đẳng FPT giúp tôi thiết lập các giao diện quản trị hệ thống đẹp mắt và tối ưu UI/UX.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================== */}
          {/* SECTION 4: THE ULTIMATE CONTACT CONNECTOR */}
          {/* ==================================================== */}
          <footer className="py-48 px-6 md:px-12 text-center bg-[#121212] text-[#FAF8F5] rounded-[60px] md:rounded-[100px] m-4">
            <div className="max-w-4xl mx-auto">
              <span className="font-mono text-[9px] tracking-[0.6em] text-purple-400 uppercase block mb-12">// RECRUITMENT GATEWAY</span>
              
              <div 
                onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-block"
              >
                <a 
                  href="mailto:studionopu@gmail.com" 
                  onClick={() => synth.playSuccess()}
                  className="text-[10vw] md:text-[6vw] font-bold font-space leading-none tracking-tighter text-[#FAF8F5] hover:text-purple-400 border-b-4 border-[#FAF8F5] hover:border-purple-400 transition-all duration-300 pb-4 inline-block"
                >
                  STUDIONOPU@GMAIL.COM
                </a>
              </div>

              <div className="flex justify-center gap-10 mt-20">
                {[
                  { icon: <Music />, url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                  { icon: <Youtube />, url: "https://youtube.com/@postlain" },
                  { icon: <Instagram />, url: "https://www.instagram.com/postlainagain" }
                ].map((soc, idx) => (
                  <a 
                    key={idx} 
                    href={soc.url} 
                    target="_blank" 
                    onMouseEnter={() => { setIsHovered(true); synth.playTick(); }}
                    onMouseLeave={() => setIsHovered(false)}
                    className="p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all"
                  >
                     {soc.icon}
                  </a>
                ))}
              </div>

              <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500 gap-6">
                <span>SYSTEM LOCATION: DALAT, LÂM ĐỒNG</span>
                <span>Ngô Phúc // POSTLAIN © 2026</span>
                <span>+84 938-649-420</span>
              </div>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
