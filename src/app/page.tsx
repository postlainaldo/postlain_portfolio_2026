"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Youtube, Music, Zap, Bot, BarChart3, Layout } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export default function Portfolio() {
  return (
    <SmoothScroll>
      <main className="bg-[#050505] text-white min-h-screen selection:bg-white selection:text-black">
        
        {/* NAV BAR */}
        <nav className="fixed top-0 w-full z-50 flex justify-between p-8 mix-blend-difference">
          <span className="font-bold tracking-tighter text-2xl uppercase">POSTLAIN</span>
          <div className="space-x-8 opacity-60 text-sm hidden md:flex">
            <a href="#about" className="hover:opacity-100 transition">GIỚI THIỆU</a>
            <a href="#experience" className="hover:opacity-100 transition">KINH NGHIỆM</a>
            <a href="#ai" className="hover:opacity-100 transition">AI & AUTOMATION</a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-24 relative overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent -z-10"
          />
          
          <motion.p {...fadeIn} className="text-blue-500 font-mono tracking-widest mb-4">MANAGER / TECH ENTHUSIAST</motion.p>
          <motion.h1 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter leading-none"
          >
            NGÔ PHÚC <br /> <span className="text-transparent stroke-text">POSTLAIN</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap gap-10 items-center"
          >
            <div className="flex gap-6">
               <a href="https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" className="hover:text-green-400 transition-colors"><Music size={24} /></a>
               <a href="https://youtube.com/@postlain" className="hover:text-red-500 transition-colors"><Youtube size={24} /></a>
               <a href="https://www.instagram.com/postlainagain" className="hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
            </div>
            <p className="max-w-sm text-gray-400 text-sm leading-relaxed">
              Tối ưu quy trình bằng logic. Kiến tạo trải nghiệm bằng nghệ thuật. 
              Chuyên gia vận hành hệ thống kết hợp sức mạnh AI.
            </p>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-32 px-6 md:px-24 bg-white text-black rounded-t-[50px]">
          <h2 className="text-5xl font-bold mb-20 tracking-tighter uppercase italic">Work Journey</h2>
          
          <div className="space-y-32">
            {experienceData.map((item, index) => (
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true }}
                key={index} 
                className="grid md:grid-cols-2 gap-8 border-t border-black/10 pt-10"
              >
                <div>
                  <p className="text-sm font-mono text-gray-500">{item.period}</p>
                  <h3 className="text-3xl font-bold mt-2 uppercase">{item.role}</h3>
                  <p className="text-xl opacity-60 font-medium">{item.company}</p>
                </div>
                <ul className="space-y-4">
                  {item.desc.map((bullet, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <Zap size={18} className="mt-1 flex-shrink-0 group-hover:fill-yellow-400 transition" />
                      <p className="text-lg leading-relaxed">{bullet}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TECH & AI SECTION */}
        <section id="ai" className="py-32 px-6 md:px-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 border border-white/10 rounded-3xl bg-neutral-900/50 hover:bg-neutral-900 transition">
              <Bot className="mb-6 text-blue-500" size={40} />
              <h4 className="text-2xl font-bold mb-4 uppercase">AI Automation</h4>
              <p className="text-gray-400">Phát triển phần mềm quản lý nhân sự, triển khai tự động hóa vận hành dựa trên trí tuệ nhân tạo.</p>
            </div>
            <div className="p-10 border border-white/10 rounded-3xl bg-neutral-900/50 hover:bg-neutral-900 transition">
              <BarChart3 className="mb-6 text-green-500" size={40} />
              <h4 className="text-2xl font-bold mb-4 uppercase">Management</h4>
              <p className="text-gray-400">Điều phối, giữ lửa đội ngũ. Tối ưu doanh thu và định hướng Marketing thực chiến.</p>
            </div>
            <div className="p-10 border border-white/10 rounded-3xl bg-neutral-900/50 hover:bg-neutral-900 transition">
              <Layout className="mb-6 text-purple-500" size={40} />
              <h4 className="text-2xl font-bold mb-4 uppercase">Design Thinking</h4>
              <p className="text-gray-400">Tư duy Web Design (FPT College) kết hợp góc nhìn thẩm mỹ nghệ sĩ.</p>
            </div>
          </div>
        </section>

        {/* FOOTER - CONTACT */}
        <footer className="py-20 border-t border-white/5 px-6 md:px-24 text-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <p className="text-gray-500 mb-4">Bạn có dự án cần tự động hóa?</p>
            <a href="mailto:studionopu@gmail.com" className="text-4xl md:text-6xl font-bold hover:text-blue-500 transition-colors">
              studionopu@gmail.com
            </a>
          </motion.div>
          <div className="mt-20 flex justify-between items-center opacity-40 text-xs tracking-widest uppercase">
            <span>© 2026 POSTLAIN - NGÔ PHÚC</span>
            <span>DALAT / VIETNAM</span>
          </div>
        </footer>

        {/* STYLES CẦN THIẾT */}
        <style jsx global>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          }
        `}</style>
      </main>
    </SmoothScroll>
  );
}

const experienceData = [
  {
    period: "06/2025 - 04/2026",
    role: "Quản lý Cửa Hàng",
    company: "ALDO GO! ĐÀ LẠT",
    desc: ["Quản lí nhân sự và kho bãi chuyên nghiệp", "Phát triển chiến lược ngành retail tại địa phương"]
  },
  {
    period: "03/2023 - 10/2024",
    role: "Quản lý Phòng Thu",
    company: "SB STUDIO",
    desc: ["Quản lý các nghệ sĩ, đối tác MCN và truyền thông", "Định hướng Marketing và phát triển thương hiệu", "Điều phối quy trình sản xuất nội dung chuyên sâu"]
  },
  {
    period: "2024 - 2025",
    role: "Bếp Chính / Ca Trưởng",
    company: "PHỦI STEAK",
    desc: ["Chuyên môn hóa kỹ thuật áp chảo Steak chuẩn Âu", "Tối ưu hóa quy trình nguyên liệu và nhân sự trong bếp"]
  }
];
