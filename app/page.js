"use client"; // Ensure this is a Client Component
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start bg-gray-100 text-gray-900 px-8 pt-16 h-screen min-h-screen overflow-hidden">
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

      {/* Main Text Block - Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
        animate={{ x: 0, opacity: 1 }} // Slide in to position
        transition={{ duration: 1.5, ease: "easeOut" }} // Smooth transition
        className="relative z-20 self-start text-left max-w-2xl ml-20 mt-[50px]"
      >
        <h1 className="text-5xl font-bold mb-6 text-black">The Open Discourse Collective</h1>
        <p className="text-lg text-black">
          Exploring ideas openly.
        </p>
      </motion.div>

      {/* Blended & Rounded Logo - Positioned on the Left Under Text */}
      <motion.div
        initial={{ opacity: 0 }} // Start invisible
       animate={{ opacity: 1 }} // Fades in softly
       transition={{ duration: 2, ease: "easeOut" }} // Smooth fade-in
       className="absolute left-[200px] top-[300px] w-80 h-80 z-10 mix-blend-overlay"
>
         <Image
            src="/images/logo.jpg"
            alt="logo"
            width={200} // Force a square aspect ratio
            height={200} // Same as width to prevent oblong shape
            className="w-full h-full object-cover rounded-full shadow-lg"
         />
      </motion.div>
    </main>
  );
}
