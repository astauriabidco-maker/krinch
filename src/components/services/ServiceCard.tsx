import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    dict: any;
    title: string;
    description: string;
    items: string[];
    result: string;
    icon: LucideIcon;
    badge?: string;
}

export default function ServiceCard({
    dict,
    title,
    description,
    items,
    result,
    icon: Icon,
    badge,
}: ServiceCardProps) {
    return (
        <div className={`p-8 bg-white border ${badge ? 'border-secondary/30' : 'border-gray-100'} hover:border-secondary/20 hover:shadow-2xl transition-all group relative flex flex-col h-full rounded-sm`}>
            {badge && (
                <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {badge}
                </div>
            )}

            <div className="mb-8 p-4 inline-block bg-[#F9F9F9] text-secondary group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                <Icon size={32} strokeWidth={1.2} />
            </div>

            <h3 className="text-2xl font-serif text-primary mb-4">
                {title}
            </h3>

            <p className="text-primary/70 text-sm leading-relaxed mb-8">
                {description}
            </p>

            <ul className="space-y-3 mb-10 flex-grow">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-primary/60">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary/40" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-6 border-t border-gray-50">
                <div className="bg-[#f0f4f8] p-4 rounded-sm border-l-2 border-secondary">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                        {badge ? dict.services_page.labels.innovation : dict.services_page.labels.result}
                    </p>
                    <p className="text-sm text-primary/80 leading-relaxed italic">
                        {result}
                    </p>
                </div>
            </div>
        </div>
    );
}
