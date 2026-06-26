"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Bot, Mic, Monitor, HelpCircle } from 'lucide-react';
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

  // Bộ phát âm thanh trượt (whoosh) nhẹ khi cuộn hoặc lướt qua card
  const playSweepSound = () => {
    if (typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const experiences = [
    { num: "01", title: "ALDO GO! DALAT", role: "STORE MANAGER", tag: "Operations", desc: "Quản trị chuỗi retail, tối ưu quy trình kho và nhân sự dựa trên dữ liệu thực tế." },
    { num: "02", title: "SB STUDIO", role: "STUDIO MANAGER", tag: "Artistic", desc: "Định hướng marketing, chăm sóc đối tác MCN lớn, điều phối sản xuất nghệ thuật." },
    { num: "03", title: "PHUI STEAK", role: "KITCHEN CAPTAIN", tag: "Logistics", desc: "Sắp xếp quy trình bếp đạt hiệu suất cao nhất trong các khung giờ áp lực." }
  ];

  return (
    <div className="min-h-screen relative font-sans">
      
      {/* HEADER: Kẻ Line cực mỏng */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 border-b hairline backdrop-blur-md bg-[#F5F2EB]/80">
        <Magnetic>
          <span className="font-space font-bold tracking-[-0.08em] text-lg cursor-pointer">POSTLAIN*</span>
        </Magnetic>
        <div className="flex gap-8 items-center text-[10px] font-mono tracking-widest uppercase opacity-60">
          <Magnetic><a href="mailto:studionopu@gmail.com" className="hover:opacity-100 transition text-[#7C3AED]">Get in touch</a></Magnetic>
        </div>
      </header>

      {/* HERO SECTION: Phong cách Typographic của 28K */}
      <section className="min-h-screen pt-32 flex flex-col justify-between px-6 md:px-12 relative border-b hairline">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-10">
          <div className="md:col-span-8">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#7C3AED] uppercase block mb-6">/ EST. 2026</span>
            <h1 className="text-[10vw] md:text-[7.5vw] font-bold font-space leading-[0.9] tracking-[-0.06em] text-[#141414]">
              DESIGNING <br />
              <span className="italic font-light text-zinc-500">OPERATIONAL</span> <br />
              SYSTEMS.
            </h1>
          </div>
          <div className="md:col-span-4 md:text-right pt-4">
             <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-2">SPECS // LOGIC // ART</p>
             <p className="text-sm text-zinc-600 leading-relaxed max-w-xs md:ml-auto">
               Dựa trên tư duy logic tự động hoá của AI và sự nhạy bén của một người làm quản lý nghệ thuật.
             </p>
          </div>
        </div>

        {/* Khối Panel lớn ở cuối màn Hero */}
        <div className="border-t hairline py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
           <div>
              <p className="text-zinc-400 mb-1">01 / ROLE</p>
              <p className="font-bold text-[#141414]">SYSTEMS MANAGER</p>
           </div>
           <div>
              <p className="text-zinc-400 mb-1">02 / CORE</p>
              <p className="font-bold text-[#141414]">AI INTEGRATION</p>
           </div>
           <div>
              <p className="text-zinc-400 mb-1">03 / SOUND</p>
              <p className="font-bold text-[#7C3AED]">ACTIVE INTERACTIVE</p>
           </div>
           <div className="text-right flex justify-end items-end gap-2 text-zinc-400">
              <span>Scroll to navigate</span>
              <ArrowUpRight size={14} />
           </div>
        </div>
      </section>

      {/* CORE EXPERTISE: Bản vẽ thiết kế Grid của 375.studio */}
      <section className="py-32 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#141414]/5">
         
         <div 
           onMouseEnter={playSweepSound}
           className="bg-[#F5F2EB] p-12 flex flex-col justify-between h-[450px] border-r hairline group relative overflow-hidden"
         >
            <Bot size={36} className="text-[#7C3AED] relative z-10" />
            <div className="relative z-10">
               <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest">SYSTEM // 01</span>
               <h3 className="text-4xl font-space font-bold mt-4 mb-4 tracking-tighter text-[#141414]">Tự Động Hoá AI</h3>
               <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                  Triển khai các kịch bản AI tự động xử lý và tối ưu hóa hệ thống quản trị, giảm tải 80% công tác thủ công.
               </p>
            </div>
         </div>

         <div 
           onMouseEnter={playSweepSound}
           className="bg-[#F5F2EB] p-12 flex flex-col justify-between h-[450px] group relative overflow-hidden"
         >
            <Zap size={36} className="text-[#7C3AED] relative z-10" />
            <div className="relative z-10">
               <span className="font-mono text-[9px] uppercase text-zinc-400 tracking-widest">PEOPLE // 02</span>
               <h3 className="text-4xl font-space font-bold mt-4 mb-4 tracking-tighter text-[#141414]">Điều Phối & Giữ Lửa</h3>
               <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                  Năng lực quan sát sắc bén, gắn kết toàn bộ nhân sự và đưa hiệu năng đội ngũ đạt mốc tối đa.
               </p>
            </div>
         </div>

      </section>

      {/* TIMELINE / ARCHIVE: Phong cách bảng điểm của 28K */}
      <section className="py-40 px-6 md:px-12 bg-[#F3EFE9]">
         <div className="mb-24 flex justify-between items-end border-b hairline pb-6">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Selected Works Archive</span>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">2023—2026</span>
         </div>

         <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 0.99 }}
                onMouseEnter={playSweepSound}
                className="bg-[#F5F2EB] p-10 md:p-14 rounded-[32px] border border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-2xl transition-all duration-500 cursor-none"
              >
                 <div className="flex gap-10 items-start">
                    <span className="font-mono text-xs text-[#7C3AED] pt-1">{exp.num}</span>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-space font-bold text-[#141414] tracking-tight">{exp.title}</h3>
                      <p className="font-mono text-[10px] text-zinc-400 uppercase mt-2 tracking-widest">{exp.role} • {exp.tag}</p>
                    </div>
                 </div>
                 <div className="mt-6 md:mt-0 max-w-sm">
                    <p className="text-sm text-zinc-500 leading-relaxed">{exp.desc}</p>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER: Bản thu nhỏ cực ấn tượng */}
      <footer className="py-40 px-6 md:px-12 text-center border-t hairline relative bg-[#F5F2EB]">
         <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.5em] text-[#7C3AED] uppercase block mb-8">NEXT PHASE START</span>
            
            <Magnetic>
              <a 
                href="mailto:studionopu@gmail.com" 
                className="text-[8vw] md:text-[6vw] font-bold font-space leading-none tracking-[-0.06em] text-[#141414] border-b-2 border-[#141414] hover:text-[#7C3AED] hover:border-[#7C3AED] transition-all duration-300 inline-block pb-4"
              >
                STUDIONOPU@GMAIL.COM
              </a>
            </Magnetic>

            <div className="mt-32 pt-12 border-t hairline flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-400 gap-6">
               <span>DL / LÂM ĐỒNG — VN</span>
               <span>Ngô Phúc // POSTLAIN © 2026</span>
               <span>0938-649-420</span>
            </div>
         </div>
      </footer>

    </div>
  );
}
