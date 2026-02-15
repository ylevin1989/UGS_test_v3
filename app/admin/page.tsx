"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContent, updateContent } from "@/app/actions/content";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
    Loader2,
    Save,
    LayoutDashboard,
    Type,
    Zap,
    MessageCircle,
    Mail,
    Plus,
    Trash2,
    ChevronRight,
    BarChart3,
    ArrowLeft,
    Layers,
    Briefcase,
    Menu,
    X
} from "lucide-react";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ImageUpload } from "@/components/admin/image-upload";
import { LeadsList } from "@/components/admin/leads-list";

const SECTIONS = [
    { id: "general", label: "Общие", icon: LayoutDashboard },
    { id: "hero", label: "Главный экран", icon: Type },
    { id: "stats", label: "Статистика", icon: BarChart3 },
    { id: "process", label: "Процесс", icon: Zap },
    { id: "formats", label: "Форматы", icon: Layers },
    { id: "cases", label: "Кейсы", icon: Briefcase },
    { id: "creatorsPage", label: "Креаторам", icon: Zap },
    { id: "homeGrid", label: "Сетка Героев", icon: Layers },
    { id: "leads", label: "Заявки", icon: MessageCircle },
    { id: "faq", label: "FAQ", icon: MessageCircle },
    { id: "contacts", label: "Контакты", icon: Mail },
];

export default function AdminPage() {
    const [contentRu, setContentRu] = useState<any>(null);
    const [contentEn, setContentEn] = useState<any>(null);
    const [editLang, setEditLang] = useState<"ru" | "en">("ru");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState("general");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        async function load() {
            const resRu = await getContent("ru");
            const resEn = await getContent("en");
            if (resRu) setContentRu(resRu.data);
            if (resEn) setContentEn(resEn.data);
            setLoading(false);
        }
        load();
    }, []);

    const content = editLang === "ru" ? contentRu : contentEn;
    const setContent = editLang === "ru" ? setContentRu : setContentEn;

    const handleSave = async () => {
        setSaving(true);
        const result = await updateContent(content, editLang);
        if (result.success) {
            toast.success(`Контент (${editLang.toUpperCase()}) обновлен!`);
        } else {
            toast.error("Ошибка при сохранении");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const updateNested = (path: string, value: any) => {
        const newContent = { ...content };
        const keys = path.split('.');
        let current = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setContent(newContent);
    };

    const renderSection = () => {
        switch (activeSection) {
            case "general":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Общие настройки</h2>
                            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                {editLang.toUpperCase()}
                            </div>
                        </div>
                        <Card className="p-4 md:p-8 glass space-y-6 border-white/10">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Название сайта</label>
                                    <Input
                                        value={content.site.name}
                                        onChange={(e) => updateNested('site.name', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Описание / Наше решение</label>
                                    <Textarea
                                        value={content.site.description}
                                        onChange={(e) => updateNested('site.description', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[120px]"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Телефон</label>
                                        <Input
                                            value={content.site.phone}
                                            onChange={(e) => updateNested('site.phone', e.target.value)}
                                            className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Яндекс Метрика ID</label>
                                        <Input
                                            value={content.site.yandexMetrikaId}
                                            onChange={(e) => updateNested('site.yandexMetrikaId', e.target.value)}
                                            className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            case "hero":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Главный экран</h2>
                            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                Editing: {editLang.toUpperCase()}
                            </div>
                        </div>
                        <Card className="p-4 md:p-8 glass space-y-6 border-white/10">
                            <div className="grid md:grid-cols-3 gap-4">
                                {['title1', 'title2', 'title3'].map(t => (
                                    <div key={t} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Заголовок {t.slice(-1)}</label>
                                        <Input
                                            value={content.hero?.[t] || ""}
                                            onChange={(e) => updateNested(`hero.${t}`, e.target.value)}
                                            className="bg-zinc-900 border-white/10 rounded-xl h-12 font-bold uppercase"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Подзаголовок</label>
                                <Textarea
                                    value={content.hero?.subtitle || ""}
                                    onChange={(e) => updateNested('hero.subtitle', e.target.value)}
                                    className="bg-zinc-900 border-white/10 rounded-xl min-h-[100px]"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Кнопка 1</label>
                                    <Input
                                        value={content.hero?.ctaPrimary || ""}
                                        onChange={(e) => updateNested('hero.ctaPrimary', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Кнопка 2</label>
                                    <Input
                                        value={content.hero?.ctaSecondary || ""}
                                        onChange={(e) => updateNested('hero.ctaSecondary', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                    />
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Аватары доверия (Social Proof Avatars - 3 фото)</label>
                                <div className="grid grid-cols-3 gap-6">
                                    {[0, 1, 2].map((idx) => (
                                        <div key={idx} className="space-y-2">
                                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Аватар {idx + 1}</label>
                                            <ImageUpload
                                                value={content.hero?.socialAvatars?.[idx] || ""}
                                                onChange={(url) => {
                                                    const newAvatars = [...(content.hero?.socialAvatars || ["", "", ""])];
                                                    newAvatars[idx] = url;
                                                    updateNested('hero.socialAvatars', newAvatars);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            case "stats":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Статистика</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {(content.stats || []).map((stat: any, idx: number) => (
                                <Card key={idx} className="p-6 glass space-y-4 border-white/10">
                                    <div className="space-y-4 pt-4">
                                        <Input
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...content.stats];
                                                newStats[idx].label = e.target.value;
                                                setContent({ ...content, stats: newStats });
                                            }}
                                            className="bg-zinc-900 border-white/10 rounded-xl"
                                            placeholder="Label"
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                value={stat.value}
                                                onChange={(e) => {
                                                    const newStats = [...content.stats];
                                                    newStats[idx].value = e.target.value;
                                                    setContent({ ...content, stats: newStats });
                                                }}
                                                className="bg-zinc-900 border-white/10 rounded-xl"
                                                placeholder="Value"
                                            />
                                            <Input
                                                value={stat.trend}
                                                onChange={(e) => {
                                                    const newStats = [...content.stats];
                                                    newStats[idx].trend = e.target.value;
                                                    setContent({ ...content, stats: newStats });
                                                }}
                                                className="bg-zinc-900 border-white/10 rounded-xl"
                                                placeholder="Trend"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "process":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-black italic text-primary">Процесс (Шаги)</h2>
                            <Button
                                onClick={() => {
                                    const newProcess = [...(content.process || [])];
                                    newProcess.push({ step: newProcess.length + 1, title: "Новый шаг", text: "Описание шага" });
                                    setContent({ ...content, process: newProcess });
                                }}
                                className="bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"
                            >
                                <Plus size={18} className="mr-2" /> Добавить шаг
                            </Button>
                        </div>
                        <div className="space-y-6">
                            {(content.process || []).map((step: any, idx: number) => (
                                <Card key={idx} className="p-4 md:p-8 glass border-white/10 flex flex-col md:flex-row gap-4 md:gap-8 items-start relative group">
                                    <button
                                        onClick={() => {
                                            const newProcess = [...content.process];
                                            newProcess.splice(idx, 1);
                                            setContent({ ...content, process: newProcess });
                                        }}
                                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-black font-black text-2xl flex-shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-grow space-y-4">
                                        <Input
                                            value={step.title}
                                            onChange={(e) => {
                                                const newProcess = [...content.process];
                                                newProcess[idx].title = e.target.value;
                                                setContent({ ...content, process: newProcess });
                                            }}
                                            className="bg-zinc-900 border-white/10 rounded-xl"
                                        />
                                        <Textarea
                                            value={step.text}
                                            onChange={(e) => {
                                                const newProcess = [...content.process];
                                                newProcess[idx].text = e.target.value;
                                                setContent({ ...content, process: newProcess });
                                            }}
                                            className="bg-zinc-900 border-white/10 rounded-xl min-h-[80px]"
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "formats":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-black italic text-primary">Форматы контента</h2>
                            <Button
                                onClick={() => {
                                    const newFormats = [...(content.formats || [])];
                                    newFormats.push({ title: "Новый формат", desc: "Описание формата", icon: "Package" });
                                    setContent({ ...content, formats: newFormats });
                                }}
                                className="bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"
                            >
                                <Plus size={18} className="mr-2" /> Добавить формат
                            </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {(content.formats || []).map((format: any, idx: number) => (
                                <Card key={idx} className="p-6 glass border-white/10 space-y-4 relative group">
                                    <button
                                        onClick={() => {
                                            const newFormats = [...content.formats];
                                            newFormats.splice(idx, 1);
                                            setContent({ ...content, formats: newFormats });
                                        }}
                                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <Input
                                        value={format.title}
                                        onChange={(e) => {
                                            const newFormats = [...content.formats];
                                            newFormats[idx].title = e.target.value;
                                            setContent({ ...content, formats: newFormats });
                                        }}
                                        className="bg-zinc-900 border-white/10 rounded-xl font-bold"
                                        placeholder="Название формата"
                                    />
                                    <Textarea
                                        value={format.desc}
                                        onChange={(e) => {
                                            const newFormats = [...content.formats];
                                            newFormats[idx].desc = e.target.value;
                                            setContent({ ...content, formats: newFormats });
                                        }}
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[80px]"
                                        placeholder="Описание"
                                    />
                                    <Input
                                        value={format.icon}
                                        onChange={(e) => {
                                            const newFormats = [...content.formats];
                                            newFormats[idx].icon = e.target.value;
                                            setContent({ ...content, formats: newFormats });
                                        }}
                                        className="bg-zinc-900 border-white/10 rounded-xl text-xs"
                                        placeholder="Icon Key (Package, MessageSquare, etc)"
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "cases":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-2xl font-black uppercase tracking-tight text-white">Кейсы</h2>
                                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                    {editLang.toUpperCase()}
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    const newCases = [...(content.cases || [])];
                                    newCases.push({
                                        id: `case-${Date.now()}`,
                                        brand: "New Brand",
                                        category: "Category",
                                        shortResult: "Result",
                                        shortRoi: "ROI",
                                        image: "",
                                        challenge: "",
                                        solution: "",
                                        results: [{ label: "Metric", value: "Value" }]
                                    });
                                    setContent({ ...content, cases: newCases });
                                }}
                                className="bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"
                            >
                                <Plus size={18} className="mr-2" /> Добавить кейс
                            </Button>
                        </div>
                        <div className="space-y-12">
                            {(content.cases || []).map((caseItem: any, idx: number) => (
                                <Card key={idx} className="p-4 md:p-8 glass border-white/10 space-y-6 relative group">
                                    <button
                                        onClick={() => {
                                            const newCases = [...content.cases];
                                            newCases.splice(idx, 1);
                                            setContent({ ...content, cases: newCases });
                                        }}
                                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Бренд</label>
                                                <Input
                                                    value={caseItem.brand}
                                                    onChange={(e) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].brand = e.target.value;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                    className="bg-zinc-900 border-white/10 rounded-xl h-10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Категория</label>
                                                <Input
                                                    value={caseItem.category}
                                                    onChange={(e) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].category = e.target.value;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                    className="bg-zinc-900 border-white/10 rounded-xl h-10"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Изображение кейса</label>
                                                <ImageUpload
                                                    value={caseItem.image}
                                                    onChange={(url) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].image = url;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Результат (Reach)</label>
                                                    <Input
                                                        value={caseItem.shortResult}
                                                        onChange={(e) => {
                                                            const newCases = [...content.cases];
                                                            newCases[idx].shortResult = e.target.value;
                                                            setContent({ ...content, cases: newCases });
                                                        }}
                                                        className="bg-zinc-900 border-white/10 rounded-xl h-10"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">ROI</label>
                                                    <Input
                                                        value={caseItem.shortRoi}
                                                        onChange={(e) => {
                                                            const newCases = [...content.cases];
                                                            newCases[idx].shortRoi = e.target.value;
                                                            setContent({ ...content, cases: newCases });
                                                        }}
                                                        className="bg-zinc-900 border-white/10 rounded-xl h-10"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Challenge (Вызов)</label>
                                                <Textarea
                                                    value={caseItem.challenge}
                                                    onChange={(e) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].challenge = e.target.value;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                    className="bg-zinc-900 border-white/10 rounded-xl min-h-[80px]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Solution (Решение)</label>
                                                <Textarea
                                                    value={caseItem.solution}
                                                    onChange={(e) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].solution = e.target.value;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                    className="bg-zinc-900 border-white/10 rounded-xl min-h-[80px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Полная история (Цитата)</label>
                                                <Textarea
                                                    value={caseItem.fullStory}
                                                    onChange={(e) => {
                                                        const newCases = [...content.cases];
                                                        newCases[idx].fullStory = e.target.value;
                                                        setContent({ ...content, cases: newCases });
                                                    }}
                                                    className="bg-zinc-900 border-white/10 rounded-xl min-h-[120px]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Метрики (Results List)</label>
                                                <div className="space-y-2">
                                                    {(caseItem.results || []).map((res: any, rIdx: number) => (
                                                        <div key={rIdx} className="flex gap-2">
                                                            <Input
                                                                value={res.label}
                                                                placeholder="Label"
                                                                className="bg-black/20 h-8 text-xs"
                                                                onChange={(e) => {
                                                                    const newCases = [...content.cases];
                                                                    newCases[idx].results[rIdx].label = e.target.value;
                                                                    setContent({ ...content, cases: newCases });
                                                                }}
                                                            />
                                                            <Input
                                                                value={res.value}
                                                                placeholder="Value"
                                                                className="bg-black/20 h-8 text-xs font-bold"
                                                                onChange={(e) => {
                                                                    const newCases = [...content.cases];
                                                                    newCases[idx].results[rIdx].value = e.target.value;
                                                                    setContent({ ...content, cases: newCases });
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "leads":
                return <LeadsList />;
            case "faq":
                return (
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-black italic text-primary">FAQ - Креаторы</h2>
                            {(content.faq?.creators || []).map((item: any, idx: number) => (
                                <Card key={idx} className="p-6 glass border-white/10 space-y-4 relative group">
                                    <button
                                        onClick={() => {
                                            const newFaq = { ...content.faq };
                                            newFaq.creators.splice(idx, 1);
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <Input
                                        value={item.q}
                                        onChange={(e) => {
                                            const newFaq = { ...content.faq };
                                            newFaq.creators[idx].q = e.target.value;
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        placeholder="Вопрос"
                                        className="bg-zinc-900 border-white/10 rounded-xl font-bold"
                                    />
                                    <Textarea
                                        value={item.a}
                                        onChange={(e) => {
                                            const newFaq = { ...content.faq };
                                            newFaq.creators[idx].a = e.target.value;
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        placeholder="Ответ"
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[100px]"
                                    />
                                </Card>
                            ))}
                            <Button
                                variant="outline"
                                className="w-full h-16 border-dashed border-white/10 rounded-[2rem] hover:bg-white/5 text-zinc-500"
                                onClick={() => {
                                    const newFaq = { ...content.faq, creators: content.faq?.creators || [] };
                                    newFaq.creators.push({ q: "Новый вопрос", a: "Новый ответ" });
                                    setContent({ ...content, faq: newFaq });
                                }}
                            >
                                <Plus size={20} className="mr-2" /> Добавить вопрос для креаторов
                            </Button>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-black italic text-primary">FAQ - Клиенты</h2>
                            {(content.faq?.clients || []).map((item: any, idx: number) => (
                                <Card key={idx} className="p-6 glass border-white/10 space-y-4 relative group">
                                    <button
                                        onClick={() => {
                                            const newFaq = { ...content.faq };
                                            newFaq.clients.splice(idx, 1);
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <Input
                                        value={item.q}
                                        onChange={(e) => {
                                            const newFaq = { ...content.faq };
                                            newFaq.clients[idx].q = e.target.value;
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        placeholder="Вопрос"
                                        className="bg-zinc-900 border-white/10 rounded-xl font-bold"
                                    />
                                    <Textarea
                                        value={item.a}
                                        onChange={(e) => {
                                            const newFaq = { ...content.faq };
                                            newFaq.clients[idx].a = e.target.value;
                                            setContent({ ...content, faq: newFaq });
                                        }}
                                        placeholder="Ответ"
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[100px]"
                                    />
                                </Card>
                            ))}
                            <Button
                                variant="outline"
                                className="w-full h-16 border-dashed border-white/10 rounded-[2rem] hover:bg-white/5 text-zinc-500"
                                onClick={() => {
                                    const newFaq = { ...content.faq, clients: content.faq?.clients || [] };
                                    newFaq.clients.push({ q: "Новый вопрос", a: "Новый ответ" });
                                    setContent({ ...content, faq: newFaq });
                                }}
                            >
                                <Plus size={20} className="mr-2" /> Добавить вопрос для клиентов
                            </Button>
                        </div>
                    </div>
                );
            case "creatorsPage":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Страница Креаторов</h2>
                        <Card className="p-4 md:p-8 glass space-y-6 border-white/10">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Заголовок</label>
                                    <Input
                                        value={content.creatorsPage?.title || ""}
                                        onChange={(e) => updateNested('creatorsPage.title', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Подзаголовок</label>
                                    <Textarea
                                        value={content.creatorsPage?.subtitle || ""}
                                        onChange={(e) => updateNested('creatorsPage.subtitle', e.target.value)}
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[100px]"
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Изображение (герой)</label>
                                        <ImageUpload
                                            value={content.creatorsPage?.image || ""}
                                            onChange={(url) => updateNested('creatorsPage.image', url)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Текст кнопки</label>
                                        <Input
                                            value={content.creatorsPage?.cta || ""}
                                            onChange={(e) => updateNested('creatorsPage.cta', e.target.value)}
                                            className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mt-12 mb-6">Как это работает</h3>
                        <div className="space-y-4">
                            {(content.creatorsPage?.steps || []).map((step: any, idx: number) => (
                                <Card key={idx} className="p-6 glass border-white/10 space-y-4">
                                    <Input
                                        value={step.title}
                                        onChange={(e) => {
                                            const newSteps = [...content.creatorsPage.steps];
                                            newSteps[idx].title = e.target.value;
                                            updateNested('creatorsPage.steps', newSteps);
                                        }}
                                        className="bg-zinc-900 border-white/10 rounded-xl font-bold"
                                    />
                                    <Textarea
                                        value={step.desc}
                                        onChange={(e) => {
                                            const newSteps = [...content.creatorsPage.steps];
                                            newSteps[idx].desc = e.target.value;
                                            updateNested('creatorsPage.steps', newSteps);
                                        }}
                                        className="bg-zinc-900 border-white/10 rounded-xl min-h-[80px]"
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "homeGrid":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Сетка на главной (Hero Grid)</h2>
                        <div className="grid md:grid-cols-1 gap-6 mb-12">
                            <Card className="p-6 glass border-white/10 space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Изображение в блоке 'Зачем вам это нужно?'</label>
                                <ImageUpload
                                    value={content.homeImages?.businessValue || ""}
                                    onChange={(url) => updateNested('homeImages.businessValue', url)}
                                />
                            </Card>
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6">Сетка креаторов (6 фото)</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(content.homeImages?.grid || []).map((item: any, idx: number) => (
                                <Card key={idx} className="p-6 glass border-white/10 space-y-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Имя</label>
                                            <Input
                                                value={item.name}
                                                onChange={(e) => {
                                                    const newGrid = [...content.homeImages.grid];
                                                    newGrid[idx].name = e.target.value;
                                                    updateNested('homeImages.grid', newGrid);
                                                }}
                                                className="bg-zinc-900 border-white/10 rounded-xl h-10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Фото креатора</label>
                                            <ImageUpload
                                                value={item.img}
                                                onChange={(url) => {
                                                    const newGrid = [...content.homeImages.grid];
                                                    newGrid[idx].img = url;
                                                    updateNested('homeImages.grid', newGrid);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            case "contacts":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Контакты и Социальные сети</h2>
                        <Card className="p-4 md:p-8 glass border-white/10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {['email', 'telegram', 'whatsapp', 'instagram', 'vk'].map(c => (
                                    <div key={c} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{c.charAt(0).toUpperCase() + c.slice(1)}</label>
                                        <Input
                                            value={content.contacts?.[c] || ""}
                                            onChange={(e) => updateNested(`contacts.${c}`, e.target.value)}
                                            className="bg-zinc-900 border-white/10 rounded-xl h-12"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <div className="fixed top-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-xl border-b border-white/5 z-50 px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-3 md:space-x-4">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2 hover:bg-white/5 rounded-xl text-zinc-400"
                    >
                        <Menu size={24} />
                    </button>
                    <Logo iconOnly className="scale-75 md:scale-100" />
                    <h1 className="text-sm md:text-xl font-black uppercase tracking-tighter">Admin Panel</h1>
                </div>
                <div className="flex items-center space-x-2 md:space-x-6">
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 scale-90 md:scale-100">
                        <button
                            onClick={() => setEditLang("ru")}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-black transition-all ${editLang === "ru" ? "bg-primary text-black" : "text-zinc-500 hover:text-white"}`}
                        >
                            RU
                        </button>
                        <button
                            onClick={() => setEditLang("en")}
                            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs font-black transition-all ${editLang === "en" ? "bg-primary text-black" : "text-zinc-500 hover:text-white"}`}
                        >
                            EN
                        </button>
                    </div>
                    <Link href="/" className="hidden lg:flex items-center text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
                        <ArrowLeft size={16} className="mr-2" /> Сайт
                    </Link>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary hover:bg-primary/80 text-black font-black uppercase tracking-tight h-10 md:h-11 px-4 md:px-6 rounded-xl shadow-lg shadow-primary/20 scale-90 md:scale-100"
                    >
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        <span className="hidden sm:inline">Сохранить {editLang.toUpperCase()}</span>
                        <span className="sm:hidden">OK</span>
                    </Button>
                </div>
            </div>

            <div className="flex pt-20 min-h-screen">
                <aside className="w-72 fixed left-0 top-20 bottom-0 bg-[#050505] border-r border-white/5 p-6 overflow-y-auto hidden lg:block">
                    <div className="space-y-1">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all group ${activeSection === section.id
                                    ? "bg-primary text-black"
                                    : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <section.icon size={18} className={`${activeSection === section.id ? "text-black" : "group-hover:text-primary"} transition-colors`} />
                                <span className="text-xs font-black uppercase tracking-tight">{section.label}</span>
                                {activeSection === section.id && <ChevronRight size={14} className="ml-auto" />}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">System Status</p>
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-bold">Online</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
                            />
                            <motion.aside
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed left-0 top-0 bottom-0 w-80 bg-[#050505] z-[70] p-6 lg:hidden flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <Logo />
                                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-500">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="space-y-1 flex-grow overflow-y-auto">
                                    {SECTIONS.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => {
                                                setActiveSection(section.id);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center space-x-3 px-4 py-4 rounded-2xl transition-all group ${activeSection === section.id
                                                ? "bg-primary text-black"
                                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <section.icon size={20} className={`${activeSection === section.id ? "text-black" : "group-hover:text-primary"} transition-colors`} />
                                            <span className="text-sm font-black uppercase tracking-tight">{section.label}</span>
                                            {activeSection === section.id && <ChevronRight size={16} className="ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <Link href="/" className="flex items-center text-sm font-bold text-zinc-500 px-4 py-2">
                                        <ArrowLeft size={16} className="mr-2" /> Вернуться на сайт
                                    </Link>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                <main className="flex-grow lg:ml-72 p-4 md:p-8 lg:p-12 pb-32">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderSection()}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
