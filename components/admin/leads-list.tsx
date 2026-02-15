"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/app/actions/leads";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ExternalLink, Calendar, User, Phone } from "lucide-react";
import { toast } from "sonner";

export function LeadsList() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadLeads = async () => {
        setLoading(true);
        const data = await getLeads();
        setLeads(data);
        setLoading(false);
    };

    useEffect(() => {
        loadLeads();
    }, []);



    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    if (leads.length === 0) return (
        <div className="text-center py-20 glass rounded-3xl border-dashed border-white/5">
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Заявок пока нет</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">Все обращения</h2>
                <Button variant="outline" size="sm" onClick={loadLeads} className="border-white/10 rounded-xl"> Обновить </Button>
            </div>

            <div className="grid gap-4">
                {leads.map((lead) => (
                    <Card key={lead.id} className={`p-6 glass border-white/10 overflow-hidden relative ${lead.status === 'new' ? 'border-l-4 border-l-primary' : ''}`}>
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-4 flex-grow">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${lead.type === 'client' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'} text-[10px] font-black uppercase tracking-widest`}>
                                        {lead.type === 'client' ? 'Клиент' : 'Креатор'}
                                    </div>
                                    <span className="text-xs text-zinc-500 flex items-center gap-1 font-medium">
                                        <Calendar size={12} />
                                        {new Date(lead.createdAt).toLocaleString("ru-RU")}
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Имя</p>
                                            <p className="font-bold text-white">{lead.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Связь</p>
                                            <p className="font-bold text-white">{lead.contact || lead.telegram}</p>
                                        </div>
                                    </div>

                                    {lead.phone && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Телефон</p>
                                                <p className="font-bold text-white">{lead.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-4">
                                    {lead.budget && (
                                        <div className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400">
                                            Бюджет: <span className="text-primary">{lead.budget} ₽</span>
                                        </div>
                                    )}
                                    {lead.website && (
                                        <a href={lead.website} target="_blank" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors">
                                            Сайт <ExternalLink size={10} />
                                        </a>
                                    )}
                                    {lead.portfolio && (
                                        <a href={lead.portfolio} target="_blank" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors">
                                            Портфолио <ExternalLink size={10} />
                                        </a>
                                    )}
                                </div>
                            </div>


                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
