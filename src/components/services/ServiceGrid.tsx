import {
    Briefcase,
    Database,
    RefreshCw,
    Cpu,
    GraduationCap,
    Search
} from "lucide-react";
import ServiceCard from "./ServiceCard";

interface ServiceGridProps {
    dict: any;
}

const iconMap: Record<string, any> = {
    strategy: Briefcase,
    digital: Database,
    transformation: RefreshCw,
    ai_data: Cpu,
    training: GraduationCap,
    recruitment: Search,
};

export default function ServiceGrid({ dict }: ServiceGridProps) {
    const pillarsKeys = ['strategy', 'digital', 'transformation', 'ai_data', 'training', 'recruitment'];

    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pillarsKeys.map((key) => {
                        const service = dict.services_page.pillars[key];
                        const Icon = iconMap[key];
                        return (
                            <ServiceCard
                                key={key}
                                dict={dict}
                                title={service.title}
                                description={service.description}
                                items={service.items}
                                result={service.result}
                                icon={Icon}
                                badge={service.badge}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
