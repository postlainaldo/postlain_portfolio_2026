"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Instagram, Music, ArrowDown, ArrowRight, Bot, Layout, Zap } from 'lucide-react';
import Lenis from '@studio-freight/lenis';
import Magnetic from '@/components/Magnetic';

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const experiences = [
    { title: "STORE MANAGER", place: "ALDO GO! ĐÀ LẠT", tech: "RETAIL OPERATIONS", date: "2025—2026" },
    { title: "STUDIO MANAGER", place: "SB STUDIO", tech: "ARTISTIC MARKETING", date: "2023—2024" },
    { title: "KITCHEN CAPTAIN", place: "PHỦI STEAK", tech: "TEAM ORCHESTRATION", date: "2024—2025" }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-[#e0e0e0] overflow-hidden">
      <div className="bg-glow" />

      {/* HEADER NAVIGATION */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-8 z-[100] backdrop-blur-3xl mix-blend-difference">
        <Magnetic><span className="font-black text-xl tracking-tighter uppercase cursor-pointer italic">POSTLAIN.</span></Magnetic>
        <div className="flex gap-10 font-mono text-[10px] tracking-[0.3em] uppercase opacity-40 md:flex hidden">
          <Magnetic><a href="#experience" className="hover:opacity-100 transition">Works</a></Magnetic>
          <Magnetic><a href="#about" className="hover:opacity-100 transition">About</a></Magnetic>
          <Magnetic><a href="mailto:studionopu@gmail.com" className="hover:opacity-100 transition text-blue-500">Contact</a></Magnetic>
        </div>
      </nav>

      {/* HERO: CINEMATIC OPENING */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-24 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 100 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[1em] mb-12 opacity-30">// 022_MANAGER_&_TECH_ARTIST</p>
          <h1 className="text-[12vw] font-black leading-[0.85] font-space tracking-tighter flex flex-col">
            <span>NGÔ</span>
            <span className="flex items-center">
              PHÚC 
              <motion.span 
                initial={{ width: 0 }} 
                animate={{ width: "18vw" }} 
                transition={{ duration: 1.5, delay: 0.5 }} 
                className="h-[1vw] bg-blue-600 ml-4 inline-block hidden md:block" 
              />
            </span>
          </h1>
          <h2 className="text-[12vw] font-black leading-[0.85] font-space italic text-transparent stroke-white" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}>POSTLAIN</h2>
        </motion.div>

        {/* BOTTOM SOCIALS & STATS */}
        <div className="absolute bottom-16 left-6 md:left-24 flex items-end gap-16">
          <div className="flex gap-4">
             {[
               { icon: <Music size={16}/>, url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
               { icon: <Youtube size={16}/>, url: "https://youtube.com/@postlain" },
               { icon: <Instagram size={16}/>, url: "https://www.instagram.com/postlainagain" }
             ].map((soc, i) => (
               <Magnetic key={i}>
                 <a href={soc.url} target="_blank" className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                    {soc.icon}
                 </a>
               </Magnetic>
             ))}
          </div>
          <p className="hidden md:block max-w-[200px] text-[10px] font-mono opacity-20 uppercase tracking-[0.2em] leading-relaxed">
            Biến logic thành trải nghiệm thông qua nghệ thuật và tự động hóa AI.
          </p>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-16 right-24 opacity-30 hidden md:block">
           <ArrowDown size={30} />
        </motion.div>
      </section>

      {/* CORE EXPERTISE - BOLD GRIDS */}
      <section className="py-40 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="aspect-video bg-[#0a0a0a] rounded-3xl p-12 flex flex-col justify-between border border-white/5 hover:border-blue-600/30 transition-all duration-500 group">
              <Bot size={48} className="group-hover:text-blue-500 group-hover:scale-110 transition-all" />
              <div>
                <h4 className="text-sm font-mono opacity-40 mb-4 tracking-[0.5em] uppercase">// 01 — AUTOMATION</h4>
                <h3 className="text-4xl font-black italic tracking-tighter">PHÁT TRIỂN <span className="text-blue-600">AI</span></h3>
                <p className="text-zinc-500 mt-6 max-w-sm">Tự động hoá quản trị nhân sự và quy trình doanh nghiệp hiện đại.</p>
              </div>
           </div>
           <div className="aspect-video bg-blue-600 rounded-3xl p-12 flex flex-col justify-between border border-blue-600">
              <Zap size={48} />
              <div className="text-white">
                <h4 className="text-sm font-mono opacity-70 mb-4 tracking-[0.5em] uppercase text-blue-200">// 02 — OPERATIONS</h4>
                <h3 className="text-4xl font-black italic tracking-tighter uppercase">Quản Lý & Điều Phối</h3>
                <p className="text-blue-100 mt-6 max-w-sm">Duy trì và truyền lửa đội ngũ với năng lực quan sát nhạy bén.</p>
              </div>
           </div>
        </div>
      </section>

      {/* HORIZONTAL EXPERIENCE REVEAL */}
      <section id="experience" className="py-40">
        <div className="px-6 md:px-24 mb-32 flex justify-between items-end">
           <div>
             <span className="text-blue-600 font-mono tracking-widest text-xs">PROJECTS_&_HISTORY</span>
             <h3 className="text-7xl font-black uppercase mt-4 italic font-space tracking-tighter leading-none">Chặng Đường</h3>
           </div>
           <ArrowRight size={80} className="opacity-10 hidden md:block" />
        </div>

        <div className="space-y-[1px] border-t border-b border-white/10 bg-white/5">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group hover:bg-white flex flex-col md:flex-row justify-between p-12 md:px-24 items-start md:items-center transition-all duration-700 cursor-none">
              <div className="relative overflow-hidden group-hover:translate-x-10 transition-all duration-500">
                 <p className="font-mono text-[10px] text-blue-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">{exp.date}</p>
                 <h4 className="text-4xl md:text-6xl font-black font-space tracking-tighter group-hover:text-black uppercase italic transition-colors">
                    {exp.title}
                 </h4>
              </div>
              <div className="text-left md:text-right mt-6 md:mt-0 transition-all duration-500 group-hover:-translate-x-10">
                 <p className="text-lg md:text-xl font-bold group-hover:text-black uppercase leading-tight tracking-tight">{exp.place}</p>
                 <p className="text-sm font-mono opacity-40 group-hover:opacity-100 group-hover:text-blue-600 transition-all tracking-[0.2em] mt-2 uppercase">{exp.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER: THE CONTACT DROP */}
      <footer className="h-[70vh] flex items-center justify-center relative overflow-hidden px-6 text-center">
         <motion.div 
            initial={{ scale: 1 }}
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="cursor-pointer"
          >
            <span className="text-xs uppercase tracking-[0.8em] font-mono opacity-40 mb-12 block leading-loose">Bạn đang tìm kiếm sự khác biệt?</span>
            <a href="mailto:studionopu@gmail.com" className="text-[12vw] md:text-[9vw] font-black italic tracking-tighter border-b-[5px] md:border-b-[15px] border-blue-600 leading-none">LET'S BUILD</a>
         </motion.div>

         <div className="absolute bottom-10 w-full flex justify-between px-24 opacity-10 text-[10px] tracking-widest font-mono">
            <span>// DA LAT / VIETNAM</span>
            <span>0938-649-420</span>
            <span>POSTLAIN © 2026</span>
         </div>
      </footer>
    </div>
  );
}
