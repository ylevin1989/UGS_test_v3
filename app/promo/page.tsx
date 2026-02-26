"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  ShoppingBag,
  BarChart3,
  Layers,
  Sparkles,
  Quote,
  Send,
  CheckCircle2,
  Film,
  Scale,
  Star,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { saveLead } from "@/app/actions/leads";
import { toast } from "sonner";

/* ──────────────────────────────────────────────
   ANIMATION PRESETS
   ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */
const TRUST_STATS = [
  {
    value: "+28%",
    label: "Конверсия выше",
    sub: "по сравнению с классическими студийными креативами",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "×12",
    label: "Чаще взаимодействие",
    sub: "пользователи взаимодействуют с живым контентом от реальных людей",
    icon: Users,
    color: "from-pink-500 to-orange-500",
  },
  {
    value: "10 нед.",
    label: "Стабильные продажи",
    sub: "одно объявление приносит результат без «выгорания» и замены",
    icon: Clock,
    color: "from-orange-500 to-yellow-500",
  },
];

const SERVICES = [
  {
    icon: ShoppingBag,
    title: "UGC для маркетплейсов",
    pain: "Покупатели не верят идеальным студийным фото и уходят к конкурентам.",
    result:
      "Видео «глазами потребителя» повышает CTR карточки вдвое и закрывает все возражения перед покупкой.",
    gradient: "from-purple-600 to-pink-600",
    glow: "purple",
    image: "/ugc_case_beauty_final_v1_1771030957719.png",
  },
  {
    icon: BarChart3,
    title: "Креативы для Performance",
    pain: "Высокая стоимость клика и низкий ROI в социальных сетях.",
    result:
      "Нативные ролики с продающими сценариями, которые удерживают внимание и ведут пользователя по воронке до оплаты.",
    gradient: "from-pink-600 to-rose-600",
    glow: "pink",
    image: "/ugc_case_fitness_v1_1771031388648.png",
  },
  {
    icon: Layers,
    title: "Масштабирование «под ключ»",
    pain: "Сложно управлять 50+ авторами, страховать товар и маркировать рекламу.",
    result:
      "Берем на себя логистику, подбор лиц через AI-скоринг и гарантируем 100% юридическую чистоту по закону о ЕРИР.",
    gradient: "from-orange-600 to-amber-600",
    glow: "orange",
    image: "/ugc_case_gaming_v1_1771031373441.png",
  },
];

const TEAM = [
  {
    name: "Эдуард",
    role: "Ведущий продюсер",
    desc: "Лично контролирует передачу смыслов от бренда к автору, исключая эффект «глухого телефона» и гарантируя упоминание всех ключевых УТП.",
    icon: Film,
    gradient: "from-purple-500 to-indigo-500",
    photo: "/grid_alex_new_1771030508020.png",
  },
  {
    name: "Мария",
    role: "Эксперт по конверсионным сценариям",
    desc: "Проектирует каждый ролик как мини-воронку: от «крючка» (hook) в первые 2 секунды до четкого призыва к действию (CTA).",
    icon: Sparkles,
    gradient: "from-pink-500 to-rose-500",
    photo: "/grid_maria_new_1771030524055.png",
  },
  {
    name: "Юридическая команда",
    role: "Правовое сопровождение",
    desc: "Обеспечиваем бессрочный выкуп прав на контент. Мы легально обходим необходимость маркировать каждый ролик, а также можем организовать регистрацию в ОРД как отдельную услугу, если это необходимо.",
    icon: Scale,
    gradient: "from-orange-500 to-amber-500",
    photo: "/creator_portrait_1_1771031547964.png",
  },
];

const FAQ = [
  {
    q: "Кто придумывает сценарии для роликов?",
    a: "Вся работа со сценариями лежит на нас. Наши эксперты по конверсионным сценариям анализируют ваш продукт, аудиторию и конкурентов, после чего пишут продающие скрипты, которые цепляют с первых секунд.",
  },
  {
    q: "Как быстро я получу готовые видео?",
    a: "Обычно процесс занимает от 5 до 10 дней с момента согласования сценариев и доставки товара креатору. Мы всегда на связи и держим вас в курсе каждого этапа.",
  },
  {
    q: "Смогу ли я использовать эти ролики в таргетированной рекламе?",
    a: "Да, абсолютно. Мы передаем вам все права на использование контента, плюс решаем юридические вопросы, чтобы вы могли спокойно запускать рекламу без риска получить штраф.",
  },
  {
    q: "А если результат мне не понравится?",
    a: "Мы согласовываем с вами каждый этап: от идеи и выбора креатора до черновика монтажа. В финальную стоимость уже включены правки, чтобы вы получили идеальный результат.",
  },
];

const REVIEWS = [
  {
    name: "Александра",
    text: "Заказала UGC-съемку — результат супер! Видео живые, как будто реально снято покупателем, а не агентством. CTR вырос почти вдвое уже на второй неделе.",
    rating: 5,
    photo: "/ugc_creator_girl_v2_1771029978654.png",
  },
  {
    name: "Юрий",
    text: "Очень понравилось, как быстро сделали съемку и монтаж. Без лишней подготовки и долгих согласований, а кадры — просто огонь. Обязательно вернусь за новой партией.",
    rating: 5,
    photo: "/ugc_creator_boy_v2_1771029993194.png",
  },
  {
    name: "Виктория",
    text: "Думала, что это будет просто тест формата, но цифры говорят сами за себя. Видео реально повысило доверие к товару, продажи пошли вверх.",
    rating: 5,
    photo: "/creator_julia_public_1771031028932.png",
  },
];

/* ══════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════ */
export default function PromoPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim()) {
      toast.error("Пожалуйста, заполните имя и контакт");
      return;
    }
    setSending(true);
    try {
      const result = await saveLead({
        name: formData.name,
        contact: formData.contact,
        message: formData.message || "Заявка с промо-лендинга",
        role: "promo-landing",
      });
      if (result.success) {
        setSent(true);
        toast.success(
          "Заявка отправлена! Мы свяжемся с вами в ближайшее время.",
        );
        setFormData({ name: "", contact: "", message: "" });
      } else {
        toast.error("Ошибка при отправке. Попробуйте еще раз.");
      }
    } catch {
      toast.error("Ошибка при отправке. Попробуйте еще раз.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ═══════════════════════════════════════
          MINI HEADER
         ═══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0118]/70 border-b border-purple-500/10">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="relative z-10 flex items-center gap-3 group scale-75 md:scale-100 origin-left"
          >
            <Logo />
          </Link>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-bold text-white tracking-widest">
                +7 (990) 000-00-00
              </span>
              <a
                href="https://t.me/eva_levina"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-purple-400 transition-colors pt-0.5"
              >
                Telegram: @eva_levina
              </a>
            </div>
            <button
              onClick={scrollToForm}
              className="btn-aurora px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide"
            >
              <span className="hidden md:inline">Оставить заявку</span>
              <span className="md:hidden">Заявка</span>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          1. HERO
         ═══════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[180px] -z-10" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[150px] -z-10" />

        <div className="container text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-[0.25em] mb-8"
          >
            <Sparkles size={14} />
            UGC Performance Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[2.5rem] leading-[0.95] md:text-7xl lg:text-[5.5rem] tracking-tight uppercase mb-8"
          >
            Устали от дорогой
            <br />
            рекламы?{" "}
            <span className="gradient-text-aurora">Вернём продажи</span>
            <br />
            через доверие к <span className="gradient-text-violet">UGC</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            <strong className="text-white block mb-3 text-xl md:text-2xl font-display uppercase tracking-wide">
              Контент, который продаёт.
            </strong>{" "}
            Мы не гонимся за вирусностью ради просмотров. Наши креаторы создают
            ролики, которые попадают в вашу ЦА и приводят клиентов, снижая
            стоимость привлечения до 50%.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={scrollToForm}
              className="btn-aurora h-16 md:h-20 px-10 md:px-14 rounded-full text-base md:text-lg font-black uppercase tracking-widest inline-flex items-center gap-3 cursor-pointer"
            >
              Заказать расчёт прибыли
              <ArrowRight size={22} />
            </button>
          </motion.div>

          {/* Hero Image Showcase — 3 phone mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 md:mt-24 relative"
          >
            <div className="flex justify-center items-end gap-4 md:gap-8">
              {/* Left phone */}
              <div className="relative w-[28%] max-w-[200px] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/10 -rotate-6 translate-y-6">
                <Image
                  src="/ugc_case_beauty_final_v1_1771030957719.png"
                  alt="UGC Beauty кейс"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118]/60 to-transparent" />
              </div>
              {/* Center phone — hero */}
              <div className="relative w-[36%] max-w-[260px] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 z-10">
                <Image
                  src="/ugc_hero_creator_main_1771031330094.png"
                  alt="UGC креатор снимает видео"
                  fill
                  sizes="260px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl">
                  <p className="gradient-text-aurora font-bold text-[10px] md:text-xs tracking-widest uppercase">
                    Живой UGC контент
                  </p>
                </div>
              </div>
              {/* Right phone */}
              <div className="relative w-[28%] max-w-[200px] aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden border border-pink-500/20 shadow-2xl shadow-pink-500/10 rotate-6 translate-y-6">
                <Image
                  src="/ugc_case_fitness_v1_1771031388648.png"
                  alt="UGC Fitness кейс"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118]/60 to-transparent" />
              </div>
            </div>
            {/* Glow under showcase */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-purple-600/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. TRUST STATS
         ═══════════════════════════════════════ */}
      <section className="py-16 md:py-20 section-glow-top">
        <div className="container">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TRUST_STATS.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="card-glow rounded-3xl p-8 md:p-10 text-center group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <stat.icon size={26} />
                </div>
                <div className="font-display text-5xl md:text-6xl gradient-text-aurora mb-2">
                  {stat.value}
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. SERVICES
         ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 section-glow-top">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">
              Что мы делаем
            </span>
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9]">
              Наши <span className="gradient-text-aurora">Услуги</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {SERVICES.map((svc, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="card-glow rounded-3xl overflow-hidden group flex flex-col"
              >
                {/* Case study image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a28] via-[#0f0a28]/40 to-transparent" />
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    <svc.icon size={20} />
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-6 uppercase">
                    {svc.title}
                  </h3>

                  <div className="space-y-5 flex-1">
                    {/* Pain */}
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center">
                        <span className="text-red-400 text-xs font-bold">
                          !
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red-400/80 uppercase tracking-wider mb-1">
                          Боль
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {svc.pain}
                        </p>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-green-500/15 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-400/80 uppercase tracking-wider mb-1">
                          Результат
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {svc.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. TEAM
         ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 section-glow-top relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-pink-400 font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">
              Эксперты
            </span>
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9]">
              Наши <span className="gradient-text-violet">Мастера</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="card-glow rounded-3xl overflow-hidden group"
              >
                {/* Photo or icon avatar */}
                {member.photo ? (
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a28] via-[#0f0a28]/30 to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 md:h-56 flex items-center justify-center bg-gradient-to-br from-orange-500/10 to-amber-500/5">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-xl`}
                    >
                      <member.icon size={44} />
                    </div>
                  </div>
                )}

                <div className="p-8 md:p-10 text-center">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 text-sm font-bold uppercase tracking-wider mb-5">
                    {member.role}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. TESTIMONIALS
         ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 section-glow-top">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-orange-400 font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">
              Клиенты говорят
            </span>
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9]">
              <span className="gradient-text">Отзывы</span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="glass rounded-3xl p-8 md:p-10 flex flex-col group"
              >
                <Quote
                  size={32}
                  className="text-purple-500/30 mb-4 group-hover:text-purple-400/50 transition-colors"
                />
                <p className="text-zinc-300 leading-relaxed flex-1 mb-6 italic">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-3">
                  {/* Avatar photo */}
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-purple-500/30 flex-shrink-0">
                    <Image
                      src={review.photo}
                      alt={review.name}
                      fill
                      sizes="44px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
         ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 section-glow-top">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] block mb-4">
              Ответы на вопросы
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight uppercase leading-[0.9]">
              Частые <span className="gradient-text-aurora">вопросы</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`glass rounded-2xl overflow-hidden cursor-pointer transition-colors ${isOpen ? "border-purple-500/30 bg-purple-500/5" : "hover:border-purple-500/20"}`}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div className="p-6 md:p-8 flex items-center justify-between gap-4">
                    <h4 className="text-lg md:text-xl font-bold pr-8 text-white">
                      {faq.q}
                    </h4>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-purple-500/20 text-purple-400" : "bg-white/5 text-zinc-400"}`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 leading-relaxed text-sm md:text-base border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. CONTACT / BOOKING FORM
         ═══════════════════════════════════════ */}
      <section
        ref={formRef}
        className="py-20 md:py-28 section-glow-top relative"
        id="form"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[180px] -z-10" />

        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-glow rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden"
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight uppercase mb-4">
                Получите{" "}
                <span className="gradient-text-violet">бесплатную</span>
                <br />
                консультацию
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                Оставьте заявку, и мы свяжемся с вами в течение пары часов.
                Подберём креаторов под вашу нишу и рассчитаем смету без скрытых
                платежей.
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center text-green-400 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
                <p className="text-zinc-400">
                  Мы свяжемся с вами в ближайшее время.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-purple-400 underline underline-offset-4 text-sm hover:text-purple-300 transition-colors"
                >
                  Отправить ещё одну заявку
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Как вас зовут?"
                    className="w-full h-14 px-5 rounded-2xl bg-white/[0.04] border border-purple-500/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Контакт (Telegram / WhatsApp / Email) *
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    placeholder="@username или +7..."
                    className="w-full h-14 px-5 rounded-2xl bg-white/[0.04] border border-purple-500/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Расскажите о задаче
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Какой продукт продвигаете? Какие цели?"
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-purple-500/15 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-aurora w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Отправить заявку
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-zinc-500">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href="/privacy"
                    className="text-purple-400/70 hover:text-purple-400 underline underline-offset-2"
                  >
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MINI FOOTER
         ═══════════════════════════════════════ */}
      <footer className="py-10 border-t border-purple-500/10 relative z-10">
        <div className="container flex flex-col items-center text-center">
          <div className="mb-4">
            <Logo />
          </div>
          <p className="text-zinc-500 text-xs mt-2">
            © 2025 HYPERLIFT — UGC Performance Agency
          </p>
        </div>
      </footer>

    </main>
  );
}
