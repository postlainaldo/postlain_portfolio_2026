"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { Zap, Bot, Music, Youtube, Instagram, ArrowUpRight, ChefHat, Building2, Store, Mic2 } from "lucide-react";
import React from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const experienceData = [
    {
      period: "6/2025 - 4/2026",
      role: "QUẢN LÍ CỬA HÀNG",
      company: "ALDO GO! ĐÀ LẠT",
      icon: <Store className="text-blue-500" />,
      tasks: ["Quản lý Retail & Vận hành", "Quản lý Kho & Nhân sự chuyên sâu", "Phát triển thị trường Retail tại Đà Lạt"]
    },
    {
      period: "10/2024 - 6/2025",
      role: "BẾP CHÍNH / CA TRƯỞNG",
      company: "PHỦI STEAK",
      icon: <ChefHat className="text-orange-500" />,
      tasks: ["Điều phối ca làm việc & Nhân sự bếp", "Kỹ thuật áp chảo Steak chuẩn Âu", "Quản lý nguyên liệu & tiêu chuẩn món ăn"]
    },
    {
      period: "3/2023 - 10/2024",
      role: "QUẢN LÝ PHÒNG THU",
      company: "SB STUDIO",
      icon: <Mic2 className="text-purple-500" />,
      tasks: ["Quản lý nghệ sĩ, đối tác MCN & truyền thông", "Định hướng Marketing & CSKH", "Điều phối quy trình thu, quay sản xuất chuyên nghiệp"]
    }
  ];

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left" style={{ scaleX }} />

      {/* 1. HERO SECTION */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden px-6">
        <div className="bg-text select-none uppercase">ORCHESTRATOR</div>
        
        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="text-blue-500 font-mono tracking-[0.3em] text-sm mb-6 uppercase block">Logic // Creativity // Automation</span>
            <h1 className="text-[14vw] md:text-[10vw] font-black font-space leading-[0.8] uppercase italic">
              NGÔ PHÚC <br /> <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>POSTLAIN</span>
            </h1>
            
            <div className="mt-12 flex flex-col md:flex-row gap-10 items-center justify-center">
              <p className="max-w-[400px] text-gray-500 text-sm md:text-base font-light leading-relaxed">
                Đam mê tối ưu hóa quy trình bằng Logic và tự động hoá AI. 
                Kiến tạo trải nghiệm thông qua sự nhạy bén trong quản lý nhân sự.
              </p>
              <div className="flex gap-4">
                 {[
                   { icon: <Music size={18}/>, link: "https://open.spotify.com/artist/1GXZL8RGTHaxQVbo6yFB9n" },
                   { icon: <Youtube size={18}/>, link: "https://youtube.com/@postlain" },
                   { icon: <Instagram size={18}/>, link: "https://www.instagram.com/postlainagain" }
                 ].map((social, i) => (
                   <a key={i} href={social.link} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                     {social.icon}
                   </a>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE SKILLS (Bản lĩnh Manager) */}
      <section className="py-32 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-10 border border-white/5 rounded-[40px] bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
          <Bot size={40} className="mb-8 text-blue-500" />
          <h3 className="text-2xl font-bold font-space uppercase mb-4">AI Integration</h3>
          <p className="text-gray-400 text-sm">Phát triển phần mềm quản lý nhân sự và triển khai hệ thống tự động hoá vận hành doanh nghiệp.</p>
        </div>
        <div className="p-10 border border-white/5 rounded-[40px] bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
          <Building2 size={40} className="mb-8 text-blue-500" />
          <h3 className="text-2xl font-bold font-space uppercase mb-4">Human Resource</h3>
          <p className="text-gray-400 text-sm">Năng lực quan sát, điều phối, giữ lửa đội ngũ và giải quyết vấn đề nhân sự thực chiến.</p>
        </div>
        <div className="p-10 border border-white/5 rounded-[40px] bg-zinc-900/30 hover:bg-zinc-900/50 transition-all">
          <Zap size={40} className="mb-8 text-blue-500" />
          <h3 className="text-2xl font-bold font-space uppercase mb-4">Operations</h3>
          <p className="text-gray-400 text-sm">Kinh nghiệm vận hành đa ngành: từ Retail (Aldo), Studio nghệ thuật đến Nhà hàng cao cấp (Steakhouse).</p>
        </div>
      </section>

      {/* 3. JOURNEY (Chi tiết từ CV) */}
      <section id="experience" className="py-40 bg-white text-black rounded-[40px] md:rounded-[80px]">
        <div className="px-6 md:px-20 max-w-7xl mx-auto">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-20 flex items-center gap-4">
            Professional Experience <div className="h-[1px] w-20 bg-gray-200"/>
          </h2>

          <div className="space-y-32">
            {experienceData.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-10 group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    {item.icon}
                    <span className="font-mono text-sm opacity-50">{item.period}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-space font-bold uppercase tracking-tighter leading-none group-hover:text-blue-600 transition-colors">
                    {item.role}
                  </h3>
                  <p className="mt-4 text-xl opacity-60 uppercase">{item.company}</p>
                </div>
                <div className="border-l border-black/10 pl-8 flex flex-col justify-center">
                  <ul className="space-y-4">
                    {item.tasks.map((task, i) => (
                      <li key={i} className="flex gap-4 items-start font-light italic text-lg leading-relaxed text-gray-600">
                        <span>—</span> {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDUCATION & FOOTER */}
      <section className="py-40 px-6 md:px-20 text-center">
        <div className="grid md:grid-cols-2 gap-4 mb-40 max-w-4xl mx-auto">
          <div className="p-8 border border-white/5 rounded-3xl text-left">
             <p className="text-blue-500 font-mono text-[10px] uppercase mb-4">// Education</p>
             <h4 className="text-xl font-bold uppercase mb-2 font-space">Đại học Văn Lang</h4>
             <p className="text-gray-500 text-sm uppercase">Ngành: Quan hệ công chúng (2021)</p>
          </div>
          <div className="p-8 border border-white/5 rounded-3xl text-left">
             <p className="text-blue-500 font-mono text-[10px] uppercase mb-4">// Technology</p>
             <h4 className="text-xl font-bold uppercase mb-2 font-space">Cao đẳng FPT</h4>
             <p className="text-gray-500 text-sm uppercase">Chuyên ngành: Thiết kế WEB (2021)</p>
          </div>
        </div>

        <h2 className="text-[8vw] font-black italic tracking-tighter mb-20 opacity-10 font-space select-none">READY FOR INNOVATION?</h2>
        
        <div className="space-y-6">
          <a href="mailto:studionopu@gmail.com" className="text-3xl md:text-5xl font-space font-bold border-b-2 border-white/10 hover:border-blue-600 transition-all py-2 inline-block">
            studionopu@gmail.com
          </a>
          <p className="text-gray-600 font-mono text-xs mt-10">LÂM ĐỒNG — DA LAT CITY // VIETNAM</p>
          <div className="pt-20 opacity-20 text-[10px] tracking-[1em] uppercase font-mono">POSTLAIN©2026</div>
        </div>
      </section>
    </div>
  );
}
