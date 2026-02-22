"use client";

import { motion } from "framer-motion";
import { Rocket, TrendingUp, Heart, Cpu, Building2, ChevronRight, Zap } from "lucide-react";
import { ClientMotionWrapper } from "@/components/client-motion-wrapper";

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  icon: any;
  gradient: string;
  shadowColor: string;
  borderColor: string;
  levels: { level: string; price: string }[];
  creatorBudget: string;
  bestFor: string;
}

export function PricingSection({ lang = "ru", plans = [] }: { lang?: string, plans?: any[] }) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Rocket': return Rocket;
      case 'TrendingUp': return TrendingUp;
      case 'Heart': return Heart;
      case 'Cpu': return Cpu;
      case 'Building2': return Building2;
      default: return Zap;
    }
  };

  const parsedPlans = (plans || []).map(p => ({
    ...p,
    icon: getIcon(p.iconName || 'Zap')
  }));

  return (
    <section id="pricing" className="py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[180px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[150px] -z-10" />

      <div className="container">
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {parsedPlans.slice(0, 3).map((plan, idx) => (
            <PricingCard key={plan.id} plan={plan} idx={idx} lang={lang} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {parsedPlans.slice(3).map((plan, idx) => (
            <PricingCard key={plan.id} plan={plan} idx={idx + 3} lang={lang} />
          ))}
        </div>

        {/* Bottom recommendation */}
        <ClientMotionWrapper
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="card-glow rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
              <span>❤️</span>
              {lang === "ru" ? "Рекомендация" : "Recommendation"}
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              {lang === "ru"
                ? "Запуск контент-завода — от 180 000 ₽ / мес"
                : "Content factory launch — from 180,000 ₽ / month"}
            </h3>
            <p className="text-zinc-400 text-base">
              {lang === "ru"
                ? "Бюджет креаторов оплачивается отдельно. Подберём команду под любой бюджет."
                : "Creator budget is paid separately. We'll build a team for any budget."}
            </p>
          </div>
        </ClientMotionWrapper>

        {/* How to explain */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-zinc-500 text-sm leading-relaxed">
            {lang === "ru"
              ? "Вы платите за систему и управление. Креаторов нанимаем под ваш бюджет. Это как реклама: агентство + медиабюджет."
              : "You pay for the system and management. We hire creators for your budget. Like advertising: agency + media spend."}
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, idx, lang }: { plan: PricingPlan; idx: number; lang: string }) {
  const Icon = plan.icon;

  return (
    <ClientMotionWrapper
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group card-glow rounded-3xl p-8 border ${plan.borderColor} transition-all duration-500 hover:translate-y-[-4px] hover:shadow-2xl ${plan.shadowColor}`}
    >
      {/* Top gradient line */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r ${plan.gradient} rounded-full opacity-70`} />

      <div className="space-y-6">
        {/* Icon & Name */}
        <div className="flex items-start justify-between">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg ${plan.shadowColor}`}>
            <Icon size={22} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black tracking-tight mb-1">{plan.name}</h3>
          <p className="text-zinc-500 text-sm font-medium">{plan.tagline}</p>
        </div>

        {/* Level table */}
        <div className="space-y-2">
          {plan.levels.map((level) => (
            <div
              key={level.level}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-purple-500/15 transition-colors"
            >
              <span className="text-zinc-400 text-sm font-medium">{level.level}</span>
              <span className="text-white font-bold text-sm">{level.price}<span className="text-zinc-500 font-normal text-xs"> / {lang === "ru" ? "мес" : "mo"}</span></span>
            </div>
          ))}
        </div>

        {/* Creator budget */}
        <div className="pt-2 border-t border-white/[0.05]">
          <p className="text-xs text-zinc-500 mb-1">
            {lang === "ru" ? "Бюджет креаторов:" : "Creator budget:"}
          </p>
          <p className="text-sm text-purple-400 font-semibold">{plan.creatorBudget}</p>
        </div>

        {/* Best for */}
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <ChevronRight size={12} className="text-purple-400" />
          <span>{plan.bestFor}</span>
        </div>
      </div>
    </ClientMotionWrapper>
  );
}
