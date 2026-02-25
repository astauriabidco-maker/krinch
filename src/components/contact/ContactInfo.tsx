import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

interface ContactInfoProps {
    dict: any;
}

export default function ContactInfo({ dict }: ContactInfoProps) {
    const i = dict.contact_page.info;

    return (
        <div className="relative h-full min-h-[600px] lg:min-h-screen bg-[#0F2A44] flex flex-col justify-center text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/contact_hero.png"
                    alt="Contact Krinch & Partners"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/20" />
            </div>

            <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-xl">
                <h1 className="text-4xl md:text-6xl font-serif mb-8 leading-tight animate-fade-in-up">
                    {dict.contact_page.title}
                </h1>
                <p className="text-lg text-white/70 italic font-serif mb-16 leading-relaxed">
                    {dict.contact_page.subtitle}
                </p>

                <div className="space-y-12">
                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white/5 rounded-sm group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                            <Mail size={24} strokeWidth={1} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">{i.email_label}</p>
                            <p className="text-lg font-serif">contact@krinch-partners.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white/5 rounded-sm group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                            <Phone size={24} strokeWidth={1} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">{i.phone_label}</p>
                            <p className="text-lg font-serif">{i.phone_content || '+237 6XX XXX XXX'}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 group">
                        <div className="p-3 bg-white/5 rounded-sm group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                            <MapPin size={24} strokeWidth={1} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">{i.address_label}</p>
                            <p className="text-lg font-serif">{i.address_content}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-6">{i.social_label}</p>
                    <div className="flex gap-6">
                        <a href="https://www.linkedin.com/company/krinch-partners" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-all">
                            <Linkedin size={18} />
                        </a>
                        <a href="https://x.com/krinchpartners" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-all">
                            <Twitter size={18} />
                        </a>
                        <a href="https://www.facebook.com/krinchpartners" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-all">
                            <Facebook size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
