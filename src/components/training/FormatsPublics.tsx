import { Monitor, Users, PenTool, Layout } from "lucide-react";

interface FormatsPublicsProps {
    dict: any;
}

const formatIcons = [Users, Monitor, PenTool, Layout];

export default function FormatsPublics({ dict }: FormatsPublicsProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24">
                    <div>
                        <h2 className="text-3xl font-serif text-primary mb-12">
                            {dict.formats.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            {dict.formats.list.map((format: any, index: number) => {
                                const Icon = formatIcons[index];
                                return (
                                    <div key={index} className="flex flex-col items-start gap-4 p-6 border-l border-gray-100 hover:border-secondary transition-all">
                                        <div className="text-secondary">
                                            <Icon size={24} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                                                {format.label}
                                            </h4>
                                            <p className="text-xs text-primary/50 leading-relaxed italic">
                                                {format.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-[#0F2A44] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-12 translate-x-16 -translate-y-16" />

                        <h2 className="text-3xl font-serif mb-12">
                            {dict.formats.publics.title}
                        </h2>

                        <div className="grid gap-6">
                            {dict.formats.publics.items.map((item: string, index: number) => (
                                <div key={index} className="flex items-center gap-6 group">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-secondary text-xs font-bold group-hover:bg-secondary group-hover:text-primary transition-all">
                                        0{index + 1}
                                    </div>
                                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-all">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
