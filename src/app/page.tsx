'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Download,
  ExternalLink,
  ChevronUp,
  Menu,
  HomeIcon,
  User,
  FolderOpen,
  Cpu,
  MessageCircle,
  GraduationCap,
  Briefcase,
  Sparkles,
  Code2,
  Brain,
  Database,
  Server,
  Globe,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

/* ─── TYPES ─── */
type Lang = 'en' | 'tr'

/* ─── TRANSLATIONS ─── */
const T = {
  en: {
    nav: { home: 'Home', about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      greeting: 'Hi, I am',
      name: "Tuğba Çağla EREN",
      tagline: 'AI & Data Science Enthusiast',
      desc: 'I love exploring new technologies and building projects — whether tiny experiments or bigger ideas. This is where I share my thoughts, writing, and side projects. Enjoy your stay!',
      cv: 'Download CV',
      touch: 'Get in Touch',
    },
    about: {
      title: 'Who Am I',
      subtitle: 'A brief journey of my path so far',
      p1: "I graduated from Kırıkkale University with a degree in Computer Engineering in 2024. During my university years and for some time after graduation, I was involved in developing web projects.",
      p2: "Later on, driven by my passion for artificial intelligence and data science, I started building projects in AI, data science, and machine learning. I continue to explore new technologies and I am open to job opportunities.",
    },
    timeline: {
      title: 'Timeline',
      subtitle: 'My academic and professional milestones',
      graduation: { title: 'Graduation', school: 'Kırıkkale University', dept: 'Computer Engineering', period: 'Sep 2018 – Feb 2024', desc: 'Completed my B.Sc. in Computer Engineering with a focus on software development and AI.' },
      intern1: { title: 'Software Engineer Intern', company: 'Atosis Araç Takip ve İletişim Sistemleri', period: 'Jul 2020 – Aug 2020', desc: 'Developed a .NET-based data integration system that crawled and migrated over 12,000 vehicle listings from external web platforms to a centralized MS SQL Server database, reducing manual data entry by 85%.' },
      intern2: { title: 'Full Stack Developer Intern', company: 'Basarsoft', period: 'Jul 2022 – Sep 2022', desc: 'Developed a full-stack geospatial data management system using .NET Web API, PostgreSQL, OpenLayers, Node.js, Bootstrap, and JavaScript for real-time mapping.' },
      free: { title: 'Freelance AI & Data Science Projects', company: 'Self-employed', period: 'Mar 2024 – Present', desc: 'Building AI, data science, and machine learning projects. Focusing on LLM/RAG systems, NLP, and scalable ML solutions.' },
    },
    projects: {
      title: 'Projects',
      subtitle: 'A selection of things I have built',
    },
    skills: {
      title: 'Tech Stack',
      subtitle: 'Technologies and tools I work with',
      ai: 'AI & GenAI',
      ml: 'ML & Data Science',
      backend: 'Backend & APIs',
      db: 'Databases',
      lang: 'Languages',
      tools: 'Tools',
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Let's build better products.",
      desc: 'Open for interesting opportunities or just a meaningful chat.',
      github: 'GitHub',
      email: 'Email Me',
    },
    footer: { rights: 'All rights reserved.' },
  },
  tr: {
    nav: { home: 'Ana Sayfa', about: 'Hakkımda', projects: 'Projeler', skills: 'Yetenekler', contact: 'İletişim' },
    hero: {
      greeting: 'Merhaba, Ben',
      name: "Tuğba Çağla EREN",
      tagline: 'Yapay Zeka & Veri Bilimi Meraklısı',
      desc: 'Yeni teknolojiler keşfetmeyi ve projeler geliştirmeyi seviyorum — ister küçük deneyler ister büyük fikirler olsun. Burada düşüncelerimi, yazılarımı ve yan projelerimi paylaşıyorum. İyi seyirler!',
      cv: 'CV İndir',
      touch: 'İletişime Geç',
    },
    about: {
      title: 'Ben Kimim',
      subtitle: 'Şu ana kadarki yolculuğumun kısa bir özeti',
      p1: "2024 yılında Kırıkkale Üniversitesi Bilgisayar Mühendisliği bölümünden mezun oldum. Üniversite hayatımda ve mezun olduktan sonra belli bir süre web projeleri geliştirmekle ilgilendim.",
      p2: "Daha sonrasında yapay zeka ve veri bilimine olan ilgimden dolayı yapay zeka, veri bilimi ve makine öğrenmesi projeleri geliştirmeye başladım. Yeni teknolojiler keşfetmeye devam ediyorum ve iş tekliflerine açığım.",
    },
    timeline: {
      title: 'Zaman Çizelgesi',
      subtitle: 'Akademik ve profesyonel kilometre taşlarım',
      graduation: { title: 'Mezuniyet', school: 'Kırıkkale Üniversitesi', dept: 'Bilgisayar Mühendisliği', period: 'Eyl 2018 – Şub 2024', desc: 'Yazılım geliştirme ve yapay zeka odaklı Bilgisayar Mühendisliği lisansımı tamamladım.' },
      intern1: { title: 'Yazılım Mühendisi Stajyeri', company: 'Atosis Araç Takip ve İletişim Sistemleri', period: 'Tem 2020 – Ağu 2020', desc: "Harici web platformlarından 12.000'den fazla araç ilanını merkezi MS SQL Server veritabanına crawling ve migrate eden .NET tabanlı bir veri entegrasyon sistemi geliştirdim." },
      intern2: { title: 'Full Stack Geliştirici Stajyeri', company: 'Basarsoft', period: 'Tem 2022 – Eyl 2022', desc: '.NET Web API, PostgreSQL, OpenLayers, Node.js, Bootstrap ve JavaScript kullanarak gerçek zamanlı haritalama için tam kapsamlı bir CBS veri yönetim sistemi geliştirdim.' },
      free: { title: 'Serbest AI & Veri Bilimi Projeleri', company: 'Serbest Çalışma', period: 'Mar 2024 – Devam Ediyor', desc: 'Yapay zeka, veri bilimi ve makine öğrenmesi projeleri geliştiriyorum. LLM/RAG sistemleri, NLP ve ölçeklenebilir ML çözümlerine odaklanıyorum.' },
    },
    projects: {
      title: 'Projeler',
      subtitle: 'Geliştirdiğim çalışmaların bir seçkisi',
    },
    skills: {
      title: 'Teknoloji Yığını',
      subtitle: 'Çalıştığım teknolojiler ve araçlar',
      ai: 'Yapay Zeka & GenAI',
      ml: 'ML & Veri Bilimi',
      backend: 'Backend & API\'ler',
      db: 'Veritabanları',
      lang: 'Diller',
      tools: 'Araçlar',
    },
    contact: {
      title: 'İletişime Geç',
      subtitle: 'Daha iyi ürünler inşa edelim.',
      desc: 'İlginç fırsatlara veya sadece anlamlı bir sohbete açığım.',
      github: 'GitHub',
      email: 'E-posta Gönder',
    },
    footer: { rights: 'Tüm hakları saklıdır.' },
  },
}

/* ─── DATA ─── */

const PROJECTS_DATA = [
  {
    title: 'AI Fraud Detection System',
    desc: 'Real-time fraud detection system using TensorFlow, FastAPI, Redis, and WebSockets for live transaction monitoring. Achieved 0.95 ROC-AUC on imbalanced financial data with 0.17% fraud cases.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Redis', 'Scikit-learn', 'Streamlit'],
    href: 'https://github.com/caglaeren/fraud-ai-system',
    icon: Brain,
  },
  {
    title: 'Genomic-RAG for RARS1',
    desc: 'Local RAG system using LangChain and ChromaDB for precise genomic research data analysis with an integrated local LLM, enhancing research efficiency by 40%.',
    tags: ['Python', 'LangChain', 'ChromaDB', 'Ollama', 'RAG'],
    href: 'https://github.com/caglaeren/genomic-rag-rars1',
    icon: Dna,
  },
  {
    title: 'Algerian Forest Fires Prediction',
    desc: 'Machine learning project predicting forest fires in the Algerian region using data analysis and classification models.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'ML'],
    href: 'https://github.com/caglaeren/algerian-forest-fires-prediction',
    icon: Flame,
  },
  {
    title: 'Exercises Web App',
    desc: 'A sports exercises website built with React.js and RapidAPI. Designed to showcase various workout routines and exercise data with a clean, responsive interface.',
    tags: ['React.js', 'RapidAPI', 'JavaScript', 'CSS'],
    href: 'https://github.com/caglaeren/Exercisess',
    icon: Code2,
  },
  {
    title: 'CBS Project (Basarsoft)',
    desc: 'Full-stack geospatial data management system built during Basarsoft internship. Uses .NET Web API, PostgreSQL, OpenLayers, and Node.js for real-time mapping and data visualization.',
    tags: ['.NET', 'PostgreSQL', 'OpenLayers', 'Node.js', 'JavaScript'],
    href: 'https://github.com/caglaeren/CBS-Project',
    icon: Globe,
  },
]

/* Dna and Flame are not in lucide — we create simple SVG fallbacks */
function Dna(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" /><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" /><path d="M17 6l-2.5-2.5" /><path d="M14 8l-1-1" /><path d="M7 18l2.5 2.5" /><path d="M3.5 14.5l.5.5" /><path d="M20 9l.5.5" /><path d="M6.5 12.5l1 1" /><path d="M16.5 10.5l1 1" /><path d="M10 16l1.5 1.5" />
    </svg>
  )
}

function Flame(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

const SKILLS_DATA: Record<Lang, { category: string; icon: React.ElementType; items: { name: string; color: string }[] }[]> = {
  en: [
    {
      category: 'AI & GenAI',
      icon: Brain,
      items: [
        { name: 'LLMs', color: '#8b5cf6' },
        { name: 'RAG', color: '#a78bfa' },
        { name: 'NLP', color: '#7c3aed' },
        { name: 'LangChain', color: '#c084fc' },
        { name: 'Agentic AI', color: '#9333ea' },
        { name: 'ChromaDB', color: '#6d28d9' },
      ],
    },
    {
      category: 'ML & Data Science',
      icon: Sparkles,
      items: [
        { name: 'PyTorch', color: '#8b5cf6' },
        { name: 'TensorFlow', color: '#a78bfa' },
        { name: 'Scikit-learn', color: '#7c3aed' },
        { name: 'NumPy', color: '#c084fc' },
        { name: 'Pandas', color: '#9333ea' },
        { name: 'Matplotlib', color: '#6d28d9' },
        { name: 'Seaborn', color: '#8b5cf6' },
      ],
    },
    {
      category: 'Backend & APIs',
      icon: Server,
      items: [
        { name: 'FastAPI', color: '#8b5cf6' },
        { name: '.NET', color: '#a78bfa' },
        { name: 'REST APIs', color: '#7c3aed' },
        { name: 'WebSockets', color: '#c084fc' },
      ],
    },
    {
      category: 'Databases',
      icon: Database,
      items: [
        { name: 'PostgreSQL', color: '#8b5cf6' },
        { name: 'Redis', color: '#a78bfa' },
        { name: 'SQL', color: '#7c3aed' },
        { name: 'ChromaDB', color: '#c084fc' },
      ],
    },
    {
      category: 'Languages',
      icon: Code2,
      items: [
        { name: 'Python', color: '#8b5cf6' },
        { name: 'C#', color: '#a78bfa' },
        { name: 'JavaScript', color: '#7c3aed' },
      ],
    },
    {
      category: 'Tools',
      icon: Cpu,
      items: [
        { name: 'Git', color: '#8b5cf6' },
        { name: 'Docker', color: '#a78bfa' },
        { name: 'CI/CD', color: '#7c3aed' },
        { name: 'Cursor', color: '#c084fc' },
        { name: 'GitHub Copilot', color: '#9333ea' },
        { name: 'Claude', color: '#6d28d9' },
      ],
    },
  ],
  tr: [
    {
      category: 'Yapay Zeka & GenAI',
      icon: Brain,
      items: [
        { name: 'LLMs', color: '#8b5cf6' },
        { name: 'RAG', color: '#a78bfa' },
        { name: 'NLP', color: '#7c3aed' },
        { name: 'LangChain', color: '#c084fc' },
        { name: 'Agentic AI', color: '#9333ea' },
        { name: 'ChromaDB', color: '#6d28d9' },
      ],
    },
    {
      category: 'ML & Veri Bilimi',
      icon: Sparkles,
      items: [
        { name: 'PyTorch', color: '#8b5cf6' },
        { name: 'TensorFlow', color: '#a78bfa' },
        { name: 'Scikit-learn', color: '#7c3aed' },
        { name: 'NumPy', color: '#c084fc' },
        { name: 'Pandas', color: '#9333ea' },
        { name: 'Matplotlib', color: '#6d28d9' },
        { name: 'Seaborn', color: '#8b5cf6' },
      ],
    },
    {
      category: "Backend & API'ler",
      icon: Server,
      items: [
        { name: 'FastAPI', color: '#8b5cf6' },
        { name: '.NET', color: '#a78bfa' },
        { name: 'REST APIs', color: '#7c3aed' },
        { name: 'WebSockets', color: '#c084fc' },
      ],
    },
    {
      category: 'Veritabanları',
      icon: Database,
      items: [
        { name: 'PostgreSQL', color: '#8b5cf6' },
        { name: 'Redis', color: '#a78bfa' },
        { name: 'SQL', color: '#7c3aed' },
        { name: 'ChromaDB', color: '#c084fc' },
      ],
    },
    {
      category: 'Diller',
      icon: Code2,
      items: [
        { name: 'Python', color: '#8b5cf6' },
        { name: 'C#', color: '#a78bfa' },
        { name: 'JavaScript', color: '#7c3aed' },
      ],
    },
    {
      category: 'Araçlar',
      icon: Cpu,
      items: [
        { name: 'Git', color: '#8b5cf6' },
        { name: 'Docker', color: '#a78bfa' },
        { name: 'CI/CD', color: '#7c3aed' },
        { name: 'Cursor', color: '#c084fc' },
        { name: 'GitHub Copilot', color: '#9333ea' },
        { name: 'Claude', color: '#6d28d9' },
      ],
    },
  ],
}

/* ─── HELPERS ─── */

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatingSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 80, scale: 0.96 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── LOGO ─── */
function DiamondLogo({ size = 40 }: { size?: number }) {
  return (
    <a href="#home" className="relative inline-flex items-center group select-none" style={{ height: size }}>
      <span
        className="font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[oklch(0.75_0.22_295)] via-[oklch(0.65_0.26_305)] to-[oklch(0.55_0.22_320)] transition-all duration-500 group-hover:tracking-wider"
        style={{ fontSize: size * 0.5 }}
      >
        TÇE
      </span>
      {/* Underline accent */}
      <span
        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[oklch(0.7_0.24_295)] via-[oklch(0.6_0.22_305)] to-[oklch(0.5_0.2_320)] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
      />
    </a>
  )
}

/* ─── PAGE ─── */

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [scrolled, setScrolled] = useState(false)
  const [showBottomNav, setShowBottomNav] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = T[lang]

  const NAV_ITEMS = [
    { label: t.nav.home, href: '#home', icon: HomeIcon },
    { label: t.nav.about, href: '#about', icon: User },
    { label: t.nav.projects, href: '#projects', icon: FolderOpen },
    { label: t.nav.skills, href: '#skills', icon: Cpu },
    { label: t.nav.contact, href: '#contact', icon: MessageCircle },
  ]

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBottomNav(window.scrollY > 400)
      setShowTopBtn(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'tr' : 'en')), [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ════════ TOP NAVBAR ════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <DiamondLogo size={36} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="ml-3 px-3 py-1.5 rounded-lg text-xs font-bold border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 uppercase"
            >
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
          </nav>

          {/* Mobile nav */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-lg text-xs font-bold border border-primary/30 text-primary hover:bg-primary/10 transition-all uppercase"
            >
              {lang === 'en' ? 'TR' : 'EN'}
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <DiamondLogo size={28} />
                    <span className="text-primary">Navigation</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6 px-2">
                  {NAV_ITEMS.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all"
                      >
                        <item.icon className="size-4 text-primary" />
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ════════ HERO ════════ */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Purple gradient blobs — organic, water-surface feel */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-background" />
            {/* Large primary blob — top left */}
            <motion.div
              className="absolute top-[5%] -left-[15%] w-[700px] h-[700px] rounded-full opacity-[0.2]"
              style={{ background: 'radial-gradient(circle, oklch(0.6 0.25 295), transparent 70%)' }}
              animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Large secondary blob — bottom right */}
            <motion.div
              className="absolute bottom-[-5%] -right-[15%] w-[650px] h-[650px] rounded-full opacity-[0.17]"
              style={{ background: 'radial-gradient(circle, oklch(0.55 0.22 310), transparent 70%)' }}
              animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1.1, 1, 1.1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Medium blob — center left */}
            <motion.div
              className="absolute top-[35%] left-[20%] w-[450px] h-[450px] rounded-full opacity-[0.12]"
              style={{ background: 'radial-gradient(circle, oklch(0.65 0.2 280), transparent 70%)' }}
              animate={{ y: [0, -70, 0], x: [0, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Small accent blob — bottom center */}
            <motion.div
              className="absolute bottom-[25%] left-[50%] w-[350px] h-[350px] rounded-full opacity-[0.1]"
              style={{ background: 'radial-gradient(circle, oklch(0.5 0.18 320), transparent 70%)' }}
              animate={{ y: [0, -60, 0], x: [0, 40, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Tiny floating orb — top right */}
            <motion.div
              className="absolute top-[15%] right-[10%] w-[200px] h-[200px] rounded-full opacity-[0.12]"
              style={{ background: 'radial-gradient(circle, oklch(0.7 0.2 290), transparent 70%)' }}
              animate={{ y: [0, -30, 0], x: [0, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Tiny floating orb — center */}
            <motion.div
              className="absolute top-[60%] left-[40%] w-[180px] h-[180px] rounded-full opacity-[0.08]"
              style={{ background: 'radial-gradient(circle, oklch(0.6 0.15 300), transparent 70%)' }}
              animate={{ y: [0, 40, 0], scale: [1.1, 0.9, 1.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Moving wave line */}
            <motion.div
              className="absolute top-[70%] left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, oklch(0.6 0.2 295), oklch(0.55 0.22 310), transparent)' }}
              animate={{ y: [0, -20, 0], opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Moving wave line 2 */}
            <motion.div
              className="absolute top-[30%] left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, oklch(0.65 0.2 280), oklch(0.5 0.18 320), transparent)' }}
              animate={{ y: [0, 15, 0], opacity: [0.08, 0.04, 0.08] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(oklch(0.6 0.2 295) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.2 295) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Greeting */}
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground mb-2 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {t.hero.greeting}
              </motion.p>

              {/* Name */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-[oklch(0.75_0.2_295)] via-[oklch(0.65_0.25_305)] to-[oklch(0.55_0.22_320)] bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl text-primary font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                {t.hero.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7 }}
              >
                {t.hero.desc}
              </motion.p>

              {/* Social icons */}
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                {[
                  { icon: Mail, href: 'mailto:tugbacaglaeren@gmail.com', label: 'Email' },
                  { icon: Github, href: 'https://github.com/caglaeren', label: 'GitHub' },
                  { icon: Instagram, href: 'https://www.instagram.com/cagllaeren/', label: 'Instagram' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/cagla-eren/', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-3 rounded-xl bg-secondary/60 backdrop-blur-sm border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.7 }}
              >
                <Button size="lg" className="text-base px-8 bg-gradient-to-r from-[oklch(0.6_0.22_295)] to-[oklch(0.55_0.2_310)] hover:from-[oklch(0.65_0.24_295)] hover:to-[oklch(0.6_0.22_310)] shadow-lg shadow-primary/20" asChild>
                  <a href="/Tugba_Cagla_EREN_CV.pdf" download>
                    <Download className="size-4 mr-2" />
                    {t.hero.cv}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50" asChild>
                  <a href="#contact">
                    <MessageCircle className="size-4 mr-2" />
                    {t.hero.touch}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

          </div>

          {/* Scroll indicator — outside the text container */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-1.5 bg-primary rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </section>

        {/* ════════ WHO AM I ════════ */}
        <section id="about" className="py-20 md:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FloatingSection>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[oklch(0.75_0.18_295)] to-[oklch(0.6_0.22_310)] bg-clip-text text-transparent">
                  {t.about.title}
                </h2>
                <p className="text-muted-foreground text-lg">{t.about.subtitle}</p>
                <div className="w-20 h-1 bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.55_0.2_320)] rounded-full mx-auto mt-4" />
              </div>
            </FloatingSection>

            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Profile visual */}
              <FloatingSection delay={0.1} className="md:col-span-2">
                <div className="relative flex justify-center">
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl shadow-2xl shadow-primary/20 overflow-hidden">
                    <img
                      src="/profile.jpeg"
                      alt="Tuğba Çağla EREN"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-gradient-to-br from-[oklch(0.65_0.2_295)] to-[oklch(0.55_0.18_310)] opacity-20"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -left-3 w-12 h-12 rounded-lg bg-gradient-to-br from-[oklch(0.6_0.2_300)] to-[oklch(0.5_0.18_315)] opacity-15"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </FloatingSection>

              {/* Text content */}
              <FloatingSection delay={0.2} className="md:col-span-3">
                <div className="space-y-5">
                  <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                    {t.about.p1}
                  </p>
                  <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">
                    {t.about.p2}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {['Python', 'AI', 'Data Science', 'Machine Learning', 'NLP', 'RAG', 'LLMs', 'FastAPI'].map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FloatingSection>
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ════════ TIMELINE ════════ */}
        <section className="py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FloatingSection>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[oklch(0.75_0.18_295)] to-[oklch(0.6_0.22_310)] bg-clip-text text-transparent">
                  {t.timeline.title}
                </h2>
                <p className="text-muted-foreground text-lg">{t.timeline.subtitle}</p>
                <div className="w-20 h-1 bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.55_0.2_320)] rounded-full mx-auto mt-4" />
              </div>
            </FloatingSection>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[oklch(0.6_0.2_295)] via-[oklch(0.5_0.18_310)] to-[oklch(0.4_0.15_320)] opacity-30" />

              {[
                { ...t.timeline.free, icon: Sparkles, isLeft: true },
                { ...t.timeline.graduation, icon: GraduationCap, isLeft: false },
                { ...t.timeline.intern2, icon: Briefcase, isLeft: true },
                { ...t.timeline.intern1, icon: Briefcase, isLeft: false },
              ].map((item, i) => (
                <FloatingSection key={i} delay={i * 0.12}>
                  <div className={`relative flex items-start gap-6 mb-12 ${item.isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} pl-16 md:pl-0`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-1 size-5 rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_295)] to-[oklch(0.55_0.2_310)] ring-4 ring-background z-10 shadow-lg shadow-primary/30" />

                    {/* Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${item.isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <item.icon className="size-4 text-primary" />
                            </div>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                          </div>
                          <CardDescription className="text-primary/80 font-medium text-sm">
                            {'school' in item ? `${item.school} · ${item.dept}` : item.company}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Badge variant="outline" className="text-xs mb-3 border-primary/20 text-primary/70">
                            {item.period}
                          </Badge>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </FloatingSection>
              ))}
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ════════ PROJECTS ════════ */}
        <section id="projects" className="py-20 md:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FloatingSection>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[oklch(0.75_0.18_295)] to-[oklch(0.6_0.22_310)] bg-clip-text text-transparent">
                  {t.projects.title}
                </h2>
                <p className="text-muted-foreground text-lg">{t.projects.subtitle}</p>
                <div className="w-20 h-1 bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.55_0.2_320)] rounded-full mx-auto mt-4" />
              </div>
            </FloatingSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS_DATA.map((project, pi) => (
                <FloatingSection key={project.title} delay={pi * 0.1}>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="group h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.2_295)] to-[oklch(0.45_0.18_310)] text-white">
                            <project.icon className="size-5" />
                          </div>
                          <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm leading-relaxed mb-4">
                          {project.desc}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-primary/5 text-primary/70 border-primary/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </FloatingSection>
              ))}
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ════════ TECH STACK ════════ */}
        <section id="skills" className="py-20 md:py-32 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FloatingSection>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[oklch(0.75_0.18_295)] to-[oklch(0.6_0.22_310)] bg-clip-text text-transparent">
                  {t.skills.title}
                </h2>
                <p className="text-muted-foreground text-lg">{t.skills.subtitle}</p>
                <div className="w-20 h-1 bg-gradient-to-r from-[oklch(0.65_0.25_295)] to-[oklch(0.55_0.2_320)] rounded-full mx-auto mt-4" />
              </div>
            </FloatingSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS_DATA[lang].map((group, gi) => (
                <FloatingSection key={group.category} delay={gi * 0.08}>
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-base">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-[oklch(0.55_0.2_295)] to-[oklch(0.45_0.18_310)] text-white">
                          <group.icon className="size-4" />
                        </div>
                        {group.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                          <div
                            key={skill.name}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-sm text-foreground/80 hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                          >
                            <div
                              className="size-2 rounded-full"
                              style={{ backgroundColor: skill.color }}
                            />
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FloatingSection>
              ))}
            </div>
          </div>
        </section>

        <Separator className="max-w-5xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* ════════ GET IN TOUCH ════════ */}
        <section id="contact" className="py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FloatingSection>
              <div className="mb-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[oklch(0.75_0.18_295)] to-[oklch(0.6_0.22_310)] bg-clip-text text-transparent">
                  {t.contact.title}
                </h2>
                <p className="text-2xl md:text-3xl text-foreground font-semibold mb-3">
                  {t.contact.subtitle}
                </p>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  {t.contact.desc}
                </p>
              </div>
            </FloatingSection>

            <FloatingSection delay={0.15}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Button size="lg" className="text-base px-8 bg-gradient-to-r from-[oklch(0.6_0.22_295)] to-[oklch(0.55_0.2_310)] hover:from-[oklch(0.65_0.24_295)] hover:to-[oklch(0.6_0.22_310)] shadow-lg shadow-primary/20" asChild>
                  <a href="https://github.com/caglaeren" target="_blank" rel="noopener noreferrer">
                    <Github className="size-4 mr-2" />
                    {t.contact.github}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/50" asChild>
                  <a href="mailto:tugbacaglaeren@gmail.com">
                    <Mail className="size-4 mr-2" />
                    {t.contact.email}
                  </a>
                </Button>
              </div>
            </FloatingSection>
          </div>
        </section>
      </main>

      {/* ════════ FOOTER ════════ */}
      <footer className="border-t border-border/40 bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-5">
            <DiamondLogo size={32} />
            <p className="text-sm text-muted-foreground text-center">
              &copy; 2026 Tuğba Çağla EREN. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: 'https://github.com/caglaeren', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/cagla-eren/', label: 'LinkedIn' },
                { icon: Instagram, href: 'https://www.instagram.com/cagllaeren/', label: 'Instagram' },
                { icon: Mail, href: 'mailto:tugbacaglaeren@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ════════ BOTTOM NAV (appears on scroll) ════════ */}
      <AnimatePresence>
        {showBottomNav && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-4 mb-4 rounded-2xl bg-background/70 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5 p-2">
              <div className="flex items-center justify-around">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <item.icon className="size-4" />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════ BACK TO TOP ════════ */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.div
            className="fixed bottom-20 md:bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              size="icon"
              onClick={scrollToTop}
              className="rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/20 bg-gradient-to-br from-[oklch(0.6_0.22_295)] to-[oklch(0.5_0.2_310)] text-white"
              aria-label="Back to top"
            >
              <ChevronUp className="size-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
