import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getLanguageStats } from "@/lib/github";

export default async function Page() {
  const githubLanguages = await getLanguageStats();

  return (
    <main className="bg-[#080808] text-white min-h-screen cursor-none">
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Profile />
      <About />
      <Skills githubLanguages={githubLanguages} />
      <Projects />
      <Contact />
      <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-white/20">
        built with Next.js · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
