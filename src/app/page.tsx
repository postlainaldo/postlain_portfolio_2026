"use client";
import { motion } from "framer-motion";
import { Zap, Bot, Music, Youtube, Instagram, ArrowDownRight, LayoutPanelTop, Terminal } from "lucide-react";

export default function Home() {
  const experiences = [
    { year: "2025-2026", role: "Quản Lý Cửa Hàng", company: "ALDO GO! ĐÀ LẠT", desc: "Quản trị vận hành & Retail" },
    { year: "2023-2024", role: "Quản Lý Phòng Thu", company: "SB STUDIO", desc: "Marketing & Quản lý Nghệ sĩ" },
    { year: "2021-2025", role: "Bếp Chính/Ca Trưởng", company: "PHỦI STEAK", desc: "Quản lý nhân sự & Quy trình" }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-600">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_50%)] opacity-30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-blue-500 font-mono tracking-[0.5em] text-xs mb-4 uppercase">Logic & Creative Manager</p>
          <h1 className="text-[12vw] font-black leading-none font-space uppercase mb-6">
            NGÔ PHÚC <br /> <span className="text-transparent border-t-0" style={{ WebkitTextStroke: "1px white" }}>POSTLAIN</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <p className="max-w-md text-gray-400 text-lg leading-relaxed italic">
              "Biến sự phức tạp của hệ thống thành sự đơn giản của trải nghiệm bằng AI và Logic vận hành."
            </p>
            <div className="flex gap-4">
               <a href="https://youtube.com/@postlain" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Youtube size={20}/></a>
               <a href="https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Music size={20}/></a>
               <a href="https://www.instagram.com/postlainagain" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Instagram size={20}/></a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: STRENGTHS */}
      <section className="py-20 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bg-blue-600 p-10 rounded-[30px] flex flex-col justify-between h-[400px]"
        >
          <Bot size={50} />
          <div>
            <h3 className="text-4xl font-bold font-space uppercase">AI Developer</h3>
            <p className="mt-4 text-blue-100">Triển khai phần mềm quản lý nhân sự & tự động hóa quy trình vận hành doanh nghiệp.</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bg-zinc-900 p-10 rounded-[30px] border border-white/5 flex flex-col justify-between h-[400px]"
        >
          <LayoutPanelTop size={50} />
          <div>
            <h3 className="text-4xl font-bold font-space uppercase">Manager</h3>
            <p className="mt-4 text-zinc-400">Khả năng quan sát, điều phối và giữ lửa đội ngũ trong các môi trường áp lực cao.</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: JOURNEY */}
      <section className="py-40 px-6 md:px-20 bg-white text-black rounded-t-[50px]">
        <div className="flex justify-between items-center mb-20">
          <h2 className="text-6xl font-space font-bold uppercase italic leading-none">The Journey</h2>
          <ArrowDownRight size={60} strokeWidth={3} />
        </div>

        <div className="space-y-1">
          {experiences.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 20 }}
              className="py-12 border-b border-black/10 flex flex-col md:flex-row justify-between group cursor-default"
            >
              <div>
                <span className="font-mono text-blue-600 text-sm">{item.year}</span>
                <h3 className="text-4xl font-bold uppercase mt-2 group-hover:text-blue-600 transition-colors">{item.role}</h3>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0">
                <p className="text-xl font-medium">{item.company}</p>
                <p className="text-gray-500 uppercase tracking-widest text-xs mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-40 text-center px-6 bg-white text-black">
        <h2 className="text-[10vw] font-black uppercase font-space leading-none mb-10">POSTLAIN@2026</h2>
        <div className="flex flex-wrap justify-center gap-10 opacity-60 text-xs font-mono">
          <span>SỐ ĐT: 0938-649-420</span>
          <span>EMAIL: STUDIONOPU@GMAIL.COM</span>
          <span>LOCATION: DA LAT / VN</span>
        </div>
      </footer>
    </main>
  );
}
