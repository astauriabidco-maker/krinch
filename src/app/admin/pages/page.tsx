import { db } from '@/lib/db';
import SiteContentManager from '@/components/admin/SiteContentManager';

export const dynamic = 'force-dynamic';

const FILE_LABELS: Record<string, { label: string; emoji: string; desc: string }> = {
    common: { label: 'Commun (Homepage)', emoji: '🏠', desc: 'Navigation, Hero, Métriques, Témoignages, Footer...' },
    about: { label: 'À Propos', emoji: '👥', desc: 'Vision, Mission, Experts, Certifications' },
    services: { label: 'Services', emoji: '🛠', desc: 'Nos expertises RH, Digital, IA, Formation' },
    training: { label: 'Formation', emoji: '🎓', desc: 'Programmes de formation et coaching' },
    digital_ia: { label: 'Digital & IA', emoji: '🤖', desc: 'Solutions digitales et intelligence artificielle' },
    careers: { label: 'Carrières', emoji: '💼', desc: 'Offres d\'emploi et culture d\'entreprise' },
    contact: { label: 'Contact', emoji: '📧', desc: 'Formulaire et informations de contact' },
    legal: { label: 'Mentions Légales', emoji: '⚖️', desc: 'Informations juridiques' },
    privacy: { label: 'Confidentialité', emoji: '🔒', desc: 'Politique de confidentialité et RGPD' },
    cookies: { label: 'Cookies', emoji: '🍪', desc: 'Gestion des cookies' },
    insights: { label: 'Insights / Blog', emoji: '📝', desc: 'Libellés de la page insights' },
    sectors: { label: 'Secteurs', emoji: '🏭', desc: 'Secteurs d\'activité accompagnés' },
    quiz: { label: 'Quiz Diagnostic', emoji: '🎮', desc: 'Questions et logique du quiz' },
};

export default async function AdminPagesPage() {
    const entries = await db.siteContent.findMany({
        orderBy: [{ fileKey: 'asc' }, { locale: 'asc' }]
    });

    // Group by fileKey
    const grouped: Record<string, { fr?: string; en?: string; frUpdated?: string; enUpdated?: string }> = {};
    entries.forEach(e => {
        if (!grouped[e.fileKey]) grouped[e.fileKey] = {};
        if (e.locale === 'fr') {
            grouped[e.fileKey].fr = e.content;
            grouped[e.fileKey].frUpdated = e.updatedAt.toISOString();
        } else {
            grouped[e.fileKey].en = e.content;
            grouped[e.fileKey].enUpdated = e.updatedAt.toISOString();
        }
    });

    const hasContent = entries.length > 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Contenu du Site (CMS)</h1>
                <p className="text-slate-500">Éditez tout le contenu textuel de votre site bilingue FR/EN.</p>
            </div>

            <SiteContentManager
                grouped={grouped}
                fileLabels={FILE_LABELS}
                hasContent={hasContent}
            />
        </div>
    );
}
