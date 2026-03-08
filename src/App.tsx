import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  Text,
  Html,
  Sparkles,
  MeshReflectorMaterial,
} from "@react-three/drei";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  BookOpen,
  ChevronRight,
  Info,
  Scale,
  ShieldCheck,
  Zap,
  Heart,
  Globe,
  Search,
  Menu,
  X,
  ArrowRight,
  Quote,
  Library,
  Compass,
  Activity,
  Layers,
  Database,
  Eye,
  FileText,
  MessageSquare,
  BarChart3,
  Map,
  History,
} from "lucide-react";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { REPORT_CONTENT } from "./constants";

// --- Custom Cursor Component ---
const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const followerX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const followerY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("button, a, .cursor-pointer"));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className={`custom-cursor ${isHovering ? "hovering" : ""}`}
        style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%" }}
      />
      <motion.div
        className="custom-cursor-follower"
        style={{ left: followerX, top: followerY, x: "-50%", y: "-50%" }}
      />
    </>
  );
};

// --- Mercy Simulator Component ---
const MercySimulator = () => {
  const [params, setParams] = useState({
    sincerity: 80,
    knowledge: 40,
    virtue: 70,
    circumstance: 90,
  });

  const data = useMemo(
    () => [
      { subject: "Sincerity", A: params.sincerity, fullMark: 100 },
      { subject: "Knowledge", A: params.knowledge, fullMark: 100 },
      { subject: "Virtue", A: params.virtue, fullMark: 100 },
      { subject: "Circumstance", A: params.circumstance, fullMark: 100 },
      { subject: "Divine Mercy", A: 100, fullMark: 100 },
    ],
    [params],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12 w-full">
      <div className="glass p-8 rounded-[2rem] border border-gold/20 bg-ink/50">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="text-gold" size={20} />
          <span className="mono text-xs uppercase tracking-[0.3em] text-gold font-bold">
            Soteriological Simulator
          </span>
        </div>

        <div className="space-y-8">
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <div className="flex justify-between mono text-[10px] uppercase tracking-widest text-white/60">
                <span>{key}</span>
                <span className="text-gold">{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    [key]: parseInt(e.target.value),
                  }))
                }
                className="w-full accent-gold bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gold/5 border border-gold/20 rounded-2xl">
          <div className="mono text-[10px] uppercase tracking-widest text-gold mb-2">
            Calculated Outcome
          </div>
          <p className="serif text-xl italic text-white">
            "The expansive logic of mercy suggests that{" "}
            {params.sincerity > 70 ? "sincere seeking" : "moral orientation"}{" "}
            combined with{" "}
            {params.circumstance > 50
              ? "mitigating circumstances"
              : "epistemic barriers"}{" "}
            points towards a wide gate of salvation."
          </p>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] border border-gold/20 flex items-center justify-center min-h-[400px] bg-ink/50">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(197, 160, 89, 0.2)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fill: "rgba(255,255,255,0.5)",
                fontSize: 10,
                fontFamily: "JetBrains Mono",
              }}
            />
            <Radar
              name="Soul Profile"
              dataKey="A"
              stroke="#c5a059"
              fill="#c5a059"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- Theological Dialogue Component ---
const TheologicalDialogue = () => {
  const [activeMessage, setActiveMessage] = useState(0);
  const dialogue = [
    {
      speaker: "Al-Ghazali",
      text: "The boundaries of faith are not sociological markers, but epistemic ones. One who has never heard the true message is excused.",
      role: "The Jurist-Mystic",
    },
    {
      speaker: "Ibn Taymiyyah",
      text: "Indeed, and even for those who have heard, if the message was distorted by slander, they are like those whom the call never reached.",
      role: "The Reformer",
    },
    {
      speaker: "Ibn Arabi",
      text: "Mercy is ontological. It precedes wrath. The very existence of a soul is a testament to the Divine's desire for that soul to return.",
      role: "The Great Master",
    },
    {
      speaker: "Fazlur Rahman",
      text: "We must look at the 'Double Movement'—from the historical context to the universal moral principle. The Qur'an is a moral summons first.",
      role: "The Modernist",
    },
  ];

  return (
    <div className="my-12 glass rounded-[3rem] overflow-hidden border border-gold/20 w-full bg-ink/50">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full min-h-[400px]">
        <div className="lg:col-span-1 border-r border-white/10 p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-gold" size={20} />
              <span className="mono text-xs uppercase tracking-[0.3em] text-gold font-bold">
                The Great Dialogue
              </span>
            </div>
            <h3 className="serif text-3xl italic text-white mb-8">
              Voices Across <br />
              the Tradition
            </h3>
          </div>
          <div className="space-y-4">
            {dialogue.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveMessage(i)}
                className={`w-full text-left p-4 rounded-xl transition-all ${activeMessage === i ? "bg-gold/10 border border-gold/30" : "hover:bg-white/5 border border-transparent"}`}
              >
                <div className="mono text-[10px] text-gold font-bold uppercase">
                  {d.speaker}
                </div>
                <div className="mono text-[8px] text-white/40 uppercase tracking-widest">
                  {d.role}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 p-12 flex items-center justify-center relative">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMessage}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              className="max-w-xl text-center"
            >
              <Quote className="text-gold/20 mx-auto mb-6" size={48} />
              <p className="serif text-2xl italic text-white leading-relaxed mb-6">
                "{dialogue[activeMessage].text}"
              </p>
              <div className="h-px w-12 bg-gold/30 mx-auto mb-4" />
              <div className="mono text-xs text-gold uppercase tracking-[0.4em] font-bold">
                {dialogue[activeMessage].speaker}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Scholarship Bento Component ---
const ScholarshipBento = () => {
  const scholars = [
    {
      id: "ghazali",
      name: "Al-Ghazali",
      era: "1058-1111 CE",
      concept: "Epistemic Excuse",
      tags: ["Sunni", "Theology", "Logic"],
      desc: "Distinguished between culpable rejection and innocent ignorance due to distorted exposure.",
      stat: "92%",
      statLabel: "Inclusivity Rating",
    },
    {
      id: "arabi",
      name: "Ibn Arabi",
      era: "1165-1240 CE",
      concept: "Ontological Mercy",
      tags: ["Sufi", "Metaphysics", "Universalism"],
      desc: "Existence itself is mercy. Hell is a purgatorial hospital for the purification of the soul.",
      stat: "∞",
      statLabel: "Mercy Scope",
    },
    {
      id: "taymiyyah",
      name: "Ibn Taymiyyah",
      era: "1263-1328 CE",
      concept: "Fana al-Nar",
      tags: ["Salafi", "Hanbali", "Purification"],
      desc: "Argued that Hell must eventually end, as eternal torment contradicts Divine Wisdom.",
      stat: "Finite",
      statLabel: "Hell Duration",
    },
    {
      id: "rahman",
      name: "Fazlur Rahman",
      era: "1919-1988 CE",
      concept: "Double Movement",
      tags: ["Modernist", "Hermeneutics"],
      desc: "Extracted universal moral principles from historical contexts to redefine modern ethics.",
      stat: "Dynamic",
      statLabel: "Contextualization",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12 w-full">
      {scholars.map((s, i) => (
        <motion.div
          key={s.id}
          whileHover={{ y: -5 }}
          className={`relative p-8 glass border border-gold/20 rounded-3xl overflow-hidden group bg-ink/50 ${i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"}`}
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <Library size={80} className="text-gold" />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h4 className="serif text-3xl mb-1 text-white">{s.name}</h4>
                <p className="mono text-[8px] uppercase tracking-widest text-white/60">
                  {s.era}
                </p>
              </div>
              <div className="text-right">
                <div className="serif text-2xl text-gold font-bold">
                  {s.stat}
                </div>
                <div className="mono text-[6px] uppercase tracking-widest text-white/40">
                  {s.statLabel}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/10 border border-white/20 rounded-md mono text-[8px] uppercase tracking-tighter text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="mono text-[10px] text-gold uppercase mb-2 font-bold">
                {s.concept}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- Verse Analysis Component ---
const VerseAnalysis = () => {
  const [activeVerse, setActiveVerse] = useState(0);
  const verses = [
    {
      ref: "Q 2:62",
      text: "Those who believe, Jews, Christians, and Sabians—whoever believes in God and the Last Day and does righteous deeds—will have their reward.",
      perspectives: [
        {
          school: "Classical",
          view: "Refers to pre-Islamic communities who followed their prophets faithfully.",
        },
        {
          school: "Sufi",
          view: "A universal promise for all who submit to the Divine Reality (islam).",
        },
        {
          school: "Modernist",
          view: "A clear rejection of religious tribalism in favor of ethical monotheism.",
        },
      ],
    },
    {
      ref: "Q 5:48",
      text: "To each of you God has prescribed a Law and a Way. If God would have willed, He would have made you a single people.",
      perspectives: [
        {
          school: "Legalist",
          view: "Acknowledges diversity but maintains the finality of the Islamic Shariah.",
        },
        {
          school: "Pluralist",
          view: "Diversity is a divine design feature, not a problem to be overcome.",
        },
        {
          school: "Esoteric",
          view: "Different paths are like different languages speaking the same truth.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 my-12 w-full">
      <div className="flex justify-center gap-4">
        {verses.map((v, i) => (
          <button
            key={i}
            onClick={() => setActiveVerse(i)}
            className={`px-6 py-3 rounded-full mono text-[10px] uppercase tracking-widest transition-all ${activeVerse === i ? "bg-gold text-ink font-bold" : "glass border border-gold/20 text-white/60 hover:text-white bg-ink/50"}`}
          >
            {v.ref}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-8 glass border border-gold/30 rounded-3xl flex flex-col justify-center bg-gold/10">
          <Quote className="text-gold mb-6" size={32} />
          <p className="serif text-2xl italic leading-relaxed text-white">
            "{verses[activeVerse].text}"
          </p>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {verses[activeVerse].perspectives.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-ink/50 border border-gold/20 rounded-2xl hover:border-gold/50 transition-colors glass"
            >
              <div className="mono text-[8px] uppercase tracking-widest text-gold mb-4 font-bold">
                {p.school} Perspective
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{p.view}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Mercy Matrix Component ---
const MercyMatrix = () => {
  const [point, setPoint] = useState({ x: 50, y: 50 });

  const getOutcome = (x: number, y: number) => {
    if (y > 70)
      return {
        title: "Inclusive Hope",
        desc: "High virtue overrides formal labels; divine mercy is anticipated.",
      };
    if (x < 30)
      return {
        title: "Ahl al-Fatra",
        desc: "Lack of authentic access grants divine excuse and amnesty.",
      };
    if (x > 70 && y < 30)
      return {
        title: "Culpable Kufr",
        desc: "Wilful rejection of recognized truth combined with moral corruption.",
      };
    return {
      title: "Divine Prerogative",
      desc: "A state of ambiguity where judgment belongs solely to the Creator.",
    };
  };

  const outcome = getOutcome(point.x, point.y);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-12 w-full">
      <div className="space-y-6 text-left">
        <div className="flex items-center gap-2">
          <Scale size={18} className="text-gold" />
          <span className="mono text-[10px] uppercase tracking-widest text-gold font-bold">
            Soteriological Probability Matrix
          </span>
        </div>
        <h3 className="serif text-4xl italic text-white">
          The Calculus of Mercy
        </h3>
        <p className="text-white/80 leading-relaxed text-lg">
          Salvation is not a binary state but a complex intersection of
          individual epistemic access and moral orientation. Drag the point to
          explore how classical theology navigates these variables.
        </p>
        <div className="p-8 glass border border-gold/40 rounded-3xl bg-gold/10">
          <h4 className="text-gold font-bold mb-3 text-xl">{outcome.title}</h4>
          <p className="text-white leading-relaxed">{outcome.desc}</p>
        </div>
      </div>

      <div className="relative aspect-square glass rounded-3xl border border-gold/20 p-12 bg-ink/50">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute left-0 top-1/2 w-full h-px bg-white/20" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/20" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 mono text-[8px] uppercase tracking-widest text-white/60 font-bold">
          High Virtue
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 mono text-[8px] uppercase tracking-widest text-white/60 font-bold">
          Moral Corruption
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 mono text-[8px] uppercase tracking-widest text-white/60 font-bold">
          No Access
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 mono text-[8px] uppercase tracking-widest text-white/60 font-bold">
          Full Access
        </div>

        <div
          className="relative w-full h-full cursor-crosshair"
          onPointerMove={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            let x = ((e.clientX - rect.left) / rect.width) * 100;
            let y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
            setPoint({
              x: Math.max(0, Math.min(100, x)),
              y: Math.max(0, Math.min(100, y)),
            });
          }}
        >
          <motion.div
            className="absolute w-6 h-6 bg-gold rounded-full shadow-[0_0_30px_rgba(197,160,89,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-2 border-white"
            animate={{ left: `${point.x}%`, top: `${100 - point.y}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Visual Etymology Component (Simplified for 3D) ---
const VisualEtymology = () => {
  return (
    <div className="relative h-[500px] my-12 overflow-hidden rounded-[3rem] glass border border-gold/20 shadow-2xl flex items-center px-12 w-full bg-ink/50">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/night-desert/1920/1080"
          className="w-full h-full object-cover opacity-40 sepia-filter"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="relative z-10 max-w-xl text-left">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-gold" />
          <div className="flex items-center gap-2">
            <Eye className="text-gold" size={20} />
            <span className="mono text-xs uppercase tracking-[0.4em] text-gold font-bold">
              Linguistic Archaeology
            </span>
          </div>
        </div>
        <h3 className="serif text-5xl italic text-white leading-[1.1] mb-6">
          The Farmer, The Night, <br />
          <span className="text-gradient-gold">& The Concealer</span>
        </h3>
        <p className="text-lg text-white/80 leading-relaxed font-light mb-8">
          The root <span className="text-gold italic font-medium">k-f-r</span>{" "}
          is an agricultural metaphor. Just as a farmer covers a seed with soil,
          or the night covers the landscape, the{" "}
          <span className="text-white italic">kafir</span> covers the truth that
          is already present.
        </p>
        <div className="glass p-4 rounded-2xl border-gold/20 inline-flex items-center gap-4 bg-ink/50">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <Activity size={20} />
          </div>
          <div>
            <div className="mono text-[10px] uppercase tracking-widest text-gold font-bold">
              Root Meaning
            </div>
            <div className="text-sm text-white/60">To Cover / To Conceal</div>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex justify-end gap-6 perspective-1000 pr-8">
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src="https://picsum.photos/seed/seeds-macro/400/600"
          className="w-48 h-64 rounded-2xl object-cover border border-gold/30 rotate-[-5deg] shadow-[0_0_30px_rgba(197,160,89,0.2)]"
          referrerPolicy="no-referrer"
        />
        <motion.img
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          src="https://picsum.photos/seed/night-desert-2/400/600"
          className="w-48 h-64 rounded-2xl object-cover border border-gold/30 rotate-[5deg] translate-y-12 shadow-[0_0_30px_rgba(197,160,89,0.2)]"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

// --- Timeline Component (Simplified for 3D) ---
const IntellectualTimeline = () => {
  const timeline = [
    {
      year: "1058",
      name: "Al-Ghazali",
      event: "Synthesis of Reason & Spirit",
      img: "https://picsum.photos/seed/ancient-library/400/400",
    },
    {
      year: "1165",
      name: "Ibn Arabi",
      event: "The Unity of Existence",
      img: "https://picsum.photos/seed/geometric-pattern/400/400",
    },
    {
      year: "1263",
      name: "Ibn Taymiyyah",
      event: "The End of Punishment",
      img: "https://picsum.photos/seed/old-manuscript/400/400",
    },
    {
      year: "1919",
      name: "Fazlur Rahman",
      event: "Ethical Re-interpretation",
      img: "https://picsum.photos/seed/modern-architecture/400/400",
    },
  ];

  return (
    <div className="relative py-12 my-12 w-full">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />
      <div className="space-y-16">
        {timeline.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1 text-center md:text-left">
              <div
                className={`flex flex-col ${i % 2 === 0 ? "md:items-end" : "md:items-start"}`}
              >
                <span className="serif text-4xl text-gold/40 font-bold mb-2">
                  {item.year}
                </span>
                <h4 className="serif text-2xl text-white mb-1">{item.name}</h4>
                <p className="mono text-[10px] uppercase tracking-widest text-gold">
                  {item.event}
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full border-2 border-gold/20 overflow-hidden shadow-xl bg-ink">
                <img
                  src={item.img}
                  className="w-full h-full object-cover sepia-filter"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex-1 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Semantic Network Component ---
const SemanticNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodes = [
    {
      id: "kufr",
      label: "KUFR",
      x: 250,
      y: 200,
      size: 45,
      color: "#c5a059",
      desc: "The act of covering or concealing truth.",
    },
    {
      id: "shukr",
      label: "SHUKR",
      x: 420,
      y: 120,
      size: 35,
      color: "#4ade80",
      desc: "The direct antonym: Gratitude.",
    },
    {
      id: "zulm",
      label: "ZULM",
      x: 420,
      y: 280,
      size: 35,
      color: "#f87171",
      desc: "Oppression and injustice.",
    },
    {
      id: "fisq",
      label: "FISQ",
      x: 80,
      y: 120,
      size: 30,
      color: "#fbbf24",
      desc: "Transgression and deviation.",
    },
    {
      id: "iman",
      label: "IMAN",
      x: 80,
      y: 280,
      size: 40,
      color: "#60a5fa",
      desc: "Faith and security.",
    },
    {
      id: "fitr",
      label: "FITR",
      x: 250,
      y: 60,
      size: 30,
      color: "#a78bfa",
      desc: "Innate human nature.",
    },
  ];
  const links = [
    { source: "kufr", target: "shukr", label: "Antonym" },
    { source: "kufr", target: "zulm", label: "Cluster" },
    { source: "kufr", target: "fisq", label: "Overlap" },
    { source: "kufr", target: "iman", label: "Opposition" },
    { source: "kufr", target: "fitr", label: "Covering" },
  ];

  return (
    <div className="relative w-full aspect-video glass rounded-[2rem] overflow-hidden border border-gold/20 grid-bg my-12 bg-ink/50">
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={14} className="text-gold" />
          <span className="mono text-[10px] uppercase tracking-widest text-gold text-left">
            Semantic Linkage Analysis
          </span>
        </div>
        <h3 className="serif text-2xl italic text-white text-left">
          The Conceptual Web
        </h3>
      </div>
      <svg viewBox="0 0 500 400" className="w-full h-full">
        {links.map((link, i) => {
          const s = nodes.find((n) => n.id === link.source)!;
          const t = nodes.find((n) => n.id === link.target)!;
          const isActive = hoveredNode === s.id || hoveredNode === t.id;
          return (
            <g key={i}>
              <motion.line
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={isActive ? "#c5a059" : "rgba(197, 160, 89, 0.2)"}
                strokeWidth={isActive ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </g>
          );
        })}
        {nodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={
                hoveredNode === node.id ? node.color : "rgba(18, 18, 18, 0.9)"
              }
              stroke={node.color}
              strokeWidth={2}
              whileHover={{ scale: 1.1 }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill={hoveredNode === node.id ? "#000" : "#fff"}
              className="mono text-[10px] font-bold pointer-events-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-6 right-6 max-w-xs p-5 glass border border-gold/40 rounded-2xl shadow-2xl bg-ink/90 text-left"
          >
            <h4 className="mono text-gold text-xs uppercase mb-2 font-bold tracking-widest">
              {hoveredNode}
            </h4>
            <p className="text-sm text-white leading-relaxed">
              {nodes.find((n) => n.id === hoveredNode)?.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sections Data ---
const sections = [
  { id: "intro", title: "The Gate of Entry", content: REPORT_CONTENT.intro },
  {
    id: "semantics",
    title: "The Gate of Meaning",
    content: REPORT_CONTENT.semantics,
    component: <SemanticNetwork />,
    extra: <VisualEtymology />,
  },
  {
    id: "wrongdoing",
    title: "The Gate of Justice",
    content: REPORT_CONTENT.wrongdoing,
  },
  {
    id: "scholarship",
    title: "The Gate of Wisdom",
    content: REPORT_CONTENT.scholarship,
    component: <ScholarshipBento />,
    extra: (
      <>
        <IntellectualTimeline />
        <TheologicalDialogue />
      </>
    ),
  },
  {
    id: "soteriology",
    title: "The Gate of Salvation",
    content: REPORT_CONTENT.soteriology,
    component: (
      <>
        <MercyMatrix />
        <MercySimulator />
      </>
    ),
  },
  {
    id: "verses",
    title: "The Gate of Revelation",
    component: <VerseAnalysis />,
  },
  {
    id: "radical",
    title: "The Gate of Horizon",
    content: REPORT_CONTENT.radical,
  },
  {
    id: "conclusion",
    title: "The Final Gate",
    content: REPORT_CONTENT.conclusion,
  },
];

// --- 3D Components ---
const GATE_SPACING = 40;

const FadingHtml = ({
  position,
  children,
  className,
}: {
  position: [number, number, number];
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFrame(({ camera }) => {
    if (ref.current) {
      const dist = camera.position.distanceTo(new THREE.Vector3(...position));
      // Fade out between 30 and 50 units away
      const opacity = 1 - THREE.MathUtils.clamp((dist - 30) / 20, 0, 1);
      ref.current.style.opacity = opacity.toString();
      ref.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      ref.current.style.transform = `scale(${Math.max(0.8, opacity)})`;
    }
  });
  return (
    <Html
      transform
      distanceFactor={15}
      position={position}
      className={className}
      zIndexRange={[100, 0]}
    >
      <div ref={ref} className="transition-all duration-75 origin-center">
        {children}
      </div>
    </Html>
  );
};

const Gate = ({
  position,
  title,
  children,
}: {
  position: [number, number, number];
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <group position={position}>
      {/* Mystical Gate Architecture */}
      <mesh position={[-8, 6, 0]}>
        <boxGeometry args={[1.5, 12, 1.5]} />
        <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[8, 6, 0]}>
        <boxGeometry args={[1.5, 12, 1.5]} />
        <meshStandardMaterial color="#111" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, 12.5, 0]}>
        <boxGeometry args={[17.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#c5a059" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Inner glowing portal frame */}
      <mesh position={[0, 6, 0]}>
        <planeGeometry args={[14.5, 11.5]} />
        <meshBasicMaterial
          color="#c5a059"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Text
        position={[0, 14, 0]}
        fontSize={1.8}
        color="#c5a059"
        font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whSqgl58PlI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      <FadingHtml
        position={[0, 4, 0]}
        className="w-[1000px] flex flex-col items-center"
      >
        <div className="w-full p-12 glass border border-gold/20 rounded-[3rem] shadow-2xl bg-ink/90 backdrop-blur-xl">
          {children}
        </div>
      </FadingHtml>
    </group>
  );
};

const CameraController = ({ totalGates }: { totalGates: number }) => {
  const scroll = useScroll();
  useFrame((state) => {
    const offset = scroll.offset;
    const targetZ = -offset * ((totalGates - 1) * GATE_SPACING);
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ + 20,
      0.05,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5,
      0.05,
    );
  });
  return null;
};

const Scene = () => {
  const totalGates = sections.length;
  const pathLength = (totalGates - 1) * GATE_SPACING;

  return (
    <>
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 10, 60]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#c5a059" />

      {/* Path lights */}
      {Array.from({ length: totalGates }).map((_, i) => (
        <pointLight
          key={i}
          position={[0, 8, -i * GATE_SPACING]}
          intensity={1.5}
          color="#c5a059"
          distance={30}
        />
      ))}

      <Sparkles
        count={2000}
        scale={[30, 20, pathLength + 40]}
        position={[0, 10, -pathLength / 2]}
        size={3}
        speed={0.2}
        opacity={0.15}
        color="#c5a059"
      />

      {/* Reflective Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, -pathLength / 2]}
      >
        <planeGeometry args={[60, pathLength + 100]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={100}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
          mirror={0.5}
        />
      </mesh>

      <CameraController totalGates={totalGates} />

      {sections.map((s, i) => (
        <Gate key={s.id} position={[0, 0, -i * GATE_SPACING]} title={s.title}>
          {s.content && (
            <div className="mb-8">
              <h3 className="serif text-5xl text-gold mb-8 text-center">
                {s.content.title}
              </h3>
              <div className="text-white/80 text-xl leading-relaxed space-y-6 text-left">
                {s.content.text.split("\n\n").map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          )}
          {s.component && (
            <div className="mt-12 flex justify-center w-full">
              {s.component}
            </div>
          )}
          {s.extra && (
            <div className="mt-12 flex justify-center w-full">{s.extra}</div>
          )}
        </Gate>
      ))}
    </>
  );
};

const Overlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-8">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center text-ink font-bold shadow-lg shadow-gold/20 text-xl">
            M
          </div>
          <span className="serif font-bold text-3xl tracking-tighter text-gradient-gold">
            The Gates of Mercy
          </span>
        </div>
        <div className="mono text-xs uppercase tracking-[0.3em] text-white/50 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
          3D Exploration Mode
        </div>
      </header>

      <footer className="flex justify-center pb-8">
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <span className="mono text-[10px] uppercase tracking-[0.5em] text-gold">
            Scroll to Journey
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <div className="w-screen h-screen bg-ink text-white/90 grain overflow-hidden">
      <CustomCursor />
      <Overlay />
      <Canvas
        camera={{ position: [0, 3, 20], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ScrollControls
          pages={sections.length * 1.5}
          damping={0.2}
          distance={1}
        >
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
