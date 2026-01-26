import { Shield, Users, Zap, Telescope } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";

interface WhyUsSectionProps {
    dict: any;
}

const iconMap: Record<number, any> = {
    0: Shield,
    1: Users,
    2: Zap,
    3: Telescope,
};

export default function WhyUsSection({ dict }: WhyUsSectionProps) {
    return (
        <section className="py-24 bg-[#fafafa]">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.why_us.title}
                    </h2>
                    <div className="w-20 h-1 bg-secondary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dict.why_us.items.map((item: any, index: number) => {
                        const Icon = iconMap[index];
                        return (
                            <Reveal key={index} delay={index * 0.1}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="p-8 bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all group h-full"
                                >
                                    <div className="mb-6 p-3 inline-block bg-primary text-secondary">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-primary/60 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </motion.div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
