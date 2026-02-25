"use client";

import { useState, useEffect } from "react";
import { X, Settings, ShieldCheck, Check, Info } from "lucide-react";
import { Locale } from "@/lib/i18n/get-dictionary";

interface CookieConsentProps {
    locale: Locale;
    dict: any;
}

type ConsentState = {
    necessary: boolean;
    analytics: boolean;
    functional: boolean;
    timestamp: number;
};

const CONSENT_KEY = "krinch-partners-consent";
const SIX_MONTHS = 180 * 24 * 60 * 60 * 1000;

export default function CookieConsent({ locale, dict }: CookieConsentProps) {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [consent, setConsent] = useState<ConsentState>({
        necessary: true,
        analytics: false,
        functional: false,
        timestamp: 0,
    });

    const c = dict.cookies;

    useEffect(() => {
        const storedConsent = localStorage.getItem(CONSENT_KEY);
        if (!storedConsent) {
            setShowBanner(true);
        } else {
            const parsed = JSON.parse(storedConsent);
            const isExpired = Date.now() - parsed.timestamp > SIX_MONTHS;
            if (isExpired) {
                setShowBanner(true);
            } else {
                setConsent(parsed);
            }
        }

        // Listener for footer link
        const handleReopen = () => setShowModal(true);
        window.addEventListener("reopen-cookie-settings", handleReopen);
        return () => window.removeEventListener("reopen-cookie-settings", handleReopen);
    }, []);

    const saveConsent = (newState: Omit<ConsentState, "timestamp">) => {
        const stateWithTimestamp = { ...newState, timestamp: Date.now() };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(stateWithTimestamp));
        setConsent(stateWithTimestamp);
        setShowBanner(false);
        setShowModal(false);

        // Here you would trigger actual script loading/blocking
        if (newState.analytics) {
            // TODO [PROD]: Load analytics scripts (Google Analytics, Plausible, etc.)
        }
    };

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, analytics: true, functional: true });
    };

    const handleDeclineAll = () => {
        saveConsent({ necessary: true, analytics: false, functional: false });
    };

    if (!showBanner && !showModal) return null;

    return (
        <>
            {/* INITIAL BANNER */}
            {showBanner && !showModal && (
                <div className="fixed bottom-0 left-0 w-full z-[100] animate-in slide-in-from-bottom duration-500">
                    <div className="bg-primary text-white p-6 md:px-12 md:py-8 border-t border-white/10 shadow-2xl">
                        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldCheck className="text-secondary w-5 h-5" />
                                    <h3 className="font-serif text-lg font-bold">{c.banner.title}</h3>
                                </div>
                                <p className="text-sm text-white/70 leading-relaxed font-sans">
                                    {c.banner.message}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 shrink-0">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold border-b border-white/20 hover:border-white py-1"
                                >
                                    {c.banner.settings}
                                </button>
                                <button
                                    onClick={handleDeclineAll}
                                    className="px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-all rounded-sm"
                                >
                                    {c.banner.decline}
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-8 py-3 bg-secondary text-primary text-xs uppercase tracking-widest font-bold hover:bg-secondary/90 transition-all rounded-sm shadow-lg shadow-secondary/20"
                                >
                                    {c.banner.accept}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SETTINGS MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
                        onClick={() => !showBanner && setShowModal(false)}
                    />

                    <div className="relative bg-white w-full max-w-2xl shadow-2xl rounded-sm overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="bg-primary p-6 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <Settings className="text-secondary w-5 h-5" />
                                <h2 className="font-serif text-xl font-bold">{c.modal.title}</h2>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="hover:rotate-90 transition-transform p-1"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto font-sans">
                            <p className="text-sm text-primary/60 italic leading-relaxed">
                                {c.modal.description}
                            </p>

                            <div className="space-y-6">
                                {/* Necessary */}
                                <div className="flex items-start justify-between gap-6 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-primary text-sm flex items-center gap-2">
                                            {c.modal.categories.necessary.title}
                                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">Obligatoire</span>
                                        </span>
                                        <span className="text-xs text-primary/60">{c.modal.categories.necessary.description}</span>
                                    </div>
                                    <div className="shrink-0 pt-2 text-primary/40">
                                        <div className="w-10 h-5 bg-primary/20 rounded-full relative opacity-50 cursor-not-allowed">
                                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="flex items-start justify-between gap-6 p-4 border border-gray-100 rounded-sm hover:border-primary/10 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-primary text-sm">{c.modal.categories.analytics.title}</span>
                                        <span className="text-xs text-primary/60">{c.modal.categories.analytics.description}</span>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                                        className={`shrink-0 pt-2 transition-colors`}
                                    >
                                        <div className={`w-10 h-5 rounded-full relative transition-colors ${consent.analytics ? "bg-secondary" : "bg-gray-200"}`}>
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${consent.analytics ? "right-1" : "left-1"}`} />
                                        </div>
                                    </button>
                                </div>

                                {/* Functional */}
                                <div className="flex items-start justify-between gap-6 p-4 border border-gray-100 rounded-sm hover:border-primary/10 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-primary text-sm">{c.modal.categories.functional.title}</span>
                                        <span className="text-xs text-primary/60">{c.modal.categories.functional.description}</span>
                                    </div>
                                    <button
                                        onClick={() => setConsent(prev => ({ ...prev, functional: !prev.functional }))}
                                        className={`shrink-0 pt-2`}
                                    >
                                        <div className={`w-10 h-5 rounded-full relative transition-colors ${consent.functional ? "bg-secondary" : "bg-gray-200"}`}>
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${consent.functional ? "right-1" : "left-1"}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <button
                                    onClick={handleDeclineAll}
                                    className="text-[10px] uppercase tracking-widest font-bold text-primary/40 hover:text-primary transition-colors"
                                >
                                    {c.modal.decline_all}
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="text-[10px] uppercase tracking-widest font-bold text-primary/40 hover:text-primary transition-colors"
                                >
                                    {c.modal.accept_all}
                                </button>
                            </div>
                            <button
                                onClick={() => saveConsent(consent)}
                                className="w-full sm:w-auto px-10 py-3 bg-primary text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all rounded-sm"
                            >
                                {c.modal.save}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
