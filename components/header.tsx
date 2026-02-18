"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactModal } from "@/components/contact-modal";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ phone, currentLang = "ru" }: { phone?: string; currentLang?: string }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const nav = currentLang === "ru" ? [
        { name: "Главная", href: "/" },
        { name: "Кейсы", href: "/cases" },
        { name: "Креаторам", href: "/creators" },
        { name: "Контакты", href: "/contacts" },
    ] : [
        { name: "Home", href: "/" },
        { name: "Cases", href: "/cases" },
        { name: "Creators", href: "/creators" },
        { name: "Contacts", href: "/contacts" },
    ];



    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "py-2 bg-[#0a0118]/70 backdrop-blur-2xl border-b border-purple-500/8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "py-4 bg-transparent"
            }`}>
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-10 flex items-center gap-3 group">
                    <Logo />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-all relative group"
                        >
                            {item.name}
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:w-6 transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-6">
                    <LanguageSwitcher currentLang={currentLang} />

                    {/* CTA */}
                    <ContactModal
                        type="client"
                        lang={currentLang}
                        trigger={
                            <Button className="btn-aurora rounded-full px-6 h-10 text-sm cursor-pointer">
                                {currentLang === "ru" ? "Запустить" : "Start"}
                            </Button>
                        }
                    />
                </div>

                {/* Mobile toggle */}
                <button
                    className="lg:hidden text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden border-t border-purple-500/10 bg-[#0a0118]/95 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="container py-6 space-y-2">
                            {nav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-3 text-lg font-bold text-white hover:text-purple-400 rounded-xl hover:bg-white/5 transition-all"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <ContactModal
                                    type="client"
                                    lang={currentLang}
                                    trigger={
                                        <Button className="btn-aurora rounded-full px-8 h-12 text-base w-full cursor-pointer">
                                            {currentLang === "ru" ? "Запустить рекламу" : "Start now"}
                                        </Button>
                                    }
                                />
                            </div>
                            <div className="flex justify-center pt-6 border-t border-white/5">
                                <LanguageSwitcher currentLang={currentLang} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
