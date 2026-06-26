"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Music, ArrowDown, Bot, Zap, Globe } from 'lucide-react';
import Lenis from 'lenis';
import Magnetic from '../components/Magnetic';

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const experiences = [
    { title: "ALDO GO! DALAT", role: "STORE MANAGER", detail: "6/2025 - 4/2026 • Retail Excellence", icon: <Globe size={24}/> },
    { title: "SB STUDIO", role: "STUDIO MANAGER", detail: "3/2023 - 10/2024 • Artistic Management", icon: <Music size={24}/> },
    { title: "PHUI STEAK", role: "KITCHEN CAPTAIN", detail: "10/2024 - 6/2025 • Operational Logic", icon: <Zap size={24}/> }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-[#e0e0e0]">
      <div className="bg-glow" />

      {/* HEADER NAVIGATION */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-8 z-[100] mix-blend-difference">
        <Magnetic>
          <span className="font-black text-2xl tracking-tighter uppercase cursor-pointer italic">POSTLAIN.</span>
        </Magnetic>
        <div className="flex gap-10 font-mono text-[10px] tracking-[0.3em] uppercase opacity-40">
          <Magnetic>
            <a href="mailto:studionopu@gmail.com" className="hover:opacity-100 transition text-blue-500 underline underline-offset-8">Inquire Project</a>
          </Magnetic>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-24 relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 50 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-blue-600" />
            <p className="font-mono text-[10px] tracking-[1em] opacity-30 uppercase">Operational Strategist</p>
          </div>
          
          <h1 className="text-[14vw] md:text-[11vw] font-black leading-[0.8] tracking-tighter flex flex-col uppercase">
            <span className="hover:italic transition-all duration-700">NGÔ PHÚC</span>
            <span className="stroke-text">POSTLAIN</span>
          </h1>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
             <div className="max-w-[480px]">
                <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed">
                  "Sắp xếp thế giới bằng <span className="text-white font-medium italic">Logic</span>, vận hành tương lai bằng <span className="text-blue-500 font-medium italic">AI Automation</span>."
                </p>
             </div>
             
             <div className="flex gap-4">
               {[
                 { icon: <Music />, url: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                 { icon: <Youtube />, url: "https://youtube.com/@postlain" },
                 { icon: <Instagram />, url: "https://www.instagram.com/postlainagain" }
               ].map((soc, i) => (
                 <Magnetic key={i}>
                   <a href={soc.url} target="_blank" className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                      {soc.icon}
                   </a>
                 </Magnetic>
               ))}
             </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
          className="absolute bottom-12 right-24 opacity-20 hidden md:block"
        >
           <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* SERVICES / CORE */}
      <section className="py-40 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-[#080808] border border-white/5 p-16 rounded-[48px] flex flex-col justify-between h-[500px] group overflow-hidden relative"
           >
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-all" />
              <Bot size={48} className="text-blue-500 relative z-10" />
              <div className="relative z-10">
                <h4 className="font-mono text-blue-600 text-xs mb-4 uppercase tracking-[0.4em]">// System Design</h4>
                <h3 className="text-5xl font-black italic uppercase leading-none tracking-tighter">AI AGENT DEVELOPMENT</h3>
                <p className="text-zinc-500 mt-8 text-lg font-light leading-relaxed">Xây dựng giải pháp tự động hoá, tối ưu hoá nhân lực qua công nghệ AI Agent.</p>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-blue-600 p-16 rounded-[48px] flex flex-col justify-between h-[500px] overflow-hidden relative group"
           >
              <Zap size={48} className="text-white relative z-10" />
              <div className="relative z-10 text-white">
                <h4 className="font-mono text-blue-200 text-xs mb-4 uppercase tracking-[0.4em]">// Leadership</h4>
                <h3 className="text-5xl font-black italic uppercase leading-none tracking-tighter">CREATIVE MANAGEMENT</h3>
                <p className="text-blue-100 mt-8 text-lg font-light leading-relaxed">Khả năng điều phối nghệ sĩ, nhân sự Retail và giữ vững KPI hệ thống.</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* EXPERIENCE LIST */}
      <section className="py-40 border-t border-white/5">
        <div className="px-6 md:px-24 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-8xl md:text-[10vw] font-black uppercase italic leading-none tracking-tighter">THE JOURNEY</h2>
          <div className="max-w-[300px] opacity-40 font-mono text-[10px] uppercase tracking-widest leading-loose text-right">
             Quá trình chuyển dịch từ quản lý dịch vụ sang tư duy hệ thống.
          </div>
        </div>

        <div className="group/list">
           {experiences.map((exp, i) => (
             <motion.div 
               key={i}
               className="relative py-14 px-6 md:px-24 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:bg-white cursor-none overflow-hidden"
             >
                <div className="flex items-center gap-12 relative z-10 transition-all duration-700">
                   <span className="text-blue-500 font-mono text-xl group-hover:text-black transition-colors italic">0{i+1}</span>
                   <div>
                     <h4 className="text-4xl md:text-7xl font-black italic text-zinc-300 group-hover:text-black transition-all uppercase tracking-tighter">
                        {exp.title}
                     </h4>
                     <p className="font-mono text-[10px] text-zinc-500 group-hover:text-blue-600 uppercase mt-4 tracking-[0.3em]">
                        {exp.detail}
                     </p>
                   </div>
                </div>
                <div className="text-left md:text-right mt-10 md:mt-0 relative z-10">
                  <h5 className="text-2xl font-bold text-zinc-500 group-hover:text-black uppercase italic tracking-tight">{exp.role}</h5>
                  <div className="opacity-0 group-hover:opacity-30 mt-6 transition-all text-black">
                     {exp.icon}
                  </div>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-4 mt-20">
         <div className="bg-white text-black rounded-[60px] md:rounded-[100px] py-40 md:py-60 px-6 text-center overflow-hidden">
            <motion.div whileHover={{ scale: 0.98 }} className="transition-all duration-700">
              <p className="text-[10px] uppercase font-mono tracking-[0.6em] mb-16 opacity-40">Let's talk about the future</p>
              <a href="mailto:studionopu@gmail.com" className="text-[14vw] font-black uppercase italic leading-[0.8] tracking-tighter hover:text-blue-600 transition-colors border-b-[6px] md:border-b-[18px] border-black pb-4 inline-block">
                 CONNECT.
              </a>
            </motion.div>

            <div className="mt-60 grid md:grid-cols-3 gap-16 px-10 md:px-20 text-[10px] uppercase font-mono tracking-widest opacity-40">
               <div className="flex flex-col gap-3 md:text-left">
                  <span>Dalat, Lâm Đồng — VN</span>
                  <span>+84 938-649-420</span>
               </div>
               <div className="flex flex-col gap-3">
                  <span className="font-bold italic">POSTLAIN Portfolio V2</span>
                  <span>Code & Design by Expert-Agent</span>
               </div>
               <div className="flex flex-col gap-3 md:text-right italic underline underline-offset-4 decoration-blue-600">
                  <a href="#hero">Back to top ↑</a>
               </div>
            </div>
         </div>
         <div className="py-12 text-center text-[10px] font-mono tracking-[1.5em] opacity-20 uppercase">
            Built with GSAP — Framer — NextJS
         </div>
      </footer>
    </div>
  );
}
