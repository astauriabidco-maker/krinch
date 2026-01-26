import { Upload, Linkedin } from "lucide-react";

interface CareersFormProps {
    dict: any;
}

export default function CareersForm({ dict }: CareersFormProps) {
    const f = dict.careers_page.form;

    return (
        <section className="py-24 bg-white" id="apply">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-16 shadow-2xl border border-gray-50 rounded-sm">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-serif text-primary mb-6">
                                {f.title}
                            </h2>
                            <p className="text-primary/60 text-sm italic font-serif">
                                {f.subtitle}
                            </p>
                        </div>

                        <form className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-4">
                                        {f.fields.first_name}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={f.fields.first_name}
                                        className="w-full bg-[#FAFAFA] border-none px-6 py-4 text-sm focus:ring-1 focus:ring-secondary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-4">
                                        {f.fields.last_name}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={f.fields.last_name}
                                        className="w-full bg-[#FAFAFA] border-none px-6 py-4 text-sm focus:ring-1 focus:ring-secondary transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-4">
                                        {f.fields.email}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder={f.fields.email}
                                        className="w-full bg-[#FAFAFA] border-none px-6 py-4 text-sm focus:ring-1 focus:ring-secondary transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-4">
                                        {f.fields.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder={f.fields.phone}
                                        className="w-full bg-[#FAFAFA] border-none px-6 py-4 text-sm focus:ring-1 focus:ring-secondary transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-4">
                                    {f.fields.position}
                                </label>
                                <select className="w-full bg-[#FAFAFA] border-none px-6 py-4 text-sm focus:ring-1 focus:ring-secondary transition-all outline-none appearance-none">
                                    {dict.careers_page.profiles.jobs.map((job: any, idx: number) => (
                                        <option key={idx}>{job.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-4 bg-[#FAFAFA] px-6 py-4 group hover:bg-white hover:shadow-inner transition-all cursor-pointer">
                                <Linkedin size={18} className="text-[#0077B5]" />
                                <input
                                    type="url"
                                    placeholder={f.fields.linkedin}
                                    className="w-full bg-transparent border-none text-sm outline-none"
                                />
                            </div>

                            <div className="border-2 border-dashed border-gray-100 p-12 text-center group hover:border-secondary/30 transition-all cursor-pointer rounded-sm bg-[#FAFAFA]">
                                <Upload size={32} className="mx-auto text-secondary/30 group-hover:text-secondary mb-4 transition-colors" />
                                <p className="text-xs text-primary/40 font-bold uppercase tracking-widest">
                                    {f.fields.cv}
                                </p>
                            </div>

                            <div className="pt-8 text-center space-y-6">
                                <p className="text-[10px] text-gray-400 max-w-md mx-auto leading-relaxed">
                                    {f.privacy}
                                </p>
                                <button type="submit" className="bg-primary text-white border border-primary px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary hover:border-secondary transition-all shadow-xl">
                                    {f.button}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-20 p-8 bg-[#0F2A44] text-white flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm animate-reveal shadow-lg">
                        <p className="text-sm font-serif italic text-white/80">
                            {f.spontaneous.text}
                        </p>
                        <button className="bg-secondary text-primary px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all">
                            {f.spontaneous.button}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
