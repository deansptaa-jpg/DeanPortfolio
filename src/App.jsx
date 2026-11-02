import { useState } from 'react'
import Particles3D from "./components/Particles3D";
import { motion, useMotionValue, useSpring, useScroll } from 'framer-motion'

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  GraduationCap,
  Laptop,
  Mail,
  Menu,
  Monitor,
  Send,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'OutdoorRent',
    category: 'WEB APPLICATION',
    description:
      'A web-based platform designed to simplify the process of browsing and renting outdoor equipment through an organized product catalog.',
    tags: ['Laravel', 'PHP', 'MySQL'],
    icon: Laptop,
  },
  {
    number: '02',
    title: 'Data Analysis',
    category: 'DATA ANALYTICS',
    description:
      'A data analysis project focused on exploring datasets, identifying patterns, and generating meaningful insights using KNIME.',
    tags: ['KNIME', 'Data Analysis'],
    icon: Monitor,
  },
  {
    number: '03',
    title: 'Database Security',
    category: 'DATABASE SYSTEM',
    description:
      'A database security project focused on access control, data protection, and implementing security policies using SQL.',
    tags: ['SQL', 'Database', 'Security'],
    icon: Code2,
  },
]

const technologies = [
  { name: 'HTML', level: 'Basic', icon: Code2 },
  { name: 'CSS', level: 'Basic', icon: Code2 },
  { name: 'JavaScript', level: 'Learning', icon: Terminal },
  { name: 'React', level: 'Learning', icon: Code2 },
  { name: 'PHP', level: 'Learning', icon: Terminal },
  { name: 'Laravel', level: 'Learning', icon: Laptop },
  { name: 'MySQL', level: 'Basic', icon: Monitor },
  { name: 'Git', level: 'Learning', icon: Terminal },
]

const education = [
  {
    period: '2025 — PRESENT',
    title: 'S1 Sistem Informasi',
    place: 'Universitas Bina Sarana Informatika',
    detail:
      'Mempelajari sistem informasi, basis data, analisis data, dan pengembangan aplikasi.',
    icon: GraduationCap,
  },
  {
    period: 'PREVIOUS EXPERIENCE',
    title: 'Praktik Kerja Lapangan',
    place: 'Sekretariat Daerah Kabupaten Bogor',
    detail:
      'Pengalaman PKL saat SMK dengan tugas membantu input data menggunakan komputer.',
    icon: BriefcaseBusiness,
  },
]

function SectionHeading({ label, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-12 text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-blue-300">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
        {label}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  // Cursor spotlight + smooth page progress for a more immersive experience.
  const pointerX = useSpring(useMotionValue(-500), { stiffness: 90, damping: 22, mass: 0.25 })
  const pointerY = useSpring(useMotionValue(-500), { stiffness: 90, damping: 22, mass: 0.25 })
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.2 })

  // Ganti dengan alamat email kamu yang benar.
  const email = 'deansptaa@gmail.com'

  const navigation = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div
      className="site-shell relative min-h-screen overflow-hidden bg-[#050816] text-slate-200"
      onMouseMove={(event) => { pointerX.set(event.clientX); pointerY.set(event.clientY) }}
    >
      {/* Cinematic scroll progress */}
      <motion.div className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-cyan-300 to-violet-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" style={{ scaleX: smoothProgress }} />
      {/* Cursor-following ambient spotlight (automatically subtle on touch devices) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[2] hidden h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.055] blur-[75px] md:block"
        style={{ left: pointerX, top: pointerY }}
      />
      {/* 3D Depth Particles */}
      <Particles3D />

      {/* Background */}
      <div className="grid-background pointer-events-none fixed inset-0" />
      <div className="ambient-glow ambient-glow-one pointer-events-none fixed" />
      <div className="ambient-glow ambient-glow-two pointer-events-none fixed" />
      {/* Animated atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-32 top-[18%] h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]"
          animate={{ x: [0, 70, 0], y: [0, 45, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-28 top-[48%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]"
          animate={{ x: [0, -55, 0], y: [0, -60, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
        />
        {Array.from({ length: 18 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-200/60 shadow-[0_0_12px_rgba(103,232,249,0.7)]"
            style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 23 + 7) % 100}%` }}
            animate={{ y: [0, -18 - (i % 4) * 7, 0], opacity: [0.15, 0.8, 0.15], scale: [0.7, 1.25, 0.7] }}
            transition={{ duration: 3 + (i % 5), delay: i * 0.17, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#050816]/90 backdrop-blur-2xl"
      >
        <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* BRAND */}
          <a href="#home" className="group flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/[0.08] text-sm font-extrabold tracking-wider text-blue-300 transition duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-500/15">
              DS
            </div>

            <div className="flex flex-col">
              <span className="text-[16px] font-bold tracking-[0.08em] text-white">
                DEAN<span className="text-blue-400">.DEV</span>
              </span>

              <span className="mt-1 text-[9px] font-medium tracking-[0.22em] text-slate-500">
                PERSONAL PORTFOLIO
              </span>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[13px] font-medium tracking-wide text-slate-400 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-blue-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* CONTACT */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/[0.08] px-5 py-3 text-[13px] font-semibold text-blue-200 transition-all duration-300 hover:border-blue-400/60 hover:bg-blue-500/15 hover:text-white lg:inline-flex"
          >
            Let's Talk
            <ArrowUpRight size={16} />
          </a>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-slate-300 transition hover:border-blue-400/40 hover:text-white lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="border-t border-white/[0.07] bg-[#080d20]/95 px-5 py-5 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-blue-500/[0.08] hover:text-blue-300"
                >
                  {item.label}
                  <ArrowUpRight size={15} className="text-slate-600" />
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-4 py-3.5 text-sm font-semibold text-blue-200"
              >
                Let's Talk
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        )}
      </motion.header>

      <main className="relative z-10">
        {/* Hero */}
        <section
          id="home"
          className="mx-auto flex min-h-screen max-w-7xl scroll-mt-20 items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12"
        >
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-4 py-2.5 text-xs text-blue-200 sm:text-sm">
                <Sparkles size={15} className="text-cyan-300" />
                Information Systems Student
                <span className="ml-1 h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <p className="mb-3 text-sm tracking-[0.25em] text-slate-400">
                HELLO, I&apos;M
              </p>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } } }}
                className="text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl"
              >
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 35, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>Dean Septa</motion.span>
                <br />
                <motion.span className="hero-gradient neon-text inline-block" variants={{ hidden: { opacity: 0, y: 35, filter: 'blur(8px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Ramadhan.</motion.span>
              </motion.h1>

              <h2 className="mt-6 text-xl font-semibold text-slate-300 sm:text-2xl">
                Aspiring <span className="text-blue-300">System Analyst & Web Developer</span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
                I am an Information Systems student with a strong interest in web development, digital technology, and data analysis. I continuously develop my technical and analytical skills through various projects, learning experiences, and new challenges to create innovative and meaningful digital solutions.

              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ y: -3, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Explore My Work
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ y: -3, scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-white/[0.025] px-6 py-3.5 text-sm font-semibold transition hover:border-blue-400/50 hover:text-blue-300"
                >
                  <Mail size={17} />
                  Contact Me
                </motion.a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/[0.08] pt-7">
                <div>
                  <p className="text-2xl font-bold text-white">
                    03<span className="text-blue-400">+</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Learning Projects</p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="text-2xl font-bold text-white">
                    08<span className="text-blue-400">+</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Technologies Explored</p>
                </div>

                <div className="h-10 w-px bg-white/10" />

                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="mt-1 text-xs text-slate-500">Learning Mindset</p>
                </div>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, rotateY: 12, y: 24 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, y: [0, -7, 0] }}
              whileHover={{ rotateY: -3, rotateX: 2, scale: 1.015 }}
              transition={{ opacity: { duration: 0.8, delay: 0.15 }, scale: { duration: 0.9, delay: 0.15 }, rotateY: { duration: 0.9, delay: 0.15 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
              style={{ transformPerspective: 1000 }}
              className="order-1 mx-auto w-full max-w-[430px] lg:order-2"
            >
              <div className="relative mx-auto aspect-[4/4.5] max-w-[390px]">
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 top-8 z-20 h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_22px_7px_rgba(34,211,238,0.55)]"
                  animate={{ x: [0, -12, 0], y: [0, 26, 0], scale: [0.8, 1.25, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="portrait-orbit absolute -inset-4 rounded-[38px] border border-blue-400/20" />
                <motion.div
                  className="portrait-orbit portrait-orbit-delayed absolute -inset-8 rounded-[46px] border border-cyan-400/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute -inset-5 rounded-[42px] border border-dashed border-blue-300/15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
                />

                <div className="absolute -left-5 top-16 h-20 w-20 rounded-full bg-blue-600/20 blur-3xl" />
                <div className="absolute -right-8 bottom-10 h-28 w-28 rounded-full bg-cyan-500/20 blur-3xl" />

                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[3px] rounded-[33px] bg-[conic-gradient(from_0deg,transparent_0deg,#38bdf8_65deg,transparent_130deg,#818cf8_220deg,transparent_300deg)] opacity-80 blur-[2px]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                />
                <div className="neon-border absolute inset-0 overflow-hidden rounded-[30px] bg-[#0b1227] p-2">
                  <div className="relative h-full overflow-hidden rounded-[23px] bg-[#080d1d]">
                    <img
                      src="/images/dean.jpeg"
                      alt="Foto Dean Septa Ramadhan"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/15 via-transparent to-cyan-300/15 mix-blend-screen"
                      animate={{ opacity: [0.15, 0.55, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/20 to-transparent"
                      animate={{ y: ['-100%', '440%'] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                    />
                    <div className="portrait-scan pointer-events-none absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050816] via-[#050816]/60 to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs tracking-[0.2em] text-blue-300">
                        INFORMATION SYSTEMS
                      </p>
                      <p className="mt-2 text-2xl font-bold text-white">
                        Dean Septa Ramadhan
                      </p>
                      <div className="mt-4 h-px bg-gradient-to-r from-blue-400/70 via-cyan-300/30 to-transparent" />
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="float-card absolute -left-9 top-[27%] hidden items-center gap-3 rounded-xl border border-blue-400/20 bg-[#0a1022]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
                >
                  <div className="rounded-lg bg-blue-500/15 p-2 text-blue-300">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">

                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">

                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="float-card float-card-delayed absolute -right-5 bottom-[22%] hidden items-center gap-3 rounded-xl border border-cyan-400/20 bg-[#0a1022]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:flex"
                >
                  <div className="rounded-lg bg-cyan-500/15 p-2 text-cyan-300">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <a
            href="#about"
            className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.22em] text-slate-500 hover:text-blue-300 md:flex"
          >
            SCROLL TO EXPLORE
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading
              label="ABOUT ME"
              title={
                <>
                  A Little Bit <span className="hero-gradient">About Me</span>
                </>
              }
              description="Get to know my background, interests, and the journey I'm currently building."
            />

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="neon-border rounded-2xl bg-[#0a1022]/80 p-7 sm:p-9">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-300">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Who I Am</p>
                    <p className="mt-1 text-xs text-slate-500">
                      A curious mind in technology
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-8 text-slate-400 sm:text-base">
                  My interest in technology drives me to continuously explore how digital solutions can improve business processes and solve real-world problems.
                </p>

                <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                  As an Information Systems student, I am developing my knowledge in system analysis, database management, and web development. I also gained practical experience during my internship at the Bogor Regency Regional Secretariat, where I was involved in computer-based data entry and administrative activities.

                  I am committed to continuously improving my technical and analytical skills, with the goal of contributing to meaningful technology projects and growing as a professional in the IT industry.

                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {[
                    'Curious',
                    'Adaptable',
                    'Problem Solving',
                    'Continuous Learning',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-700/80 bg-white/[0.025] px-3 py-2 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                <div className="neon-border rounded-2xl bg-[#0a1022]/80 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-300">
                      <GraduationCap size={22} />
                    </div>
                    <span className="text-xs text-slate-600">01 / EDUCATION</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Information Systems
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Universitas Bina Sarana Informatika
                  </p>
                  <p className="mt-4 text-xs leading-6 text-slate-500">
                    Fokus belajar: sistem informasi, basis data, dan pengembangan aplikasi.
                  </p>
                </div>

                <div className="neon-border rounded-2xl bg-[#0a1022]/80 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
                      <BriefcaseBusiness size={22} />
                    </div>
                    <span className="text-xs text-slate-600">02 / EXPERIENCE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">PKL Experience</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Sekretariat Daerah Kabupaten Bogor
                  </p>
                  <p className="mt-4 text-xs leading-6 text-slate-500">
                    Membantu proses input data menggunakan komputer saat PKL di SMK.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading
              label="SELECTED WORK"
              title={
                <>
                  My <span className="hero-gradient">Projects</span>
                </>
              }
              description="Beberapa proyek pembelajaran untuk mengembangkan kemampuan di bidang teknologi."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => {
                const ProjectIcon = project.icon

                return (
                  <motion.article
                    key={project.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02, rotateX: 1.5 }}
                    whileTap={{ scale: 0.99 }}
                    className="project-card group overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0a1022]/85"
                  >
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/5">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
                      <div className="absolute h-36 w-36 rounded-full border border-blue-300/10" />
                      <div className="absolute h-28 w-28 rounded-full border border-cyan-300/15" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-300/25 bg-[#080e20]/80 text-blue-300 shadow-lg shadow-blue-950/30 transition duration-300 group-hover:scale-110">
                        <ProjectIcon size={34} strokeWidth={1.4} />
                      </div>
                      <span className="absolute right-5 top-5 text-xs tracking-[0.2em] text-blue-200/60">
                        {project.number}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-300">
                        {project.category}
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-400">
                        {project.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-slate-700/80 bg-white/[0.025] px-2.5 py-1.5 text-[11px] text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
                        <span className="text-xs text-slate-500">
                          Academic Project
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-300">
                          Project Overview <ArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section
          id="skills"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading
              label="MY TOOLKIT"
              title={
                <>
                  Tech <span className="hero-gradient">Stack</span>
                </>
              }
              description="Teknologi yang sedang saya pelajari dan gunakan dalam proses membangun proyek."
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {technologies.map((tech, index) => {
                const TechIcon = tech.icon

                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.025 }}
                    className="tech-chip neon-border rounded-xl bg-[#0a1022]/75 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-blue-400/15 bg-blue-500/10 p-2.5 text-blue-300">
                        <TechIcon size={21} />
                      </div>
                      <span className="text-[10px] text-slate-600">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-semibold text-white">{tech.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{tech.level}</p>

                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
                        style={{
                          width: tech.level === 'Basic' ? '35%' : '22%',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <p className="mt-6 text-center text-xs text-slate-600">
              Tingkat kemampuan merupakan perkiraan progres belajar saat ini.
            </p>
          </div>
        </section>

        {/* Certificates */}
        <section
          id="certificates"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <SectionHeading
              label="CERTIFICATION"
              title={
                <>
                  My <span className="hero-gradient">Certificate</span>
                </>
              }
              description="A record of my learning journey and competency development in information technology."
            />

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="project-card mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-blue-400/20 bg-[#0a1022]/85 shadow-2xl shadow-blue-950/20 md:grid-cols-[1.05fr_0.95fr]"
            >
              <a
                href="/certificates/sertifikat-database.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block min-h-[260px] overflow-hidden bg-[#080d1d] p-4 sm:p-6"
                aria-label="View Database Systems certificate"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10" />
                <img
                  src="/images/sertifikat-database.png"
                  alt="Database Systems Competency Assessment certificate"
                  className="relative h-full max-h-[420px] w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.025]"
                />
                <span className="absolute bottom-8 right-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#050816]/85 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">
                  Preview certificate <ArrowUpRight size={14} />
                </span>
              </a>

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-cyan-200">
                    INTERMEDIATE
                  </span>
                  <span className="rounded-full border border-slate-700 bg-white/[0.03] px-3 py-1.5 text-[10px] tracking-[0.12em] text-slate-400">
                    14 JP
                  </span>
                </div>

                <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-300">
                  DATABASE SYSTEMS
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Industry-Based Database Systems Competency Assessment
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  Uji profisiensi berbasis industri keilmuan Sistem Basis Data,
                  meliputi workshop, pengerjaan projek, dan uji kompetensi.
                </p>

                <div className="mt-7 space-y-3 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">Issued by</span>
                    <span className="text-right font-medium text-slate-200">PT. Iner Corp Indonesia</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="font-medium text-slate-200">June 25, 2026</span>
                  </div>
                </div>

                <a
                  href="/certificates/sertifikat-database.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:-translate-y-0.5 hover:shadow-cyan-900/30"
                >
                  View Certificate <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Experience and Education */}
        <section
          id="experience"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
            <SectionHeading
              label="MY JOURNEY"
              title={
                <>
                  Experience & <span className="hero-gradient">Education</span>
                </>
              }
              description="Perjalanan pendidikan dan pengalaman yang membentuk proses belajar saya."
            />

            <div className="relative ml-3 space-y-8 border-l border-blue-400/20 pl-8 sm:ml-8 sm:pl-10">
              {education.map((item, index) => {
                const ItemIcon = item.icon

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[43px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/40 bg-[#080d1d] text-blue-300 sm:-left-[53px]">
                      <ItemIcon size={14} />
                    </div>

                    <div className="neon-border rounded-2xl bg-[#0a1022]/80 p-6 sm:p-8">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-300">
                        {item.period}
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{item.place}</p>
                      <p className="mt-4 text-sm leading-7 text-slate-400">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-white/[0.04] py-24 sm:py-28"
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#0a1022]/90 p-8 sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-600/15 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center"
              >
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-3 py-2 text-xs text-blue-300">
                    <Mail size={14} /> GET IN TOUCH
                  </div>

                  <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                    Let&apos;s Build Something
                    <br />
                    <span className="hero-gradient">
                      Meaningful Together.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
                    Punya pertanyaan, ide proyek, atau ingin berdiskusi tentang
                    teknologi? Silakan hubungi saya melalui email.
                  </p>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mt-7 inline-flex items-center gap-3 rounded-xl border border-slate-700 bg-white/[0.025] px-4 py-3 text-left transition hover:border-blue-400/40"
                  >
                    <Mail size={18} className="text-blue-300" />
                    <span className="text-sm text-slate-300">{email}</span>
                    {copied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <span className="text-xs text-slate-500">Copy</span>
                    )}
                  </button>

                  {/* Tombol LinkedIn dan Instagram */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://www.linkedin.com/in/dean-septa-ramadhan-b5673a446/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-300 transition hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-500/20 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8Zm-.02-3.1a1.55 1.55 0 1 0-3.1 0 1.55 1.55 0 0 0 3.1 0ZM18.33 13.4c0-2.4-1.28-3.52-2.98-3.52a2.58 2.58 0 0 0-2.32 1.28V10h-2.67v8h2.67v-4.1c0-1.08.2-2.13 1.55-2.13 1.33 0 1.35 1.24 1.35 2.2V18h2.67l-.27-4.6Z" />
                      </svg>
                      LinkedIn
                    </a>

                    <a
                      href="https://www.instagram.com/deanseptaramadhan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-pink-400/30 bg-pink-500/10 px-4 py-3 text-sm font-medium text-pink-300 transition hover:-translate-y-1 hover:border-pink-400 hover:bg-pink-500/20 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm5.5-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                      </svg>
                      Instagram
                    </a>
                  </div>
                </div>


                <div className="space-y-4">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Hello Dean')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-500"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <Send size={18} /> Send Me an Email
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="https://wa.me/62895379062725?text=Hello%20Dean%2C%20I%20visited%20your%20portfolio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:bg-green-500"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <MessageCircle size={18} /> Contact Me on WhatsApp
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>

                  <div className="flex items-center gap-3 pt-3 text-xs text-slate-500">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    READY TO GROW & CONTRIBUTE
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">

          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-xs font-black text-blue-300">
              DS
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                DEAN<span className="text-blue-400">.DEV</span>
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Personal Portfolio
              </p>
            </div>
          </a>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Dean Septa Ramadhan. Built with React.
          </p>

          <div className="flex items-center gap-3">

            {/* GitHub */}
            <a
              href="https://dean-portfolio-psi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="rounded-lg border border-slate-800 p-2.5 text-slate-400 transition hover:-translate-y-1 hover:border-blue-400/30 hover:text-blue-300"
            >
              <Code2 size={17} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/dean-septa-ramadhan-b5673a446/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="rounded-lg border border-slate-800 p-2.5 text-slate-400 transition hover:-translate-y-1 hover:border-blue-400/30 hover:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8Zm-.02-3.1a1.55 1.55 0 1 0-3.1 0 1.55 1.55 0 0 0 3.1 0ZM18.33 13.4c0-2.4-1.28-3.52-2.98-3.52a2.58 2.58 0 0 0-2.32 1.28V10h-2.67v8h2.67v-4.1c0-1.08.2-2.13 1.55-2.13 1.33 0 1.35 1.24 1.35 2.2V18h2.67l-.27-4.6Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/deanseptaramadhan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="rounded-lg border border-slate-800 p-2.5 text-slate-400 transition hover:-translate-y-1 hover:border-pink-400/30 hover:text-pink-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="0.8" fill="currentColor" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              title="Email"
              className="rounded-lg border border-slate-800 p-2.5 text-slate-400 transition hover:-translate-y-1 hover:border-blue-400/30 hover:text-blue-300"
            >
              <Mail size={17} />
            </a>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
