"use client"; // Ensure this is a Client Component
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start bg-gray-100 text-gray-900 px-8 pt-16 h-screen min-h-screen overflow-hidden">
      {/* Large Greek Arena Image - Full Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <Image
          src="/images/greek-arena.jpg"
          alt="Greek Arena"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
      </div>

      {/* Animated Main Text Block - FIXED TEXT VISIBILITY */}
      <motion.div
        initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
        animate={{ x: 0, opacity: 1 }} // Slide in to position
        transition={{ duration: 1.5, ease: "easeOut" }} // Smooth transition
        className="relative z-20 self-start text-left max-w-2xl ml-0 lg:ml-20 mt-[50px]"
      >
        <h1 className="text-5xl font-bold mb-6 text-black">The Open Discourse Collective</h1>
        <p className="text-lg text-black">
          Exploring ideas openly.
        </p>
      </motion.div>

      {/* Animated American Image - Lowered Further */}
      <motion.div
        initial={{ y: 100, opacity: 0 }} // Start off-screen below
        animate={{ y: 50, opacity: 1 }} // Slide up into place
        transition={{ duration: 2, ease: "easeOut" }} // Smooth transition
        className="absolute left-20 bottom-[-80px] w-1/2 max-w-md"
      >
        <Image
          src="/images/america.jpg"
          alt="American Flag Building"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </motion.div>
    </main>
  );
}
