import { Zap, GraduationCap, Users } from "lucide-react";

interface CareersCultureProps {
    dict: any;
}

const cultureIcons: Record<string, any> = {
    Zap: Zap,
    GraduationCap: GraduationCap,
    Users: Users,
};

export default function CareersCulture({ dict }: CareersCultureProps) {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.careers_page.why_join.title}
                    </h2>
                    <div className="w-12 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {dict.careers_page.why_join.pillars.map((pillar: any, index: number) => {
                        const Icon = cultureIcons[pillar.icon];
                        return (
                            <div key={index} className="bg-white p-10 border border-gray-100 hover:border-secondary transition-all group rounded-sm shadow-sm hover:shadow-xl">
                                <div className="mb-8 text-secondary group-hover:scale-110 transition-transform">
                                    <Icon size={40} strokeWidth={1} />
                                </div>
                                <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-secondary transition-colors text-balance">
                                    {pillar.title}
                                </h3>
                                <p className="text-primary/60 text-sm leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
