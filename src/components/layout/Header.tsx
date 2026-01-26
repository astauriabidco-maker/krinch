"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Locale } from "@/lib/i18n/get-dictionary";

export default function Header({ locale, dict }: { locale: Locale; dict: any }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === "fr" ? "en" : "fr";
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        window.location.href = newPathname;
    };

    const navLinks = [
        { href: `/${locale}/about`, label: dict.nav.about },
        { href: `/${locale}/insights`, label: dict.nav.insights },
        { href: `/${locale}/careers`, label: dict.nav.careers },
        { href: `/${locale}/contact`, label: dict.nav.contact },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-header py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href={`/${locale}`} className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
                        <span className="text-secondary font-serif text-xl font-bold italic">K</span>
                    </div>
                    <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? "text-primary" : "text-primary"}`}>
                        Krinch <span className="text-secondary">&</span> Partners
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium hover:text-secondary transition-colors text-primary uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1 text-sm font-bold text-primary border border-primary/20 px-3 py-1 rounded hover:bg-primary hover:text-white transition-all capitalize"
                    >
                        <Globe className="w-4 h-4" />
                        <span>{locale === "fr" ? "EN" : "FR"}</span>
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center space-y-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium text-primary"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-2 text-primary font-bold"
                    >
                        <Globe className="w-5 h-5" />
                        <span>{locale === "fr" ? "English Content" : "Contenu Français"}</span>
                    </button>
                </div>
            )}
        </header>
    );
}
