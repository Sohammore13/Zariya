import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
    MessageCircleIcon,
    PhoneCallIcon,
    ShieldCheckIcon,
    ZapIcon,
    ArrowRightIcon,
    LockIcon,
    SparklesIcon,
    StarIcon,
    CheckIcon,
    MenuIcon,
    XIcon,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const features = [
    {
        icon: MessageCircleIcon,
        title: "Real-time Messaging",
        description: "Send and receive messages the instant you type them. No delays, no refreshes — just fluid conversation.",
        gradient: "from-indigo-500 to-violet-500",
        bg: "bg-indigo-50",
        border: "border-indigo-100",
        iconBg: "bg-indigo-600",
    },
    {
        icon: PhoneCallIcon,
        title: "Crystal-clear Voice Calls",
        description: "WebRTC-powered, peer-to-peer voice calls. No servers in the middle — your voice goes straight to them.",
        gradient: "from-violet-500 to-fuchsia-500",
        bg: "bg-violet-50",
        border: "border-violet-100",
        iconBg: "bg-violet-600",
    },
    {
        icon: ShieldCheckIcon,
        title: "Private by Design",
        description: "Your conversations belong to you. No tracking, no data selling, no ads — just a clean, private space.",
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        iconBg: "bg-emerald-600",
    },
    {
        icon: ZapIcon,
        title: "Lightning Fast",
        description: "Built on modern infrastructure for near-instant delivery. Messages fly even on slower networks.",
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
        iconBg: "bg-amber-500",
    },
    {
        icon: LockIcon,
        title: "Secure Auth",
        description: "JWT-based authentication with hashed passwords. Your account is locked down from day one.",
        gradient: "from-sky-500 to-cyan-500",
        bg: "bg-sky-50",
        border: "border-sky-100",
        iconBg: "bg-sky-600",
    },
    {
        icon: SparklesIcon,
        title: "Clean Interface",
        description: "A minimal, distraction-free UI designed so the conversation — not the app — is the focus.",
        gradient: "from-rose-500 to-pink-500",
        bg: "bg-rose-50",
        border: "border-rose-100",
        iconBg: "bg-rose-500",
    },
];

const steps = [
    { step: "01", title: "Create your account", desc: "Sign up in under 30 seconds — no credit card, no fuss.", color: "from-indigo-500 to-violet-500" },
    { step: "02", title: "Find your people", desc: "Search for friends by name and connect instantly.", color: "from-violet-500 to-fuchsia-500" },
    { step: "03", title: "Start talking", desc: "Chat or call — Zariya gets out of the way and lets you connect.", color: "from-fuchsia-500 to-pink-500" },
];

const testimonials = [
    { name: "Aisha K.", role: "Student", quote: "Finally an app that just works. No bloat, no ads — love it.", stars: 5, color: "from-indigo-400 to-violet-500" },
    { name: "Rohan M.", role: "Software Engineer", quote: "WebRTC calls with zero lag. Zariya absolutely nailed it.", stars: 5, color: "from-violet-400 to-fuchsia-500" },
    { name: "Priya S.", role: "Designer", quote: "The UI is so clean. I actually enjoy opening this app every day.", stars: 5, color: "from-fuchsia-400 to-pink-500" },
];

const stats = [
    { value: "100%", label: "Free forever" },
    { value: "0", label: "Ads, ever" },
    { value: "E2E", label: "Encrypted calls" },
    { value: "< 1s", label: "Message delivery" },
];

// ─── Animated counter ───────────────────────────────────────────────────────

function useInView(ref) {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);
    return inView;
}

// ─── Component ──────────────────────────────────────────────────────────────

function LandingPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-inter overflow-x-hidden">

            {/* ── NAVBAR ──────────────────────────────────────────────────── */}
            <nav
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                        ? "bg-white/90 backdrop-blur-xl shadow-sm shadow-gray-100 border-b border-gray-100"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
                            <img src="/logo.png" alt="Zariya" className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-xl font-black text-gray-900 tracking-tight">Zariya</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        {["#features", "#how", "#love"].map((href, i) => (
                            <a
                                key={href}
                                href={href}
                                className="hover:text-indigo-600 transition-colors relative group"
                            >
                                {["Features", "How it works", "Reviews"][i]}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-px duration-200"
                        >
                            Get started →
                        </Link>
                    </div>

                    <button
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
                        <a href="#features" className="text-sm font-medium text-gray-600 py-2">Features</a>
                        <a href="#how" className="text-sm font-medium text-gray-600 py-2">How it works</a>
                        <a href="#love" className="text-sm font-medium text-gray-600 py-2">Reviews</a>
                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                            <Link to="/login" className="flex-1 text-sm font-semibold text-center text-gray-700 py-2.5 rounded-xl border border-gray-200">Sign in</Link>
                            <Link to="/signup" className="flex-1 text-sm font-bold text-center bg-indigo-600 text-white py-2.5 rounded-xl">Get started</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── HERO ────────────────────────────────────────────────────── */}
            <section className="relative flex flex-col items-center justify-center px-6 pt-16 pb-32 overflow-hidden bg-white">
                {/* Gradient orbs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-br from-indigo-100 via-violet-100 to-fuchsia-100 opacity-60 blur-3xl rounded-full" />
                    <div className="absolute top-20 -left-20 w-80 h-80 bg-indigo-200 opacity-30 blur-[120px] rounded-full" />
                    <div className="absolute top-20 -right-20 w-80 h-80 bg-violet-200 opacity-30 blur-[120px] rounded-full" />
                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)`,
                            backgroundSize: "48px 48px",
                        }}
                    />
                </div>

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    {/* Announcement badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 rounded-full mb-8 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                        100% Free · No ads · Open to all
                        <ArrowRightIcon className="w-3 h-3" />
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500 to-violet-500 blur-2xl opacity-40 scale-110 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[28px] shadow-2xl shadow-indigo-300 ring-4 ring-white flex items-center justify-center">
                                <img src="/logo.png" alt="Zariya" className="w-16 h-16 object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.08] tracking-[-0.04em] mb-6">
                        Connect with{" "}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                Zariya
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full opacity-50" />
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
                        A fast, private chat &amp; voice-calling platform built for people who value real connection over noise.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                        <Link
                            to="/signup"
                            className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 duration-300 text-[0.95rem]"
                        >
                            Start for free
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-2xl border border-gray-200 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 duration-300 text-[0.95rem]"
                        >
                            I have an account
                        </Link>
                    </div>

                    {/* Trust row */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
                        {["No credit card required", "No ads, ever", "WebRTC encrypted calls", "Open source spirit"].map((t) => (
                            <span key={t} className="flex items-center gap-1.5">
                                <CheckIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Chat mockup */}
                    <div className="mt-16 max-w-[22rem] mx-auto bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/80 border border-gray-100 overflow-hidden ring-1 ring-gray-100">
                        {/* Header */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-indigo-50/30">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-black shadow">A</div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-gray-800">Aisha</div>
                                <div className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-pulse" />
                                    Online
                                </div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                                <PhoneCallIcon className="w-3.5 h-3.5 text-indigo-600" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="p-4 space-y-3 text-left bg-gray-50/40">
                            <div className="flex justify-end">
                                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] shadow-sm leading-relaxed">
                                    Hey! Are you free to talk?
                                </div>
                            </div>
                            <div className="flex">
                                <div className="bg-white text-gray-700 text-xs rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[78%] shadow-sm leading-relaxed border border-gray-100">
                                    Yeah! Give me a second 😊
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[78%] shadow-sm leading-relaxed">
                                    Calling you now 📞
                                </div>
                            </div>
                            {/* Typing */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">A</div>
                                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1 shadow-sm border border-gray-100">
                                    {[0, 150, 300].map((d) => (
                                        <span key={d} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Input bar */}
                        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 bg-white">
                            <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 text-[11px] text-gray-400">Type a message…</div>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow">
                                <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ─────────────────────────────────────────────── */}
            <section ref={statsRef} className="py-16 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <div className={`text-3xl md:text-4xl font-black text-white mb-1 transition-all duration-700 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                                {s.value}
                            </div>
                            <div className="text-indigo-200 text-sm font-medium">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ────────────────────────────────────────────────── */}
            <section id="features" className="py-28 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
                            Features
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-[-0.03em] leading-tight">
                            Everything you need,<br />
                            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">nothing you don't</span>
                        </h2>
                        <p className="mt-4 text-gray-400 text-base max-w-md mx-auto leading-relaxed">
                            Zariya is lean, fast, and powerful — every feature earns its place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    className={`group relative ${f.bg} border ${f.border} rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default overflow-hidden`}
                                >
                                    {/* Corner decoration */}
                                    <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${f.gradient} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`} />

                                    <div className={`w-12 h-12 bg-gradient-to-br ${f.gradient} flex items-center justify-center rounded-2xl mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                        <Icon className="w-5.5 h-5.5 text-white w-6 h-6" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
            <section id="how" className="py-28 px-6 bg-gray-50/70">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-xs font-bold text-violet-600 uppercase tracking-widest bg-violet-50 border border-violet-100 px-3 py-1 rounded-full mb-4">
                            How it works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-[-0.03em]">
                            Up and running in{" "}
                            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">3 steps</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connector */}
                        <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-fuchsia-200" />

                        {steps.map((s) => (
                            <div key={s.step} className="relative flex flex-col items-center text-center group">
                                <div className={`w-16 h-16 bg-gradient-to-br ${s.color} text-white rounded-2xl flex items-center justify-center text-lg font-black shadow-lg mb-5 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                                    {s.step}
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full group-hover:shadow-md transition-shadow">
                                    <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
            <section id="love" className="py-28 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block text-xs font-bold text-fuchsia-600 uppercase tracking-widest bg-fuchsia-50 border border-fuchsia-100 px-3 py-1 rounded-full mb-4">
                            Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-[-0.03em]">
                            People{" "}
                            <span className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">love</span>
                            {" "}Zariya
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.name} className="relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                                {/* Quote mark decoration */}
                                <div className="absolute top-4 right-5 text-6xl font-black text-gray-100 leading-none select-none group-hover:text-indigo-50 transition-colors">"</div>

                                <div className="flex gap-0.5 mb-4">
                                    {Array.from({ length: t.stars }).map((_, i) => (
                                        <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-6 relative z-10">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">{t.name}</div>
                                        <div className="text-xs text-gray-400">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 rounded-3xl px-8 py-16 text-center overflow-hidden shadow-2xl shadow-indigo-200">
                        {/* Decorative blobs */}
                        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                        {/* Grid */}
                        <div
                            className="absolute inset-0 opacity-[0.06] rounded-3xl"
                            style={{
                                backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)`,
                                backgroundSize: "32px 32px",
                            }}
                        />

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl ring-2 ring-white/30">
                                <img src="/logo.png" alt="" className="w-10 h-10 object-contain" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-[-0.03em]">
                                Ready to connect?
                            </h2>
                            <p className="text-indigo-200 text-base mb-10 leading-relaxed max-w-md mx-auto">
                                Join Zariya for free. No ads, no limits — just you and the people that matter.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    to="/signup"
                                    className="group inline-flex items-center gap-2.5 bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl text-[0.95rem] hover:-translate-y-1 duration-300"
                                >
                                    Create free account
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl border border-white/25 transition-all text-[0.95rem] hover:-translate-y-1 duration-300 backdrop-blur"
                                >
                                    Sign in instead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ──────────────────────────────────────────────────── */}
            <footer className="bg-white border-t border-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-sm">
                            <img src="/logo.png" alt="" className="w-5 h-5 object-contain" />
                        </div>
                        <span className="text-base font-extrabold text-gray-900">Zariya</span>
                    </div>

                    <div className="flex items-center gap-7 text-sm text-gray-400 font-medium">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#how" className="hover:text-indigo-600 transition-colors">How it works</a>
                        <Link to="/login" className="hover:text-indigo-600 transition-colors">Login</Link>
                        <Link to="/signup" className="hover:text-indigo-600 transition-colors">Sign Up</Link>
                    </div>

                    <p className="text-xs text-gray-400">© 2026 Zariya. Built with ❤️</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
