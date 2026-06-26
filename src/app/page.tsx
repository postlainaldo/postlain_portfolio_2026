"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bot, Zap, Music, Youtube, Instagram, Cpu, Terminal, Sparkles, TrendingUp, ShieldAlert, Award } from 'lucide-react';
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
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.05);
  }
  playWhoosh() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.15);
  }
}

const synth = new TechSynth();

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);

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

  // 3. HIỆU ỨNG CUỘN NGANG (VERTICAL TO HORIZONTAL SCROLL)
  const { scrollYProgress } = useScroll({ target: horizontalSectionRef });
  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const careerImpacts = [
    {
      num: "01",
      role: "STORE MANAGER",
      company: "ALDO GO! DALAT",
      period: "2025—2026",
      metrics: "Giảm Thất Thoát Kho Bãi <1%",
      highlight: "Tăng Trưởng Doanh Số 15%",
      detail: "Phân tích hành vi tệp khách hàng du lịch để cơ cấu lại danh mục sản phẩm chủ lực. Ứng dụng quy trình quản lý tinh giản giúp tối ưu hiệu năng làm việc của đội ngũ bán lẻ."
    },
    {
      num: "02",
      role: "STUDIO MANAGER",
      company: "SB STUDIO",
      period: "2023—2024",
      metrics: "Tiết Kiệm 40% Chi Phí Sản Xuất",
      highlight: "Tăng Hiệu Suất Vận Hành 200%",
      detail: "Hệ thống hóa toàn bộ lịch trình thu âm, quản lý nghệ sĩ và đối tác truyền thông qua nền tảng số. Loại bỏ các khâu thừa thãi giúp đẩy mạnh tốc độ sản xuất nội dung."
    },
    {
      num: "03",
      role: "KITCHEN CAPTAIN / CHEF",
      company: "PHUI STEAK",
      period: "2024—2025",
      metrics: "Giảm 20% Thời Gian Chờ Của Khách",
      highlight: "Sắp Xếp Quy Trình Bếp Đạt Mốc 100%",
      detail: "Ứng dụng sơ đồ di chuyển tuyến tính trong bếp. Điều phối ca cao điểm mượt mà bằng logic sắp xếp nguyên liệu thông minh."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#121212]">
      
      {/* PRELOADER HỆ THỐNG */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#121212] text-white z-[9999] flex flex-col justify-between p-8 font-mono"
          >
            <div className="flex justify-between text-xs opacity-50 border-b border-white/5 pb-4">
              <span>POSTLAIN KERNEL V3.0</span>
              <span>CALIBRATING SENSORS...</span>
            </div>
            <div className="text-center">
              <span className="text-[15vw] font-black leading-none font-space text-purple-500">{progress}%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs opacity-50">READY TO TRANSMIT</span>
              <span className="text-xs">DALAT, VN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative">
          
          {/* HEADER NAV CHUẨN ĐAN MẠCH */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#121212]/5 bg-[#FAF8F5]/80 backdrop-blur-md">
            <span className="font-space font-black tracking-tighter text-2xl">POSTLAIN*</span>
            <div className="flex gap-8 items-center text-[10px] font-mono tracking-widest uppercase">
              <a href="#about" onClick={() => synth.playWhoosh()} className="hover:text-purple-600 transition">About</a>
              <a href="#journey" onClick={() => synth.playWhoosh()} className="hover:text-purple-600 transition">Journey</a>
              <a href="mailto:studionopu@gmail.com" className="bg-[#121212] text-white px-4 py-2 rounded-full hover:bg-purple-600 transition">HIRE POSTLAIN</a>
            </div>
          </nav>

          {/* 1. HERO SECTION: TEXT MASK SPLIT EFFECT */}
          <section id="about" className="min-h-screen flex flex-col justify-between pt-40 px-6 md:px-12 relative border-b border-[#121212]/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal size={14} className="text-purple-600" />
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-purple-600">The Operations & AI Architecture</span>
                </div>
                <h1 className="text-[12vw] md:text-[8vw] font-black font-space leading-[0.82] tracking-[-0.06em] uppercase">
                  OPERATIONS<br />
                  <span className="italic font-light text-zinc-400">DESIGNED TO</span><br />
                  OPTIMIZE.
                </h1>
              </div>
              <div className="md:col-span-4 md:text-right md:pt-14">
                <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase block mb-4">// EXECUTIVE SUMMARY</span>
                <p className="text-lg text-zinc-600 leading-relaxed font-light">
                  Tôi không chỉ quản lý con người; tôi thiết kế quy trình. Sự kết hợp giữa tư duy logic tự động hóa của AI và bản lĩnh điều phối đa ngành giúp doanh nghiệp vận hành mượt mà và tối ưu chi phí.
                </p>
              </div>
            </div>

            <div className="border-t border-[#121212]/5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
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
                <span>SCROLL DOWN TO INITIATE SLIDER</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </section>

          {/* 2. CORE VALUE: ĐIỂM NHẤN ĐỐI VỚI DOANH NGHIỆP TUYỂN DỤNG */}
          <section className="py-32 px-6 md:px-12 bg-white border-b border-[#121212]/5">
            <p className="font-mono text-[10px] tracking-[0.4em] text-zinc-400 uppercase mb-4">// VALUE STATEMENT FOR EMPLOYERS</p>
            <h2 className="text-4xl md:text-6xl font-space font-black tracking-tighter uppercase mb-20">Tại sao tôi mang lại sự đột phá?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
              
              <div onMouseEnter={() => synth.playClick()} className="bg-white p-12 flex flex-col justify-between h-[450px]">
                <Bot size={40} className="text-purple-600" />
                <div>
                  <h3 className="text-3xl font-space font-bold uppercase tracking-tight mb-4">Tự Động Hóa Thực Tế</h3>
                  <p className="text-zinc-500 leading-relaxed font-light">
                     Không nói lý thuyết suông. Tôi có khả năng lập trình và ứng dụng AI trực tiếp để tạo ra các giải pháp tự quản lý nhân sự, tự phân công kịch bản truyền thông và xử lý các tệp dữ liệu kho bãi lớn.
                  </p>
                </div>
              </div>

              <div onMouseEnter={() => synth.playClick()} className="bg-white p-12 flex flex-col justify-between h-[450px]">
                <Zap size={40} className="text-purple-600" />
                <div>
                  <h3 className="text-3xl font-space font-bold uppercase tracking-tight mb-4">Kinh Nghiệm Thực Chiến Đa Ngành</h3>
                  <p className="text-zinc-500 leading-relaxed font-light">
                     Tôi đã lãnh đạo trong 3 môi trường khắc nghiệt nhất: Bán lẻ thời trang quốc tế cao cấp (ALDO), Phòng sản xuất nghệ thuật cường độ cao (SB Studio) và Gian bếp nóng giờ cao điểm (Phủi Steak).
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 3. ĐỈNH CAO CHUYỂN ĐỘNG: CUỘN DỌC TRỰT NGANG (HORIZONTAL SCROLL DECK) */}
          <div ref={horizontalSectionRef} id="journey" className="relative h-[300vh] border-b border-[#121212]/5">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#FAF8F5]">
              <motion.div style={{ x: xTranslation }} className="flex w-[300vw] h-full">
                
                {/* PANEL 1: SB STUDIO */}
                <div onMouseEnter={() => synth.playWhoosh()} className="w-screen h-full flex flex-col justify-between p-12 md:p-24 border-r border-[#121212]/5 flex-shrink-0">
                  <div className="flex justify-between items-start">
                     <span className="font-space text-7xl font-black text-stroke-charcoal">01 / 03</span>
                     <span className="font-mono text-xs bg-purple-50 px-4 py-2 rounded-full text-purple-600 font-bold uppercase tracking-wider">MEDIA OPERATIONS</span>
                  </div>
                  <div className="max-w-4xl">
                     <p className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-4">SB STUDIO • STUDIO MANAGER</p>
                     <h3 className="text-6xl md:text-8xl font-space font-black tracking-tighter uppercase leading-none mb-8">
                       TĂNG HIỆU SUẤT VẬN HÀNH 200%
                     </h3>
                     <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-2xl">
                       Thiết kế lại quy trình điều phối giữa nghệ sĩ và đội ngũ quay dựng, triệt tiêu 40% chi phí sản xuất thừa thãi. Xây dựng kế hoạch quản trị và định hướng marketing thực chiến thúc đẩy tiếp cận của thương hiệu.
                     </p>
                  </div>
                  <div className="flex gap-16 font-mono text-xs uppercase tracking-wider text-zinc-400">
                     <div>
                       <p className="text-[#121212] font-bold">Quản Lý Doanh Thu & CSKH</p>
                     </div>
                     <div>
                       <p className="text-[#121212] font-bold">Quản Lý Đối Tác MCN & Nghệ Sĩ</p>
                     </div>
                  </div>
                </div>

                {/* PANEL 2: ALDO GO! */}
                <div onMouseEnter={() => synth.playWhoosh()} className="w-screen h-full flex flex-col justify-between p-12 md:p-24 border-r border-[#121212]/5 flex-shrink-0">
                  <div className="flex justify-between items-start">
                     <span className="font-space text-7xl font-black text-stroke-charcoal">02 / 03</span>
                     <span className="font-mono text-xs bg-purple-50 px-4 py-2 rounded-full text-purple-600 font-bold uppercase tracking-wider">RETAIL OPERATIONS</span>
                  </div>
                  <div className="max-w-4xl">
                     <p className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-4">ALDO GO! DALAT • STORE MANAGER</p>
                     <h3 className="text-6xl md:text-8xl font-space font-black tracking-tighter uppercase leading-none mb-8">
                       GIẢM THẤT THOÁT KHO BÃI &lt;1%
                     </h3>
                     <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-2xl">
                       Sử dụng phương pháp kiểm soát kho tuyến tính và quản lý nhân sự bằng KPI chặt chẽ giúp thúc đẩy doanh số bán lẻ tăng 15%. Chịu trách nhiệm trực tiếp về phát triển ngành retail tại địa phương.
                     </p>
                  </div>
                  <div className="flex gap-16 font-mono text-xs uppercase tracking-wider text-zinc-400">
                     <div>
                       <p className="text-[#121212] font-bold">Vận Hành Cửa Hàng Bán Lẻ</p>
                     </div>
                     <div>
                       <p className="text-[#121212] font-bold">Kiểm Soát Tự Động Kho Bãi</p>
                     </div>
                  </div>
                </div>

                {/* PANEL 3: PHỦI STEAK */}
                <div onMouseEnter={() => synth.playWhoosh()} className="w-screen h-full flex flex-col justify-between p-12 md:p-24 flex-shrink-0">
                  <div className="flex justify-between items-start">
                     <span className="font-space text-7xl font-black text-stroke-charcoal">03 / 03</span>
                     <span className="font-mono text-xs bg-purple-50 px-4 py-2 rounded-full text-purple-600 font-bold uppercase tracking-wider">LOGISTICS OPERATIONS</span>
                  </div>
                  <div className="max-w-4xl">
                     <p className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-4">PHUI STEAK • KITCHEN CAPTAIN</p>
                     <h3 className="text-6xl md:text-8xl font-space font-black tracking-tighter uppercase leading-none mb-8">
                       ĐIỀU PHỐI ĐẠT MỐC 100% HIỆU SUẤT
                     </h3>
                     <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-2xl">
                       Giảm 20% thời gian chờ của khách hàng bằng cách tối ưu hóa sơ đồ bếp và quy trình phân bổ nguyên liệu Âu. Tự học và chuẩn hóa kỹ thuật áp chảo Steak giúp đảm bảo chất lượng đồng đều.
                     </p>
                  </div>
                  <div className="flex gap-16 font-mono text-xs uppercase tracking-wider text-zinc-400">
                     <div>
                       <p className="text-[#121212] font-bold">Tối Ưu Logistics Nguyên Liệu</p>
                     </div>
                     <div>
                       <p className="text-[#121212] font-bold">Kỹ Thuật Âu (Steak, Salmon, Pasta)</p>
                     </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>

          {/* 4. MẠNG XÃ HỘI & CONTACT CHUẨN CHUYÊN NGHIỆP */}
          <section className="py-40 px-6 md:px-12 border-t border-[#121212]/5">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-mono text-[9px] tracking-[0.5em] text-purple-600 uppercase block mb-12">// RECRUITMENT INQUIRY</span>
              <a 
                href="mailto:studionopu@gmail.com" 
                onClick={() => synth.playSuccess()}
                className="text-[9vw] md:text-[6vw] font-bold font-space leading-none tracking-tighter text-[#121212] hover:text-purple-600 border-b-4 border-[#121212] hover:border-purple-600 transition-all duration-300 pb-4 inline-block"
              >
                STUDIONOPU@GMAIL.COM
              </a>

              <div className="flex justify-center gap-10 mt-20">
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

              <div className="mt-32 pt-12 border-t border-[#121212]/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400 gap-6">
                <span>DALAT, VN</span>
                <span>Ngô Phúc // POSTLAIN © 2026</span>
                <span>+84 938-649-420</span>
              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
