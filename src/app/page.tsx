"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Zap, Music, Youtube, Instagram, Terminal, Cpu, Layers } from 'lucide-react';
import Lenis from 'lenis';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN KỸ THUẬT SỐ (REAL-TIME SYNTHESIZER)
// ----------------------------------------------------
class TechSynth {
  private ctx: AudioContext | null = null;
  init() {
    if (!this.ctx && typeof window !== "undefined") {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }
  playClick() {
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
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.12);
  }
  playSuccess() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1040, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
  }
}

const synth = new TechSynth();

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. CHẠY PRELOADER CONSOLE
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        if (prev % 12 === 0) synth.playClick();
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // 2. SMOOTH SCROLL LENIS (Cố định cuộn chuột dọc để lái trang ngang)
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, [loading]);

  // 3. THUẬT TOÁN ĐIỀU PHỐI ĐA CHIỀU (VERTICAL TO HORIZONTAL MAPPER)
  const { scrollYProgress } = useScroll();
  
  // Chúng ta có 4 panel khổng lồ nằm ngang (w-[400vw]). Do đó translation đi từ 0% đến -75%.
  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Hiệu ứng Parallax cho các khối chữ bay lệch tốc độ (Chiều sâu thị giác giống 28K)
  const textParallax = useTransform(scrollYProgress, [0, 1], ["0px", "300px"]);
  const textParallaxReverse = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);

  return (
    <div className="relative bg-[#FAF8F5] text-[#121212]" style={{ height: "400vh" }}>
      
      {/* 1. MÀN HÌNH KHỞI TẠO HỆ THỐNG */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#121212] text-white z-[9999] flex flex-col justify-between p-8 font-mono"
          >
            <div className="flex justify-between text-xs opacity-50 border-b border-white/5 pb-4">
              <span>POSTLAIN ENGINE V3.2</span>
              <span>CALIBRATING HORIZONTAL GRID...</span>
            </div>
            <div className="text-center">
              <span className="text-[15vw] font-black leading-none font-space text-purple-500">{progress}%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs opacity-50">AUDIO HARDWARE ACTIVE</span>
              <span className="text-xs">DALAT, VN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-hidden">
          
          {/* HEADER NAV CỐ ĐỊNH PHÍA TRÊN */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#121212]/5 bg-[#FAF8F5]/80 backdrop-blur-md">
            <span className="font-space font-black tracking-tighter text-2xl">POSTLAIN*</span>
            <div className="flex gap-4 items-center">
              <span className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">System: Horizontal Flow</span>
            </div>
          </nav>

          {/* DÒNG TIẾN TRÌNH TRƯỢT NGANG PHÍA DƯỚI */}
          <div className="fixed bottom-6 left-8 z-50 font-mono text-[9px] tracking-[0.2em] uppercase opacity-40 flex items-center gap-2">
            <span>Scroll Down to Pan</span>
            <ArrowRight size={12} className="animate-pulse" />
          </div>

          {/* CONTAINER CHUYỂN DỊCH NGANG (THE HORIZONTAL STAGE) */}
          <motion.div 
            ref={containerRef}
            style={{ x: xTranslation }} 
            className="flex h-screen w-[400vw]"
          >
            
            {/* ==================================================== */}
            {/* SLIDE 1: INTRO & TYPOGRAPHY POWER */}
            {/* ==================================================== */}
            <section className="w-screen h-full flex flex-col justify-between pt-40 p-8 md:p-24 flex-shrink-0 hairline-r relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                <div className="md:col-span-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal size={14} className="text-purple-600" />
                    <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-purple-600">The Operations & AI Architecture</span>
                  </div>
                  <h1 className="text-[11vw] md:text-[8vw] font-black font-space leading-[0.82] tracking-[-0.06em] uppercase">
                    OPERATIONS<br />
                    <span className="italic font-light text-zinc-400">DESIGNED TO</span><br />
                    OPTIMIZE.
                  </h1>
                </div>
                <motion.div style={{ y: textParallaxReverse }} className="md:col-span-4 md:text-right md:pt-14">
                  <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block mb-4">// EXECUTIVE SUMMARY</span>
                  <p className="text-lg text-zinc-600 leading-relaxed font-light">
                     Tái cấu trúc và tối ưu hóa hệ thống vận hành bằng lập trình tư duy thực tế, phối hợp ăn ý giữa quy trình logic và AI.
                  </p>
                </motion.div>
              </div>

              {/* Grid Metadata Chạy Dưới Chân */}
              <div className="border-t border-[#121212]/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500 relative z-10">
                <div>
                  <p className="text-zinc-400 mb-1">01 / RETAIL MANAGER</p>
                  <p className="font-bold text-[#121212]">ALDO GO! DALAT</p>
                </div>
                <div>
                  <p className="text-zinc-400 mb-1">02 / STUDIO MANAGER</p>
                  <p className="font-bold text-[#121212]">SB STUDIO</p>
                </div>
                <div>
                  <p className="text-zinc-400 mb-1">03 / SPECIAL STRENGTH</p>
                  <p className="font-bold text-purple-600">AI AUTOMATION LOGIC</p>
                </div>
                <div className="text-right flex justify-end items-end gap-2 text-purple-600">
                  <span>PANEL_01_READY</span>
                </div>
              </div>
            </section>

            {/* ==================================================== */}
            {/* SLIDE 2: BUSINESS IMPACT & SPECIALTIES */}
            {/* ==================================================== */}
            <section className="w-screen h-full flex flex-col justify-between pt-40 p-8 md:p-24 flex-shrink-0 hairline-r bg-white relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                <div className="md:col-span-6">
                  <p className="font-mono text-[9px] tracking-[0.4em] text-zinc-400 uppercase mb-4">// THE BLUEPRINT OF VALUE</p>
                  <h2 className="text-5xl md:text-7xl font-space font-black tracking-tighter uppercase leading-none mb-10">
                    BẢN LĨNH<br />ĐIỀU PHỐI.
                  </h2>
                </div>
                <motion.div style={{ x: textParallax }} className="md:col-span-6 space-y-12">
                  <div className="flex gap-6 items-start">
                     <Bot size={32} className="text-purple-600 shrink-0 mt-1" />
                     <div>
                        <h4 className="text-xl font-bold uppercase font-space mb-2">Tự Động Hóa AI Thực Chiến</h4>
                        <p className="text-zinc-500 font-light leading-relaxed">
                          Tích hợp tự động hóa tác vụ giúp loại bỏ các khâu thừa thãi, nâng cao năng suất quản lý kho bãi, nhân lực và kịch bản truyền thông tự động.
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-6 items-start">
                     <Layers size={32} className="text-purple-600 shrink-0 mt-1" />
                     <div>
                        <h4 className="text-xl font-bold uppercase font-space mb-2">Quản Trị Đa Ngành Cường Độ Cao</h4>
                        <p className="text-zinc-500 font-light leading-relaxed">
                          Thực chiến tại các môi trường khắt khe nhất: Quản trị Retail Quốc tế (ALDO), Điều hành sản xuất truyền thông (SB Studio), và Bếp cao điểm (Phủi Steak).
                        </p>
                     </div>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                 // SYSTEMS & DATA ARCHITECTURE // BUILT TO CONVERT RECRUITERS
              </div>
            </section>

            {/* ==================================================== */}
            {/* SLIDE 3: SELECTED WORK ARCHIVE (THE CASE STUDIES) */}
            {/* ==================================================== */}
            <section className="w-screen h-full flex flex-col justify-between pt-40 p-8 md:p-24 flex-shrink-0 hairline-r relative overflow-hidden">
              <div className="flex justify-between items-end border-b border-[#121212]/5 pb-6">
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">// CAREER DATA CASE STUDIES (CLICK AND HEAR)</span>
                <span className="font-mono text-[10px] text-purple-600 font-bold tracking-widest">TAP_CARDS_TO_WHOOSH</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-center">
                {careerImpacts.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -15, scale: 1.02 }}
                    onMouseEnter={() => synth.playWhoosh()}
                    className="bg-white border border-[#121212]/5 p-8 rounded-[36px] shadow-sm flex flex-col justify-between h-[420px] cursor-pointer group"
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
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[#121212]/5 py-8 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                 // HORIZONTAL SCROLL DECK V3.2 // THE REAL METRICS THAT MATTERS
              </div>
            </section>

            {/* ==================================================== */}
            {/* SLIDE 4: CALL TO ACTION & CONTACT BLOCKS */}
            {/* ==================================================== */}
            <section className="w-screen h-full flex flex-col justify-between pt-40 p-8 md:p-24 flex-shrink-0 bg-white relative overflow-hidden">
              <div className="text-center my-auto">
                <span className="font-mono text-[10px] tracking-[0.6em] text-purple-600 uppercase block mb-12">// RECRUITMENT GATEWAY</span>
                <motion.div 
                  whileHover={{ scale: 0.96 }}
                  className="inline-block cursor-pointer"
                >
                  <a 
                    href="mailto:studionopu@gmail.com" 
                    onClick={() => synth.playSuccess()}
                    className="text-[8vw] md:text-[5vw] font-bold font-space leading-none tracking-tighter text-[#121212] hover:text-purple-600 border-b-4 border-[#121212] hover:border-purple-600 transition-all duration-300 pb-4 inline-block"
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
                    <a key={idx} href={soc.url} target="_blank" className="p-4 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all">
                       {soc.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-400 gap-6">
                <span>SYSTEM CONFIGURATION: NEXTJS + LENIS + FRAMER</span>
                <span>Ngô Phúc // POSTLAIN © 2026</span>
                <span>+84 938-649-420</span>
              </div>
            </section>

          </motion.div>
        </div>
      )}
    </div>
  );
}
