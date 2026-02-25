"use client";

import Link from "next/link";
import { Locale } from "@/lib/i18n/get-dictionary";
import Newsletter from "@/components/layout/Newsletter";

export default function Footer({ locale, dict }: { locale: Locale; dict: any }) {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        expertise: [
            { href: `/${locale}/services/rh`, label: dict.footer_labels.consulting },
            { href: `/${locale}/services/digital`, label: dict.footer_labels.digital_transformation },
            { href: `/${locale}/services/ia`, label: dict.footer_labels.ia_data },
        ],
        company: [
            { href: `/${locale}/about`, label: dict.footer_labels.about },
            { href: `/${locale}/insights`, label: dict.nav.insights },
            { href: `/${locale}/careers`, label: dict.nav.careers },
            { href: `/${locale}/contact`, label: dict.nav.contact },
        ],
        legal: [
            { href: `/${locale}/legal`, label: dict.footer_labels.legal_notice },
            { href: `/${locale}/privacy`, label: dict.footer_labels.privacy },
            {
                href: "#",
                label: dict.cookies.footer_link,
                onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("reopen-cookie-settings"));
                }
            },
        ]
    };

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href={`/${locale}`} className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                                <span className="text-primary font-serif font-bold italic">K</span>
                            </div>
                            <span className="text-xl font-serif font-bold tracking-tight">
                                Krinch <span className="text-secondary">&</span> Partners
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            {dict.footer_labels.description}
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-secondary font-serif text-lg mb-6">{dict.nav.expertise}</h4>
                        <ul className="space-y-4">
                            {footerLinks.expertise.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-secondary font-serif text-lg mb-6">{dict.footer_labels.company}</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-secondary font-serif text-lg mb-6">{dict.footer_labels.contact}</h4>
                        <ul className="space-y-4 text-sm text-white/70 mb-8">
                            <li>Yaoundé, Cameroun</li>
                            <li>contact@krinchpartners.com</li>
                        </ul>
                        <Newsletter dict={dict} variant="minimal" />
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-white/40">
                        {dict.footer.rights}
                    </p>
                    <div className="flex space-x-6">
                        {footerLinks.legal.map((link: any) => (
                            link.onClick ? (
                                <button
                                    key={link.label}
                                    onClick={link.onClick}
                                    className="text-xs text-white/40 hover:text-white transition-colors"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link key={link.href} href={link.href} className="text-xs text-white/40 hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
