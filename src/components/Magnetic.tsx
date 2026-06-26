"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }: { children: React.ReactElement }) {
    const magnetic = useRef<any>(null);

    // Bộ phát âm thanh cơ học nhân tạo (Web Audio API)
    const playClickSound = () => {
        if (typeof window === "undefined") return;
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = "sine";
            // Tiếng click gỗ siêu mảnh (wood click)
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
            
            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.03);
        } catch (e) {
            console.log("Audio not allowed yet");
        }
    };

    useEffect(() => {
        if (!magnetic.current) return;
        const xTo = gsap.quickTo(magnetic.current, "x", {duration: 0.8, ease: "elastic.out(1, 0.3)"})
        const yTo = gsap.quickTo(magnetic.current, "y", {duration: 0.8, ease: "elastic.out(1, 0.3)"})

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const {height, width, left, top} = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width/2)
            const y = clientY - (top + height/2)
            // Giảm cường độ hút để tạo sự mượt mà tinh tế
            xTo(x * 0.35);
            yTo(y * 0.35);
        }

        const handleMouseEnter = () => {
            playClickSound();
        }

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        }

        magnetic.current.addEventListener("mousemove", handleMouseMove);
        magnetic.current.addEventListener("mouseenter", handleMouseEnter);
        magnetic.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", handleMouseMove);
                magnetic.current.removeEventListener("mouseenter", handleMouseEnter);
                magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        }
    }, [])

    return React.cloneElement(children, { ref: magnetic });
}
