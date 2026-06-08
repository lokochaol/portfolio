import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getLanguageStats, getGitHubStats } from "@/lib/github";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "廣岡晃一",
  alternateName: ["Hirooka Koichi", "廣岡 晃一"],
  url: "https://koichi.hirooka.me/portfolio",
  image: "https://koichi.hirooka.me/portfolio/profile.jpg",
  jobTitle: "バックエンドエンジニア",
  description:
    "Python・Django・DRF を主軸としたバックエンドエンジニア。AWS / GCP のインフラ構築、React / Vue.js のフロントエンド、Flutter モバイル開発まで対応するフルサイクルエンジニア。",
  email: "l.00.kocha.00.l@gmail.com",
  knowsAbout: [
    "Python",
    "Django",
    "Django REST Framework",
    "React",
    "Next.js",
    "Flutter",
    "AWS",
    "Docker",
    "PostgreSQL",
    "TypeScript",
    "REST API",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "東京理科大学",
      sameAs: "https://www.tus.ac.jp",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "大阪芸術大学 通信教育部",
      sameAs: "https://www.osaka-geidai.ac.jp",
    },
    {
      "@type": "EducationalOrganization",
      name: "42Tokyo",
      sameAs: "https://42tokyo.jp",
    },
  ],
  sameAs: [
    "https://github.com/lokochaol",
    "https://note.com/l_00_kocha_00_l",
  ],
};

export default async function Page() {
  const githubLanguages = await getLanguageStats();
  const githubStats = await getGitHubStats();

  return (
    <main className="bg-[#080808] text-white min-h-screen cursor-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Profile />
      <About />
      <Skills githubLanguages={githubLanguages} githubStats={githubStats} />
      <Projects />
      <Contact />
      <footer className="border-t border-white/5 py-8 text-center font-mono text-xs text-white/20">
        built with Next.js · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
