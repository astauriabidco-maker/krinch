interface CareersJobsProps {
    dict: any;
}

export default function CareersJobs({ dict }: CareersJobsProps) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">
                        {dict.careers_page.profiles.title}
                    </h2>
                    <div className="w-16 h-1 bg-secondary mx-auto" />
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {dict.careers_page.profiles.jobs.map((job: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-gray-100 hover:border-secondary transition-all group rounded-sm cursor-pointer shadow-sm">
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-xl font-serif text-primary mb-3 group-hover:text-secondary transition-colors">
                                    {job.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-[10px] uppercase tracking-widest bg-primary/5 text-primary px-3 py-1 rounded-full font-bold">
                                        {job.level}
                                    </span>
                                    {job.tags.map((tag: string, tidx: number) => (
                                        <span key={tidx} className="text-[10px] uppercase tracking-widest bg-gray-50 text-gray-400 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button className="text-xs font-bold uppercase tracking-[0.2em] text-primary border border-primary px-6 py-3 group-hover:bg-primary group-hover:text-white transition-all whitespace-nowrap">
                                {dict.careers_page.form.button}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
