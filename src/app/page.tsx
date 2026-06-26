"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Youtube, Instagram, ArrowDown, ArrowUp, X, Sparkles, TrendingUp, BarChart } from 'lucide-react';
import Lenis from 'lenis';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN SPA & LOUNGE CAO CẤP (BOUTIQUE AUDIO)
// ----------------------------------------------------
class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = false;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;

  init() {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn("AudioContext failed:", e);
    }
  }

  enableSound(status: boolean) {
    this.soundEnabled = status;
    if (status) {
      this.init();
    }
  }

  startAmbientMusic() {
    this.init();
    if (!this.ctx || this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.008, this.ctx.currentTime + 5);
      this.ambientGain.connect(this.ctx.destination);

      const luxuryChords = [110.00, 164.81];

      baseNotesForEach(luxuryChords);
    } catch (e) {
      console.warn("Ambient music error:", e);
    }
  }

  private baseNotesForEach(chords: number[]) {
    chords.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const oscGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      oscGain.gain.setValueAtTime(0.05, now);
      
      const swellDuration = 8;
      for (let i = 0; i < 100; i++) {
        const timeOffset = i * swellDuration;
        const val1 = idx === 0 ? 0.08 : 0.02;
        const val2 = idx === 0 ? 0.02 : 0.08;
        oscGain.gain.linearRampToValueAtTime(val1, now + timeOffset);
        oscGain.gain.linearRampToValueAtTime(val2, now + timeOffset + (swellDuration / 2));
      }

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.ambientGain);

      osc.start();
      this.ambientOscillators.push(osc);
    });
  }

  playTick() {
    if (!this.soundEnabled) return;
    try {
      this.init(); 
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.006, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015);
      
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      
      osc.start(); 
      osc.stop(this.ctx.currentTime + 0.015);
    } catch (e) {}
  }

  playWhoosh() {
    if (!this.soundEnabled) return;
    try {
      this.init(); 
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.35);
      
      gain.gain.setValueAtTime(0.008, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
      
      osc.connect(gain); 
      gain.connect(this.ctx.destination);
      
      osc.start(); 
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playSuccess() {
    try {
      this.init(); 
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(329.63, this.ctx.currentTime);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(523.25, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.005, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc1.start(); 
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.6);
      osc2.stop(this.ctx.currentTime + 0.6);
    } catch (e) {}
  }
}

const synth = new LuxuryAudioEngine();

// GIAO DIỆN CHỮ BIẾN HÌNH GIẢI MÃ MA TRẬN
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#%@$*+=-";

  const handleMouseEnter = () => {
    synth.playTick();
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration || char === " ") {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 2;
    }, 25);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cursor-pointer">
      {displayText}
    </span>
  );
};

// CẤU TRÚC CHI TIẾT KINH NGHIỆM ĐỂ BÙNG NỔ TRẢI NGHIỆM KHI CLICK MODAL
const careerImpacts = [
  {
    num: "01",
    role: "QUẢN LÝ CỬA HÀNG (STORE MANAGER)",
    company: "ALDO GO! DALAT",
    period: "2025 — 2026",
    metrics: "Giảm tỉ lệ thất thoát kho bãi xuống dưới 1%",
    highlight: "Thúc đẩy doanh thu tăng trưởng vượt mốc 15%",
    detail: "Định vị và tái cơ cấu quy trình phân phối sản phẩm dựa trên phân tích tệp khách hàng cao cấp tại địa phương. Thiết lập hệ thống vận hành và điều phối nhân sự tối ưu.",
    strategy: [
      "Kiểm soát vòng xoay hàng tồn kho (Inventory Turnover) thông qua hệ thống phân tích doanh số thời gian thực.",
      "Tối ưu sơ đồ trưng bày sản phẩm để gia tăng tỉ lệ mua kèm chéo (Uptown Cross-selling).",
      "Xây dựng chương trình đào tạo đội ngũ bán hàng tập trung hoàn toàn vào kỹ năng giải quyết khiếu nại (Resolution Skills)."
    ]
  },
  {
    num: "02",
    role: "QUẢN LÝ PHÒNG THU (STUDIO MANAGER)",
    company: "SB STUDIO",
    period: "2023 — 2024",
    metrics: "Tiết kiệm 40% tổng chi phí sản xuất",
    highlight: "Tăng trưởng hiệu suất vận hành lên đến 200%",
    detail: "Hệ thống hóa toàn bộ quy trình làm việc giữa các nghệ sĩ, đối tác truyền thông quốc tế và MCN qua các giải pháp lưu trữ thông minh giúp loại bỏ các khâu trung gian thừa thãi.",
    strategy: [
      "Lập trình cổng điều phối lịch trình thu âm tự động hóa tránh xung đột thời gian của các phòng ban kỹ thuật.",
      "Thương thảo và quản lý hợp đồng quyền tác giả cho mạng lưới hơn 50 nghệ sĩ thuộc MCN.",
      "Phát triển kế hoạch tiếp thị số thúc đẩy lưu lượng tương tác đạt hơn 4 triệu lượt tiếp cận tự nhiên."
    ]
  },
  {
    num: "03",
    role: "TRƯỞNG CA / ĐIỀU HÀNH LOGISTICS BẾP",
    company: "PHỦI STEAK",
    period: "2024 — 2025",
    metrics: "Rút ngắn 20% thời gian chờ đợi của khách",
    highlight: "Sắp xếp chuỗi cung ứng đạt mốc hoàn hảo 100%",
    detail: "Áp dụng tư duy hình học không gian vào quản trị logistics nguyên vật liệu Âu cao cấp, đảm bảo hiệu suất phục vụ liên tục trong các khung giờ áp lực lớn nhất.",
    strategy: [
      "Thiết kế sơ đồ di chuyển tuyến tính trong nhà bếp giúp loại bỏ 30% quãng đường di chuyển thừa của nhân viên.",
      "Chuẩn hóa và đồng nhất công thức làm nước sốt và áp chảo steak tiêu chuẩn châu Âu.",
      "Thương thảo chuỗi cung ứng thực phẩm nhập khẩu đảm bảo nguyên liệu đạt độ tươi ngon hoàn hảo mỗi ngày."
    ]
  }
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lastTwoDigits, setLastTwoDigits] = useState("23");
  const [showGateway, setShowGateway] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeModal, setActiveModal] = useState<typeof careerImpacts[0] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clickParticles = useRef<Particle[]>([]);

  // 1. CHU TRÌNH GIẢI MÃ SỐ CHUẨN 1:1
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const startTime = Date.now();
    const intervalTime = 40;

    synth.enableSound(true);

    const runDecoder = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < 1400) {
        const randomVal = Math.floor(Math.random() * 90 + 10).toString();
        setLastTwoDigits(randomVal);
        synth.playTick();
        timer = setTimeout(runDecoder, intervalTime);
      } else if (elapsed < 1850) {
        setLastTwoDigits("24");
        synth.playTick();
        timer = setTimeout(runDecoder, 450);
      } else if (elapsed < 2350) {
        setLastTwoDigits("25");
        synth.playTick();
        timer = setTimeout(runDecoder, 500);
      } else {
        setLastTwoDigits("26");
        synth.playTick();
        synth.playSuccess();
        setShowGateway(true);
      }
    };

    runDecoder();
    return () => clearTimeout(timer);
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

  // 3. SCROLL INTERCEPT ENGINE
  useEffect(() => {
    if (loading || activeModal) return;

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
  }, [loading, activeSlide, isScrolling, activeModal]);

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

  // 5. TOẢ SÁNG HÀO QUANG & BẮN HẠT SAO VÀNG KHI CLICK CHUỘT
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

      // HÀO QUANG TOẢ SÁNG TRUNG TÂM
      const orbX = width * 0.5 + Math.sin(tick) * 50;
      const orbY = height * 0.5 + Math.cos(tick * 0.8) * 50;
      const grad = ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, 600);
      grad.addColorStop(0, "rgba(197, 168, 128, 0.08)"); 
      grad.addColorStop(0.5, "rgba(139, 92, 246, 0.02)"); 
      grad.addColorStop(1, "rgba(28, 35, 51, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 600, 0, Math.PI * 2);
      ctx.fill();

      // VẼ VÀ CẬP NHẬT HẠT BỤI SAO VÀNG KHI USER CLICK CHUỘT (ADDDICTIVE SPLASH)
      clickParticles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015; // Giảm dần độ mờ

        if (p.alpha <= 0) {
          clickParticles.current.splice(idx, 1);
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("1)", `${p.alpha})`);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(197, 168, 128, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // THUẬT TOÁN KÍCH PHÁT BỤI SAO VÀNG KHI CLICK VÀO BẤT KỲ ĐÂU (SURPRISE INTERACTION)
  const handleGlobalClick = (e: React.MouseEvent) => {
    synth.playTick(); // Âm click mộc êm ái

    // Sinh ra 15 hạt sao phát quang bung toả từ lồng con trỏ chuột
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      clickParticles.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 2.5 + 1,
        color: i % 2 === 0 ? "rgba(197, 168, 128, 1)" : "rgba(139, 92, 246, 1)"
      });
    }
  };

  const enterPortfolio = (withSound: boolean) => {
    synth.enableSound(withSound); 
    if (withSound) {
      synth.startAmbientMusic();
    }
    setLoading(false);
  };

  return (
    <div 
      onClick={handleGlobalClick}
      className="relative h-screen w-screen overflow-hidden bg-[#1D2436] text-[#FAF8F5]"
    >
      
      {/* CANVAS HÀO QUANG & HẠT CLICK */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* 375 STUDIO PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#1D2436] text-[#FAF8F5] z-[9999] flex flex-col justify-center items-center font-sans"
          >
            <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.12)_0%,transparent_60%)] pointer-events-none" />

            <div className="text-center space-y-12 z-10">
              <div className="flex items-center justify-center font-black tracking-tighter text-[#FAF8F5] select-none font-sans uppercase text-7xl md:text-[10rem] leading-none absolute top-12">
                <span>20</span>
                <span>{lastTwoDigits}</span>
              </div>

              <div className="absolute bottom-4 w-full flex justify-center">
                <AnimatePresence>
                  {showGateway && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                      <button 
                        onClick={() => enterPortfolio(true)}
                        className="px-8 py-3.5 border border-[#C5A880] rounded-full text-xs font-mono tracking-widest uppercase hover:bg-[#C5A880] hover:text-[#1D2436] transition-all duration-300 bg-transparent text-[#C5A880]"
                      >
                        ENTER WITH MUSIC
                      </button>
                      <button 
                        onClick={() => enterPortfolio(false)}
                        className="px-8 py-3.5 border border-white/20 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-[#1D2436] transition-all duration-300 bg-transparent text-white/70"
                      >
                        ENTER WITHOUT MUSIC
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="h-full w-full relative z-20">
          
          {/* HEADER NAV CHỮ BIẾN HÌNH */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-[#1D2436]/80 backdrop-blur-md">
            <span className="font-serif-luxury italic font-medium tracking-tight text-xl text-[#C5A880]">
              <ScrambleText text="POSTLAIN*" />
            </span>
            <div className="flex gap-4 items-center font-sans text-[9px] tracking-[0.25em] text-[#C5A880] uppercase">
              <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
              <span>STAGE // 0{activeSlide + 1}</span>
            </div>
          </nav>

          {/* CHỈ BÁO TRANG PHÍA BÊN PHẢI */}
          <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[80] flex flex-col gap-8 hidden md:flex border-l border-white/5 pl-4 py-8">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx}
                onClick={() => { synth.playWhoosh(); setActiveSlide(idx); }}
                className="group flex items-center justify-end gap-4 relative"
              >
                <span className="font-sans text-[9px] tracking-[0.3em] opacity-30 group-hover:opacity-100 text-white transition-opacity duration-300">
                  <ScrambleText text={`STAGE_0${idx + 1}`} />
                </span>
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? "bg-[#C5A880] scale-[2]" : "bg-white/20"}`} />
              </button>
            ))}
          </div>

          {/* DÒNG TIẾN TRÌNH Ở CHÂN TRANG */}
          <div className="fixed bottom-8 left-8 z-50 font-sans text-[8px] tracking-[0.3em] uppercase opacity-30 flex items-center gap-6">
             <div className="flex gap-1 items-center">
               <ArrowUp size={10} className="text-[#C5A880]" />
               <div className="w-8 h-[1px] bg-white/20" />
               <ArrowDown size={10} className="text-[#C5A880]" />
             </div>
             <span>Lăn chuột hoặc dùng phím mũi tên để xem các phần</span>
          </div>

          {/* MODAL CHI TIẾT CHIẾN LƯỢC BÙNG NỔ TRẢI NGHIỆM KHI USER CLICK (SURPRISE GATE) */}
          <AnimatePresence>
            {activeModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#1D2436]/95 z-[999] flex items-center justify-center p-6 backdrop-blur-md"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 30 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="bg-[#111111] border border-white/10 p-8 md:p-12 rounded-[40px] max-w-2xl w-full text-left relative shadow-2xl overflow-y-auto max-h-[85vh] scrollbar-none"
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); synth.playTick(); setActiveModal(null); }}
                    className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-[#FAF8F5] hover:text-black transition-all"
                  >
                    <X size={18} />
                  </button>

                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest">{activeModal.company} // {activeModal.period}</span>
                  <h3 className="text-4xl font-serif-luxury font-bold text-[#FAF8F5] mt-4 mb-2 uppercase italic">{activeModal.role}</h3>
                  <p className="text-sm text-[#C5A880] font-mono mb-8 font-bold tracking-wider">{activeModal.metrics} • {activeModal.highlight}</p>
                  
                  <div className="space-y-6">
                    <h5 className="font-sans text-xs font-bold uppercase tracking-widest text-[#FAF8F5] flex items-center gap-2 border-b border-white/5 pb-2">
                      <Sparkles size={14} className="text-[#C5A880]"/> KỊCH BẢN TỐI ƯU HÓA HOÀN MỸ
                    </h5>
                    <ul className="space-y-4">
                      {activeModal.strategy.map((item, idx) => (
                        <li key={idx} className="flex gap-4 items-start text-xs text-zinc-400 leading-relaxed italic font-serif-luxury">
                          <span className="text-[#C5A880] font-sans">0{idx + 1} —</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ANMATE PRESENCE CÁC SLIDES CHUYỂN CẢNH */}
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
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#C5A880]">
                        <ScrambleText text="Creative Operations Architect" />
                      </span>
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
                          <h4 className="text-lg font-medium font-serif-luxury text-[#FAF8F5] uppercase tracking-tight">Giải Pháp Công Nghệ</h4>
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
                  <span className="font-sans text-[8px] tracking-[0.25em] text-zinc-500 uppercase">// DỮ LIỆU CASE STUDIES THỰC TIỄN (NHẤP CHUỘT VÀO THẺ ĐỂ KHÁM PHÁ) //</span>
                  <span className="font-sans text-[9px] text-[#C5A880] font-bold tracking-widest flex items-center gap-2">RECRUITER OVERVIEW</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto items-center">
                  {careerImpacts.map((item, idx) => (
                    <div 
                      key={idx}
                      onMouseMove={handle3DTilt}
                      onMouseLeave={reset3DTilt}
                      onClick={(e) => { e.stopPropagation(); synth.playSuccess(); setActiveModal(item); }}
                      className="bg-[#1C2333] border border-white/5 p-10 rounded-[36px] shadow-sm flex flex-col justify-between h-[440px] cursor-pointer group scan-glow transition-all duration-300"
                    >
                       <div className="flex justify-between items-start">
                          <span className="font-serif-luxury text-5xl font-light text-stroke-gold group-hover:text-[#C5A880] transition-all italic">{item.num}</span>
                          <span className="font-sans text-[8px] bg-[#C5A880]/10 px-3 py-1.5 rounded-full text-[#C5A880] uppercase tracking-wider font-bold">{item.period}</span>
                       </div>
                       <div>
                          <p className="font-sans text-[8px] text-zinc-500 uppercase tracking-widest mb-1">{item.company}</p>
                          <h4 className="text-xl font-serif-luxury font-bold tracking-tight text-[#FAF8F5] uppercase leading-tight mb-4">
                            <ScrambleText text={item.role} />
                          </h4>
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
                className="absolute inset-0 h-full w-full flex flex-col justify-between pt-40 p-8 md:p-24 bg-[#0a0a0a]"
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
