"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Music, Youtube, Instagram, Grid, List, CheckCircle2, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';

// ----------------------------------------------------
// BỘ TỔNG HỢP ÂM TẦN KỸ THUẬT SỐ (REAL-TIME FM SYNTHESIZER)
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
    osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.04);
  }
  playSuccess() {
    this.init(); if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
  }
}

const synth = new TechSynth();

// ----------------------------------------------------
// COMPONENT MAGNETIC CHUYỂN ĐỘNG NAM CHÂM SIÊU MƯỢT
// ----------------------------------------------------
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };
  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => synth.playTick()}
      className="transition-transform duration-300 ease-out inline-block"
    >
      {children}
    </div>
  );
};

// DATA DANH MỤC JSON LƯU TRỮ PROFILE CỦA PHÚC
const projectDatabase = [
  { id: "p1", category: "AI & TECH", company: "POSTLAIN CORE", role: "AI Software Creator", detail: "Phát triển các dòng mã tự động điều phối nhân sự, tích hợp API ngôn ngữ lớn.", metrics: "Logic // 98%" },
  { id: "p2", category: "MANAGEMENT", company: "ALDO GO! DALAT", role: "Store Manager", detail: "Quản lý dòng sản phẩm retail, kiểm soát kho bãi tự động và tối ưu hóa nhân lực.", metrics: "Efficiency // +24%" },
  { id: "p3", category: "MEDIA & ART", company: "SB STUDIO", role: "Studio Director", detail: "Điều hành dự án sản xuất truyền thông, quản lý nghệ sĩ và đối tác truyền thông quốc tế.", metrics: "Reach // 4M+" },
  { id: "p4", category: "LOGISTICS", company: "PHUI STEAK", role: "Kitchen Captain / Chef", detail: "Quản trị quy trình chế biến, giám sát phân bổ chuỗi cung ứng thực phẩm tươi.", metrics: "Performance // 100%" }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "blueprint">("blueprint");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. CHẠY CONSOLE LOADING GIẢ LẬP ĐẲNG CẤP CAO
  useEffect(() => {
    const logs = [
      "Initializing Postlain OS Kernel v2.8...",
      "Connecting to Da Lat, VN Node 1002...",
      "Mapping AI System Frameworks...",
      "Synthesizing mechanical audio layers...",
      "Verifying structural grids...",
      "System initialized successfully. Welcome Ngô Phúc."
    ];
    let logIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          synth.playSuccess();
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        if (prev % 15 === 0 && logIndex < logs.length) {
          setConsoleLogs((p) => [...p, `[SYS_LOG]: ${logs[logIndex]}`]);
          logIndex++;
          synth.playTick();
        }
        return prev + 1;
      });
    }, 30);
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

  // 3. ĐỒ HỌA MẠNG LƯỚI NƠ-RON TƯƠNG TÁC (CANVAS WEBGL/2D PHYSICS ENGINE)
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Vẽ các nút mạng nơ-ron
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Bắt dính chuột nhẹ
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          p.x += dx * 0.01;
          p.y += dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
        ctx.fill();

        // Vẽ các mối liên kết mạng logic
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [loading]);

  const filteredProjects = activeFilter === "ALL" 
    ? projectDatabase 
    : projectDatabase.filter(p => p.category === activeFilter);

  return (
    <div className="relative min-h-screen selection:bg-purple-600 selection:text-white overflow-hidden">
      
      {/* 1. LAYER CANVAS ĐỒ HỌA MẠNG LƯỚI LOGIC BIỂU DIỄN AI */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 opacity-70" />

      {/* 2. CHƯƠNG TRÌNH PRELOADER HỆ THỐNG PHỨC TẠP CỦA CHUYÊN GIA */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#141414] text-white z-[9999] flex flex-col justify-between p-8 font-mono"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="flex items-center gap-2 text-xs text-purple-400">
                <Cpu size={14} className="animate-spin" /> POSTLAIN OS INITIALIZING_
              </span>
              <span className="text-xs opacity-50">LOCATION: DA LAT, VN</span>
            </div>

            <div className="max-w-xl self-start flex flex-col gap-2 text-[10px] opacity-70">
              {consoleLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-purple-400">&gt;</span> {log}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <h2 className="text-4xl font-bold tracking-tighter">NGÔ PHÚC®</h2>
                <span className="text-7xl font-light text-purple-400">{progress}%</span>
              </div>
              <div className="w-full bg-white/5 h-1 overflow-hidden relative rounded-full">
                <motion.div 
                  className="bg-purple-500 h-full rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. TOÀN BỘ WEBSITE CHÍNH */}
      {!loading && (
        <div className="design-grid-bg min-h-screen relative z-20">
          
          {/* HEADER NAV */}
          <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b border-[#141414]/5 bg-[#FAF8F5]/70 backdrop-blur-md">
            <MagneticWrapper>
              <span className="font-space font-black tracking-tighter text-2xl cursor-pointer">POSTLAIN*</span>
            </MagneticWrapper>
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Status: Automated</span>
            </div>
          </nav>

          {/* HERO SECTION */}
          <section className="min-h-screen flex flex-col justify-between pt-40 px-6 md:px-12 relative border-b border-[#141414]/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal size={14} className="text-purple-600" />
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-purple-600">Postlain Operational Core v2.0</span>
                </div>
                <h1 className="text-[11vw] md:text-[8vw] font-black font-space leading-[0.85] tracking-[-0.06em] uppercase">
                  MANAGEMENT<br />
                  <span className="italic font-light text-zinc-400">ENGINEERED</span><br />
                  WITH AI.
                </h1>
              </div>
              <div className="md:col-span-4 md:text-right md:pt-14">
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.3em] mb-4">SPECIFICATIONS // INPUTS</p>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-sm md:ml-auto">
                  Vận hành và chuyển dịch các mắt xích quản lý bằng lập trình tư duy, tích hợp tác vụ AI vào từng khâu quản trị thực tế.
                </p>
              </div>
            </div>

            {/* Panel Hệ Thống */}
            <div className="border-t border-[#141414]/5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              <div>
                <p className="text-zinc-400 mb-1">AUTOMATION</p>
                <p className="font-bold text-[#141414]">100% PROGRAMMED</p>
              </div>
              <div>
                <p className="text-zinc-400 mb-1">INTERACTIVE AUDIO</p>
                <p className="font-bold text-purple-600">FM SYNTH ACTIVE</p>
              </div>
              <div>
                <p className="text-zinc-400 mb-1">MATRIX BG</p>
                <p className="font-bold text-[#141414]">EUCLIDEAN ALGORITHM</p>
              </div>
              <div className="text-right flex justify-end items-end gap-2">
                <span>SCROLL TO SYSTEM MATRIX</span>
                <ArrowUpRight size={14} className="text-purple-600" />
              </div>
            </div>
          </section>

          {/* DYNAMIC CATALOG (Sự phức tạp về tính năng và dữ liệu) */}
          <section className="py-32 px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-[#141414]/5 pb-8">
              <div>
                <p className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest">// SYSTEM INDEX</p>
                <h2 className="text-5xl font-space font-black tracking-tighter uppercase mt-2">Dữ Liệu Vận Hành</h2>
              </div>
              
              {/* BỘ LỌC DỮ LIỆU ĐỘNG (INTERACTIVE FILTERS) */}
              <div className="flex flex-wrap gap-2">
                {["ALL", "AI & TECH", "MANAGEMENT", "MEDIA & ART", "LOGISTICS"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => { synth.playTick(); setActiveFilter(filter); }}
                    className={`px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all ${
                      activeFilter === filter 
                        ? "bg-[#141414] text-white" 
                        : "bg-white border border-[#141414]/5 text-zinc-500 hover:bg-zinc-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* BỘ CHUYỂN ĐỔI CHẾ ĐỘ VIEW (VIEW MODE SYSTEM) */}
              <div className="flex gap-1 bg-white border border-[#141414]/5 p-1 rounded-full hidden md:flex">
                <button 
                  onClick={() => { synth.playTick(); setViewMode("blueprint"); }}
                  className={`p-2 rounded-full transition-colors ${viewMode === "blueprint" ? "bg-purple-600 text-white" : "text-zinc-400"}`}
                >
                  <List size={14} />
                </button>
                <button 
                  onClick={() => { synth.playTick(); setViewMode("grid"); }}
                  className={`p-2 rounded-full transition-colors ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-zinc-400"}`}
                >
                  <Grid size={14} />
                </button>
              </div>
            </div>

            {/* KHÔNG GIAN HIỂN THỊ MORPHING CARDS */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    key={p.id}
                    className={`bg-white border border-[#141414]/5 p-8 rounded-[32px] flex flex-col justify-between hover:shadow-2xl hover:border-purple-600/25 transition-all duration-500 ${
                      viewMode === "blueprint" ? "md:col-span-12 flex-row items-center" : "md:col-span-6 h-[400px]"
                    }`}
                  >
                    <div className="flex gap-6 items-start">
                      <div className="p-3 bg-purple-50 rounded-2xl">
                        {p.category === "AI & TECH" ? <Cpu className="text-purple-600" /> : <CheckCircle2 className="text-zinc-400" />}
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-purple-600 uppercase tracking-widest">{p.category}</span>
                        <h3 className="text-2xl font-space font-bold text-[#141414] mt-2">{p.company}</h3>
                        <p className="text-sm font-mono text-zinc-400 uppercase tracking-wider mt-1">{p.role}</p>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-xl mt-4">{p.detail}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between h-full pt-4 md:pt-0">
                      <span className="font-mono text-xs font-bold text-[#141414] bg-zinc-100 px-3 py-1 rounded-full">{p.metrics}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </section>

          {/* SOCIAL NETWORK LINKS */}
          <section className="py-40 border-t border-[#141414]/5">
            <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Music />, title: "Spotify Artist", info: "POSTLAIN", url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                { icon: <Youtube />, title: "YouTube Node", info: "@postlain", url: "https://youtube.com/@postlain" },
                { icon: <Instagram />, title: "Insta Feed", info: "@postlainagain", url: "https://www.instagram.com/postlainagain" }
              ].map((social, idx) => (
                <MagneticWrapper key={idx}>
                  <a href={social.url} target="_blank" className="p-8 border border-[#141414]/5 bg-white rounded-[32px] flex justify-between items-center hover:bg-zinc-50 hover:border-purple-600/10 transition-all w-full">
                    <div className="flex gap-4 items-center">
                      <div className="text-purple-600">{social.icon}</div>
                      <div>
                        <h4 className="font-space font-bold text-lg text-[#141414]">{social.title}</h4>
                        <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">{social.info}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-zinc-300" />
                  </a>
                </MagneticWrapper>
              ))}
            </div>
          </section>

          {/* SYSTEM FOOTER */}
          <footer className="py-32 px-6 md:px-12 border-t border-[#141414]/5 bg-white text-black">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-mono text-[9px] tracking-[0.6em] text-purple-600 uppercase block mb-6">// ENTER_SYS_CORE</span>
              <MagneticWrapper>
                <a 
                  href="mailto:studionopu@gmail.com" 
                  className="text-[9vw] md:text-[6vw] font-black font-space leading-none tracking-tighter hover:text-purple-600 transition-colors border-b-4 border-[#141414] pb-2 inline-block"
                >
                  STUDIONOPU@GMAIL.COM
                </a>
              </MagneticWrapper>
              
              <div className="mt-32 pt-12 border-t border-[#141414]/10 flex flex-col md:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-widest text-zinc-400 gap-6">
                <span>SYSTEM REGION: DALAT, VN</span>
                <span>All assets automated // v2.8</span>
                <span>© NGÔ PHÚC 2026</span>
              </div>
            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
