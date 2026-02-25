import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0F2A44] flex flex-col items-center justify-center text-center px-6">
            <div className="relative mb-12">
                <h1 className="text-[180px] md:text-[250px] font-serif font-bold text-white/5 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-400 mb-3">
                            Page Introuvable
                        </p>
                        <h2 className="text-3xl md:text-5xl font-serif text-white">
                            Oops.
                        </h2>
                    </div>
                </div>
            </div>

            <p className="text-white/50 text-lg font-serif italic max-w-md mb-12 leading-relaxed">
                La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/fr"
                    className="px-8 py-4 bg-white text-[#0F2A44] text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-all"
                >
                    Retour à l&apos;accueil
                </Link>
                <Link
                    href="/fr/contact"
                    className="px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                    Nous contacter
                </Link>
            </div>

            <div className="mt-20 text-white/20 text-xs uppercase tracking-widest">
                Krinch & Partners
            </div>
        </div>
    );
}
