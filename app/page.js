"use client"; // Ensure this is a Client Component
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex flex-col justify-start bg-gray-100 text-gray-900 px-8 pt-16 h-screen min-h-screen overflow-hidden">
      
      {/* 🌍 Desktop Version (100% Preserved) */}
      <div className="hidden md:flex w-full h-full">
        {/* Large Greek Arena Image - Full Right Side */}
        <div className="absolute right-0 top-0 w-1/2 h-full z-0">
          <Image
            src="/images/greek-arena.jpg"
            alt="Greek Arena"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
          />
        </div>

        {/* Main Text Block - Left Side (Desktop) */}
        <motion.div
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          className="relative z-20 self-start text-left max-w-2xl ml-20 mt-[50px]"
        >
          <h1 className="text-5xl font-bold mb-6 text-black">The Open Discourse Collective</h1>
          <p className="text-lg text-black">
            Exploring ideas openly.
          </p>
        </motion.div>

        {/* Blended & Rounded Logo - Positioned on the Left Under Text */}
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 2, ease: "easeOut" }} 
          className="absolute left-[200px] top-[300px] w-80 h-80 z-10 mix-blend-overlay"
        >
          <Image
            src="/images/logo.jpg"
            alt="logo"
            width={200} 
            height={200} 
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </motion.div>
      </div>

      {/* 📱 Mobile Version (Only Visible on Small Screens) */}
      <div className="md:hidden relative w-full h-full flex flex-col items-start px-6">
        {/* Full-Screen Greek Image on Mobile */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/images/greek-arena.jpg"
            alt="Greek Arena"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        </div>

        {/* Mobile Main Text - Left-Aligned */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-20 text-left mt-20 ml-4"
        >
          <h1 className="text-4xl font-bold mb-4 text-black">The Open Discourse Collective</h1>
          <p className="text-base text-black">
            Exploring ideas openly.
          </p>
        </motion.div>

        {/* Mobile Logo - Smaller & Positioned Below Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative z-20 mt-6 w-32 h-32 ml-4"
        >
          <Image
            src="/images/logo.jpg"
            alt="logo"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </motion.div>
      </div>
    </main>
  );
}
