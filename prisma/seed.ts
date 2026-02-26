import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { subDays } from 'date-fns'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.resolve(process.cwd(), 'dev.db')
const url = `file:${dbPath}`
process.env.DATABASE_URL = url
const adapter = new PrismaLibSql({ url })
const prisma = new PrismaClient({
    adapter,
})

async function main() {
    console.log('🌱 Starting seeding...')

    // 1. Clean Database
    await prisma.quizResult.deleteMany()
    await prisma.lead.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.teamMember.deleteMany()
    await prisma.user.deleteMany()

    // 1.5 Create Admin User with hashed password
    const hashedPassword = await bcrypt.hash('Krinch2026!', 12)
    await prisma.user.create({
        data: {
            name: 'Admin Krinch',
            email: 'admin@krinch.com',
            password: hashedPassword,
            role: 'ADMIN',
        }
    })
    console.log('✅ Admin user created (admin@krinch.com / Krinch2026!)')

    // 2. Leads (Realistic Data)
    const leadsData = [
        {
            name: "Jean Dupont", email: "j.dupont@orange.cm", company: "Orange Cameroun",
            interest: "IA", score: 85, status: "NEW", daysAgo: 2
        },
        {
            name: "Marie Ngassa", email: "m.ngassa@mtn.cm", company: "MTN Cameroon",
            interest: "STRATEGY", score: 62, status: "CONTACTED", daysAgo: 5
        },
        {
            name: "Paul Biya (Homonyme)", email: "paul.b@gov.cm", company: "MINFOPRA",
            interest: "DIGITAL", score: 45, status: "NEW", daysAgo: 10
        },
        {
            name: "Sarah Etoundi", email: "s.etoundi@cimencam.cm", company: "Cimencam",
            interest: "HR", score: 92, status: "ARCHIVED", daysAgo: 25
        },
        {
            name: "Alain Foka", email: "a.foka@media.com", company: "Media Africa",
            interest: "STRATEGY", score: 78, status: "NEW", daysAgo: 1
        },
    ];

    for (const l of leadsData) {
        const lead = await prisma.lead.create({
            data: {
                name: l.name,
                email: l.email,
                company: l.company,
                companySize: "50-200",
                serviceInterest: l.interest,
                status: l.status as any,
                createdAt: subDays(new Date(), l.daysAgo),
                quizResults: {
                    create: {
                        scoreValue: l.score,
                        answersJson: { "q1": "Answer A", "q2": "Answer B" }
                    }
                }
            }
        })
    }

    // 3. Blog Posts - 8 articles riches et complets
    const blogPosts = [
        // ──────────────── ARTICLE 1 : IA ────────────────
        {
            slug: 'recrutement-predictif-ia-cameroun-2026',
            titleFr: "Recrutement prédictif au Cameroun : comment l'IA redéfinit l'identification des talents",
            titleEn: "Predictive Recruitment in Cameroon: How AI is Redefining Talent Identification",
            summaryFr: "Les entreprises camerounaises adoptent l'intelligence artificielle pour transformer leurs processus de recrutement. Analyse des opportunités, des défis culturels et des résultats concrets observés sur le terrain.",
            summaryEn: "Cameroonian companies are adopting artificial intelligence to transform their recruitment processes. An analysis of opportunities, cultural challenges, and concrete results observed on the ground.",
            coverImage: "/images/insights/ia-rh.png",
            category: "IA" as const,
            author: "Dr. K — Associé Gérant",
            published: true,
            publishedAt: subDays(new Date(), 3),
            contentFr: `
<h2>L'ère du recrutement augmenté en Afrique centrale</h2>
<p>En 2026, le recrutement ne se résume plus à trier des CV et conduire des entretiens. <strong>L'intelligence artificielle transforme radicalement la façon dont les entreprises camerounaises identifient, évaluent et retiennent les meilleurs talents.</strong></p>
<p>Chez Krinch & Partners, nous accompagnons depuis deux ans la mise en œuvre de solutions d'IA RH auprès de PME et grands groupes de la zone CEMAC. Les résultats sont sans équivoque : les entreprises qui adoptent ces outils réduisent leur délai de recrutement de 40% en moyenne.</p>

<h2>Les trois piliers du recrutement prédictif</h2>
<h3>1. Le screening intelligent des candidatures</h3>
<p>Les algorithmes de traitement du langage naturel (NLP) analysent les CV, lettres de motivation et profils LinkedIn avec une précision que l'œil humain ne peut égaler. Mais attention : <strong>la technologie doit être calibrée pour le contexte africain.</strong></p>
<ul>
<li>Les parcours académiques non-linéaires sont la norme, pas l'exception</li>
<li>L'expérience informelle (entrepreneuriat, family business) a une valeur considérable</li>
<li>Le multilinguisme (français, anglais, langues locales) est un atout stratégique souvent sous-évalué par les modèles occidentaux</li>
</ul>

<h3>2. L'évaluation prédictive des compétences</h3>
<p>Au-delà du CV, les outils d'IA évaluent le potentiel d'un candidat à performer dans un rôle spécifique. Nous utilisons des modèles qui croisent :</p>
<ul>
<li>Les données comportementales issues de tests psychométriques</li>
<li>L'analyse des trajectoires de carrière similaires dans le secteur</li>
<li>Les signaux faibles de motivation et d'engagement</li>
</ul>

<blockquote ><p>« Nous avons réduit notre taux d'erreur de recrutement de 35% à 8% en 18 mois grâce à l'IA prédictive. Le ROI est indiscutable. »</p>
<p>— DRH, groupe agroalimentaire, Douala</p></blockquote>

<h3>3. L'onboarding personnalisé</h3>
<p>L'IA ne s'arrête pas à la signature du contrat. Les parcours d'intégration générés automatiquement, adaptés au profil du nouveau collaborateur, augmentent le taux de rétention à 12 mois de <strong>67% à 89%</strong>.</p>

<h2>Les défis spécifiques au contexte camerounais</h2>
<p>Implémenter l'IA RH en Afrique centrale n'est pas un simple copier-coller des solutions occidentales. Trois défis majeurs se posent :</p>
<ol>
<li><strong>La qualité des données</strong> : les SIRH locaux sont souvent incomplets ou inexistants. Il faut d'abord structurer avant d'automatiser.</li>
<li><strong>Les biais algorithmiques</strong> : un modèle entraîné sur des données européennes sera inefficace, voire discriminant, dans un contexte africain.</li>
<li><strong>L'acceptabilité culturelle</strong> : la digitalisation des processus RH doit être accompagnée d'un travail de conduite du changement auprès des équipes.</li>
</ol>

<h2>Recommandations de Krinch & Partners</h2>
<p>Fort de notre expérience terrain, nous recommandons une approche en trois phases :</p>
<ul>
<li><strong>Phase 1 (0-3 mois)</strong> : Audit des processus RH existants et structuration des données</li>
<li><strong>Phase 2 (3-6 mois)</strong> : Déploiement d'un outil d'IA calibré localement sur un périmètre pilote</li>
<li><strong>Phase 3 (6-12 mois)</strong> : Industrialisation et formation des équipes RH</li>
</ul>
<p>L'avenir du recrutement en Afrique sera augmenté par l'IA, mais toujours piloté par l'humain. C'est cette conviction qui guide notre approche chez Krinch & Partners.</p>
            `,
            contentEn: `
<h2>The era of augmented recruitment in Central Africa</h2>
<p>In 2026, recruitment is no longer about sorting CVs and conducting interviews. <strong>Artificial intelligence is radically transforming how Cameroonian companies identify, evaluate, and retain top talent.</strong></p>
<p>At Krinch & Partners, we have been supporting the implementation of HR AI solutions for SMEs and large groups in the CEMAC zone for two years. The results are unequivocal: companies that adopt these tools reduce their recruitment lead time by an average of 40%.</p>

<h2>The three pillars of predictive recruitment</h2>
<h3>1. Intelligent candidate screening</h3>
<p>Natural language processing (NLP) algorithms analyze CVs, cover letters, and LinkedIn profiles with a precision that the human eye cannot match. But beware: <strong>the technology must be calibrated for the African context.</strong></p>
<ul>
<li>Non-linear academic paths are the norm, not the exception</li>
<li>Informal experience (entrepreneurship, family business) has considerable value</li>
<li>Multilingualism (French, English, local languages) is a strategic asset often undervalued by Western models</li>
</ul>

<h3>2. Predictive skills assessment</h3>
<p>Beyond the CV, AI tools assess a candidate's potential to perform in a specific role. We use models that cross-reference:</p>
<ul>
<li>Behavioral data from psychometric tests</li>
<li>Analysis of similar career trajectories in the sector</li>
<li>Weak signals of motivation and engagement</li>
</ul>

<blockquote><p>"We reduced our recruitment error rate from 35% to 8% in 18 months thanks to predictive AI. The ROI is indisputable."</p>
<p>— HR Director, agri-food group, Douala</p></blockquote>

<h3>3. Personalized onboarding</h3>
<p>AI doesn't stop at contract signing. Automatically generated onboarding programs, adapted to the new employee's profile, increase the 12-month retention rate from <strong>67% to 89%</strong>.</p>

<h2>Challenges specific to the Cameroonian context</h2>
<p>Implementing HR AI in Central Africa is not a simple copy-paste of Western solutions. Three major challenges arise:</p>
<ol>
<li><strong>Data quality</strong>: local HRIS systems are often incomplete or non-existent. Structure before automating.</li>
<li><strong>Algorithmic bias</strong>: a model trained on European data will be ineffective, even discriminatory, in an African context.</li>
<li><strong>Cultural acceptability</strong>: digitalization of HR processes must be accompanied by change management work with teams.</li>
</ol>

<h2>Krinch & Partners recommendations</h2>
<p>Based on our field experience, we recommend a three-phase approach:</p>
<ul>
<li><strong>Phase 1 (0-3 months)</strong>: Audit of existing HR processes and data structuring</li>
<li><strong>Phase 2 (3-6 months)</strong>: Deployment of a locally calibrated AI tool on a pilot scope</li>
<li><strong>Phase 3 (6-12 months)</strong>: Industrialization and HR team training</li>
</ul>
<p>The future of recruitment in Africa will be augmented by AI but always driven by humans. This conviction guides our approach at Krinch & Partners.</p>
            `,
        },

        // ──────────────── ARTICLE 2 : DIGITAL ────────────────
        {
            slug: 'sirh-transition-pme-africaines-guide-complet',
            titleFr: "SIRH : Le guide complet pour une transition réussie dans les PME africaines",
            titleEn: "HRIS: The Complete Guide to a Successful Transition in African SMEs",
            summaryFr: "Le passage au tout numérique dans les RH nécessite une approche culturelle avant d'être technologique. Retour d'expérience sur 15 déploiements SIRH au Cameroun et en zone CEMAC.",
            summaryEn: "Moving to all-digital HR requires a cultural approach before it is technological. Feedback from 15 HRIS deployments in Cameroon and the CEMAC zone.",
            coverImage: "/images/insights/digital.png",
            category: "DIGITAL" as const,
            author: "Équipe Transformation Digitale",
            published: true,
            publishedAt: subDays(new Date(), 8),
            contentFr: `
<h2>Pourquoi 60% des projets SIRH échouent en Afrique</h2>
<p>Le constat est alarmant : <strong>six projets SIRH sur dix déployés en entreprise africaine n'atteignent pas leurs objectifs dans les 18 premiers mois.</strong> Ce n'est pas un problème de technologie — c'est un problème d'approche.</p>
<p>Après avoir accompagné 15 déploiements SIRH au Cameroun, au Gabon et en Guinée Équatoriale, Krinch & Partners a identifié les facteurs clés de succès et d'échec.</p>

<h2>Les 5 erreurs fatales</h2>
<h3>1. Choisir l'outil avant de comprendre les processus</h3>
<p>Trop d'entreprises se précipitent sur un logiciel avant d'avoir cartographié leurs processus RH existants. Résultat : l'outil impose ses logiques au lieu de s'adapter à la réalité terrain.</p>

<h3>2. Ignorer la dimension culturelle</h3>
<p>Dans beaucoup d'organisations camerounaises, les processus RH reposent sur des relations interpersonnelles fortes. La digitalisation perçue comme une déshumanisation crée des résistances insurmontables.</p>

<blockquote><p>« Le SIRH n'est pas un outil informatique — c'est un projet de transformation culturelle qui touche chaque collaborateur. »</p></blockquote>

<h3>3. Sous-estimer la formation</h3>
<p>Un outil non maîtrisé est un outil abandonné. Nous recommandons un budget formation représentant <strong>30% du coût de licence</strong> — ratio rarement respecté.</p>

<h3>4. Déployer en big bang</h3>
<p>Le déploiement progressif, module par module, département par département, est la seule approche qui fonctionne dans notre contexte.</p>

<h3>5. Ne pas mesurer</h3>
<p>Sans KPIs clairs dès le départ, impossible de démontrer la valeur ajoutée du projet aux décideurs.</p>

<h2>La méthodologie Krinch : 4 phases éprouvées</h2>
<ul>
<li><strong>Diagnostic (4 semaines)</strong> : cartographie complète des processus RH, interviews des utilisateurs clés, benchmark des solutions du marché</li>
<li><strong>Conception (6 semaines)</strong> : co-construction de la solution avec les équipes métier, paramétrages, création des workflows</li>
<li><strong>Déploiement pilote (8 semaines)</strong> : test sur un périmètre restreint, ajustements itératifs, formation des ambassadeurs</li>
<li><strong>Industrialisation (12 semaines)</strong> : déploiement progressif, support renforcé, mesure d'impact</li>
</ul>

<h2>Résultats observés chez nos clients</h2>
<p>Les entreprises qui suivent cette méthodologie observent en moyenne :</p>
<ul>
<li><strong>-70%</strong> de temps consacré aux tâches administratives RH</li>
<li><strong>+85%</strong> de satisfaction des collaborateurs sur les processus RH</li>
<li><strong>ROI positif</strong> en moins de 12 mois</li>
</ul>
<p>La transformation digitale des RH n'est plus une option pour les entreprises africaines qui veulent rester compétitives. Mais elle doit être menée avec méthode, humilité, et une connaissance profonde du terrain.</p>
            `,
            contentEn: `
<h2>Why 60% of HRIS projects fail in Africa</h2>
<p>The finding is alarming: <strong>six out of ten HRIS projects deployed in African companies fail to meet their objectives within the first 18 months.</strong> This is not a technology problem — it's an approach problem.</p>
<p>After supporting 15 HRIS deployments in Cameroon, Gabon, and Equatorial Guinea, Krinch & Partners has identified the key success and failure factors.</p>

<h2>The 5 fatal mistakes</h2>
<h3>1. Choosing the tool before understanding processes</h3>
<p>Too many companies rush to software before mapping their existing HR processes. Result: the tool imposes its logic instead of adapting to ground reality.</p>

<h3>2. Ignoring the cultural dimension</h3>
<p>In many Cameroonian organizations, HR processes rely on strong interpersonal relationships. Digitalization perceived as dehumanization creates insurmountable resistance.</p>

<blockquote><p>"HRIS is not an IT tool — it's a cultural transformation project that affects every employee."</p></blockquote>

<h3>3. Underestimating training</h3>
<p>An unmastered tool is an abandoned tool. We recommend a training budget representing <strong>30% of the license cost</strong> — a ratio rarely respected.</p>

<h3>4. Big bang deployment</h3>
<p>Progressive deployment, module by module, department by department, is the only approach that works in our context.</p>

<h3>5. Not measuring</h3>
<p>Without clear KPIs from the start, it's impossible to demonstrate the project's added value to decision-makers.</p>

<h2>The Krinch methodology: 4 proven phases</h2>
<ul>
<li><strong>Diagnosis (4 weeks)</strong>: complete mapping of HR processes, key user interviews, market solution benchmark</li>
<li><strong>Design (6 weeks)</strong>: co-construction of the solution with business teams, configurations, workflow creation</li>
<li><strong>Pilot deployment (8 weeks)</strong>: testing on a restricted scope, iterative adjustments, ambassador training</li>
<li><strong>Industrialization (12 weeks)</strong>: progressive deployment, reinforced support, impact measurement</li>
</ul>

<h2>Results observed among our clients</h2>
<p>Companies that follow this methodology observe on average:</p>
<ul>
<li><strong>-70%</strong> time spent on HR administrative tasks</li>
<li><strong>+85%</strong> employee satisfaction with HR processes</li>
<li><strong>Positive ROI</strong> in less than 12 months</li>
</ul>
<p>Digital transformation of HR is no longer optional for African companies that want to stay competitive. But it must be conducted with method, humility, and deep field knowledge.</p>
            `,
        },

        // ──────────────── ARTICLE 3 : STRATEGY ────────────────
        {
            slug: 'leadership-croissance-rapide-cemac',
            titleFr: "Le Leadership à l'épreuve de la croissance rapide en zone CEMAC",
            titleEn: "Leadership Tested by Rapid Growth in the CEMAC Zone",
            summaryFr: "Comment maintenir la culture d'entreprise et l'engagement des équipes lors d'une phase d'expansion accélérée. Leçons tirées de 3 fusions réussies.",
            summaryEn: "How to maintain corporate culture and team engagement during accelerated expansion. Lessons from 3 successful mergers.",
            coverImage: "/images/insights/leadership.png",
            category: "STRATEGY" as const,
            author: "Dr. K — Associé Gérant",
            published: true,
            publishedAt: subDays(new Date(), 14),
            contentFr: `
<h2>La croissance, ce paradoxe africain</h2>
<p>Les entreprises de la zone CEMAC vivent un paradoxe fascinant : <strong>une croissance souvent forte mais fragile</strong>, portée par des marchés dynamiques mais menacée par la difficulté à structurer les organisations.</p>
<p>Quand le chiffre d'affaires double en deux ans mais que les processus restent artisanaux, c'est la culture d'entreprise qui craque en premier.</p>

<h2>Les signaux d'alerte à ne pas ignorer</h2>
<ul>
<li>Les « anciens » se sentent dépossédés face à l'afflux de nouveaux collaborateurs</li>
<li>Les valeurs fondatrices se diluent dans la croissance</li>
<li>Les décisions se prennent plus lentement malgré l'urgence</li>
<li>Le turnover des cadres intermédiaires explose</li>
</ul>

<blockquote><p>« J'ai fondé cette entreprise avec 5 personnes qui partageaient ma vision. Aujourd'hui nous sommes 200, et je ne reconnais plus la culture que j'avais créée. »</p>
<p>— Fondateur d'une PME technologique, Douala</p></blockquote>

<h2>Le modèle K&P : Leadership adaptatif en 4 dimensions</h2>
<h3>Dimension 1 : L'ancrage culturel</h3>
<p>Avant de scaler, il faut <strong>documenter et formaliser la culture</strong>. Pas dans un document PowerPoint oublié, mais dans des rituels, des processus de décision, des histoires qui se transmettent.</p>

<h3>Dimension 2 : La structure matricielle évolutive</h3>
<p>Les organigrammes pyramidaux ne survivent pas à la croissance rapide. Nous aidons nos clients à adopter des structures qui grandissent avec eux, sans perdre en agilité.</p>

<h3>Dimension 3 : Le développement du leadership intermédiaire</h3>
<p>Le goulet d'étranglement n°1 de la croissance, c'est le manque de managers capables de porter la vision. Un programme de leadership accéléré (6 mois) peut transformer la donne.</p>

<h3>Dimension 4 : La mesure continue de l'engagement</h3>
<p>Ce qu'on ne mesure pas, on ne l'améliore pas. Des baromètres trimestriels d'engagement couplés à des actions correctives rapides maintiennent la cohésion quand tout bouge vite.</p>

<h2>Étude de cas : Fusion de 3 entités industrielles</h2>
<p>En 2025, Krinch & Partners a accompagné la fusion de 3 entités industrielles en zone CEMAC. Résultat après 6 mois :</p>
<ul>
<li><strong>0% de départ</strong> parmi les 45 talents clés identifiés</li>
<li><strong>+22 points</strong> d'engagement mesuré</li>
<li><strong>Culture unifiée</strong> adoptée par 87% des collaborateurs</li>
</ul>
<p>La croissance n'est pas un problème — c'est la croissance non accompagnée qui l'est.</p>
            `,
            contentEn: `
<h2>Growth, the African paradox</h2>
<p>Companies in the CEMAC zone are experiencing a fascinating paradox: <strong>often strong but fragile growth</strong>, driven by dynamic markets but threatened by the difficulty of structuring organizations.</p>
<p>When revenue doubles in two years but processes remain artisanal, corporate culture cracks first.</p>

<h2>Warning signs not to ignore</h2>
<ul>
<li>"Veterans" feel dispossessed by the influx of new employees</li>
<li>Founding values dilute in growth</li>
<li>Decisions are made more slowly despite urgency</li>
<li>Middle management turnover explodes</li>
</ul>

<blockquote><p>"I founded this company with 5 people who shared my vision. Today we are 200, and I no longer recognize the culture I created."</p>
<p>— Founder of a tech SME, Douala</p></blockquote>

<h2>The K&P model: Adaptive Leadership in 4 dimensions</h2>
<h3>Dimension 1: Cultural anchoring</h3>
<p>Before scaling, you must <strong>document and formalize the culture</strong>. Not in a forgotten PowerPoint, but in rituals, decision-making processes, stories that are passed on.</p>

<h3>Dimension 2: Evolving matrix structure</h3>
<p>Pyramid org charts don't survive rapid growth. We help our clients adopt structures that grow with them without losing agility.</p>

<h3>Dimension 3: Middle leadership development</h3>
<p>The #1 bottleneck of growth is the lack of managers capable of carrying the vision. An accelerated leadership program (6 months) can be transformative.</p>

<h3>Dimension 4: Continuous engagement measurement</h3>
<p>What you don't measure, you don't improve. Quarterly engagement surveys coupled with rapid corrective actions maintain cohesion when everything moves fast.</p>

<h2>Case study: Merger of 3 industrial entities</h2>
<p>In 2025, Krinch & Partners supported the merger of 3 industrial entities in the CEMAC zone. Results after 6 months:</p>
<ul>
<li><strong>0% departure</strong> among the 45 key talents identified</li>
<li><strong>+22 points</strong> measured engagement</li>
<li><strong>Unified culture</strong> adopted by 87% of employees</li>
</ul>
<p>Growth is not the problem — unaccompanied growth is.</p>
            `,
        },

        // ──────────────── ARTICLE 4 : HR ────────────────
        {
            slug: 'politique-remuneration-competitive-cameroun',
            titleFr: "Construire une politique de rémunération compétitive au Cameroun",
            titleEn: "Building a Competitive Compensation Policy in Cameroon",
            summaryFr: "Dans un marché des talents de plus en plus tendu, la rémunération reste le levier n°1 d'attraction. Guide pratique pour structurer votre grille salariale et vos avantages sociaux.",
            summaryEn: "In an increasingly tight talent market, compensation remains the #1 lever for attraction. A practical guide to structuring your salary grid and social benefits.",
            coverImage: "/images/insights/leadership.png",
            category: "HR" as const,
            author: "Équipe Conseil RH",
            published: true,
            publishedAt: subDays(new Date(), 20),
            contentFr: `
<h2>Le marché des talents camerounais en 2026</h2>
<p>Le marché de l'emploi qualifié au Cameroun connaît une tension inédite. <strong>Les profils digitaux, financiers et managériaux sont courtisés par les entreprises locales, les multinationales ET la diaspora.</strong></p>
<p>Dans ce contexte, une politique de rémunération artisanale — « on négocie au cas par cas » — est une bombe à retardement pour la rétention.</p>

<h2>Les 4 composantes d'une rémunération attractive</h2>
<h3>1. Le salaire de base : se positionner sur le marché</h3>
<p>Un benchmark salarial annuel est indispensable. Notre étude auprès de 120 entreprises de la zone CEMAC révèle des écarts de <strong>25 à 40%</strong> pour des postes identiques dans le même secteur. L'information est le nerf de la guerre.</p>

<h3>2. Le variable : aligner performance et récompense</h3>
<p>Le bonus annuel seul ne suffit plus. Les meilleures pratiques incluent :</p>
<ul>
<li>Des primes trimestrielles liées à des objectifs SMART</li>
<li>Des mécanismes d'intéressement collectif</li>
<li>Des bonus de cooptation pour attirer des talents via les collaborateurs</li>
</ul>

<h3>3. Les avantages sociaux : le différenciateur invisible</h3>
<p>Dans un marché où les salaires de base se rapprochent, ce sont les avantages qui font la différence :</p>
<ul>
<li><strong>Couverture santé étendue</strong> (famille incluse — critère n°1 cité par 78% des candidats)</li>
<li><strong>Formation continue</strong> (budget annuel de développement personnel)</li>
<li><strong>Flexibilité horaire</strong> (encore rare au Cameroun, donc hautement différenciant)</li>
<li><strong>Transport</strong> (navettes d'entreprise ou indemnités kilométriques)</li>
</ul>

<h3>4. Le package non-financier : la culture comme levier</h3>
<blockquote><p>« Mon ancien employeur me payait 20% de plus. Mais ici, j'ai un vrai plan de carrière, un manager qui me développe, et je sens que mon travail a du sens. »</p>
<p>— Cadre financier, PME industrielle, Douala</p></blockquote>

<h2>La méthodologie de construction</h2>
<ol>
<li><strong>Benchmark externe</strong> : positionnement marché par rapport à 5-10 entreprises comparables</li>
<li><strong>Audit interne</strong> : cartographie des écarts, identification des iniquités</li>
<li><strong>Grille structurée</strong> : bandes salariales par niveau, avec des fourchettes claires</li>
<li><strong>Communication</strong> : la transparence sur la politique de rémunération renforce la confiance</li>
</ol>
<p>Chez Krinch & Partners, nous accompagnons la construction de politiques de rémunération depuis la phase de benchmark jusqu'à la communication interne. Contactez-nous pour un diagnostic gratuit.</p>
            `,
            contentEn: `
<h2>The Cameroonian talent market in 2026</h2>
<p>The qualified employment market in Cameroon is experiencing unprecedented tension. <strong>Digital, financial, and managerial profiles are courted by local companies, multinationals, AND the diaspora.</strong></p>
<p>In this context, an artisanal compensation policy — "we negotiate case by case" — is a ticking time bomb for retention.</p>

<h2>The 4 components of attractive compensation</h2>
<h3>1. Base salary: positioning on the market</h3>
<p>An annual salary benchmark is essential. Our study of 120 companies in the CEMAC zone reveals gaps of <strong>25 to 40%</strong> for identical positions in the same sector. Information is key.</p>

<h3>2. Variable pay: aligning performance and reward</h3>
<p>The annual bonus alone is no longer enough. Best practices include:</p>
<ul>
<li>Quarterly bonuses linked to SMART objectives</li>
<li>Collective profit-sharing mechanisms</li>
<li>Referral bonuses to attract talent through employees</li>
</ul>

<h3>3. Social benefits: the invisible differentiator</h3>
<p>In a market where base salaries converge, benefits make the difference:</p>
<ul>
<li><strong>Extended health coverage</strong> (family included — criterion #1 cited by 78% of candidates)</li>
<li><strong>Continuous training</strong> (annual personal development budget)</li>
<li><strong>Schedule flexibility</strong> (still rare in Cameroon, therefore highly differentiating)</li>
<li><strong>Transportation</strong> (company shuttles or mileage allowances)</li>
</ul>

<h3>4. The non-financial package: culture as a lever</h3>
<blockquote><p>"My former employer paid me 20% more. But here, I have a real career plan, a manager who develops me, and I feel my work has meaning."</p>
<p>— Financial executive, industrial SME, Douala</p></blockquote>

<h2>The construction methodology</h2>
<ol>
<li><strong>External benchmark</strong>: market positioning against 5-10 comparable companies</li>
<li><strong>Internal audit</strong>: gap mapping, inequity identification</li>
<li><strong>Structured grid</strong>: salary bands by level, with clear ranges</li>
<li><strong>Communication</strong>: transparency on compensation policy strengthens trust</li>
</ol>
<p>At Krinch & Partners, we support the construction of compensation policies from the benchmark phase to internal communication. Contact us for a free diagnosis.</p>
            `,
        },

        // ──────────────── ARTICLE 5 : IA ────────────────
        {
            slug: 'chatbots-rh-experience-collaborateur',
            titleFr: "Chatbots RH : révolutionner l'expérience collaborateur au quotidien",
            titleEn: "HR Chatbots: Revolutionizing the Daily Employee Experience",
            summaryFr: "Les assistants virtuels RH automatisent les demandes récurrentes et libèrent du temps stratégique pour vos équipes. Analyse du ROI et retour d'expérience terrain.",
            summaryEn: "HR virtual assistants automate recurring requests and free up strategic time for your teams. ROI analysis and field feedback.",
            coverImage: "/images/insights/ia-rh.png",
            category: "IA" as const,
            author: "Équipe IA & Data",
            published: true,
            publishedAt: subDays(new Date(), 25),
            contentFr: `
<h2>80% du temps RH perdu en questions récurrentes</h2>
<p>Un constat frappant : les départements RH des entreprises camerounaises consacrent en moyenne <strong>80% de leur temps à répondre aux mêmes questions</strong> — soldes de congés, bulletins de paie, attestations, procédures internes.</p>
<p>Ce temps perdu, c'est du temps qui n'est pas investi dans ce qui compte vraiment : le développement des talents, la stratégie de recrutement, la gestion prévisionnelle des emplois et compétences.</p>

<h2>Le chatbot RH : votre assistant infatigable</h2>
<p>Un chatbot RH bien configuré peut traiter <strong>90% de ces demandes en moins de 30 secondes</strong>, 24h/24, 7j/7, dans les langues parlées par vos collaborateurs.</p>

<h3>Cas d'usage les plus courants</h3>
<ul>
<li><strong>Gestion des congés</strong> : consultation du solde, dépôt de demande, validation automatique</li>
<li><strong>Support paie</strong> : explication des lignes du bulletin, simulation de net</li>
<li><strong>Onboarding</strong> : guide interactif pour les nouvelles recrues</li>
<li><strong>FAQ RH</strong> : politiques internes, avantages sociaux, procédures</li>
<li><strong>Signalements</strong> : canal confidentiel pour remonter des problématiques</li>
</ul>

<blockquote><p>« En 3 mois, notre chatbot a traité 4 200 demandes. Notre équipe RH a pu se concentrer sur 3 projets stratégiques qu'on repoussait depuis un an. »</p>
<p>— Responsable RH, société d'assurances, Yaoundé</p></blockquote>

<h2>ROI d'un chatbot RH : les chiffres</h2>
<ul>
<li><strong>Coût de mise en œuvre</strong> : 3 à 8M FCFA (selon complexité)</li>
<li><strong>Temps économisé</strong> : 15 à 25 heures/semaine pour l'équipe RH</li>
<li><strong>Satisfaction collaborateur</strong> : +40% (réponse instantanée vs 48h en moyenne)</li>
<li><strong>ROI</strong> : positif dès le 4ème mois</li>
</ul>

<h2>Comment nous déployons un chatbot RH</h2>
<ol>
<li><strong>Analyse des demandes</strong> (2 semaines) : identification des 50 questions les plus fréquentes</li>
<li><strong>Configuration et entraînement</strong> (4 semaines) : alimentation en données, tests avec des utilisateurs pilotes</li>
<li><strong>Lancement progressif</strong> (2 semaines) : déploiement par département, feedback et ajustements</li>
<li><strong>Amélioration continue</strong> : analyse mensuelle des conversations, enrichissement des réponses</li>
</ol>
<p>L'IA ne remplace pas vos RH — elle les libère pour qu'ils fassent ce qu'ils font de mieux : accompagner les humains.</p>
            `,
            contentEn: `
<h2>80% of HR time lost on recurring questions</h2>
<p>A striking observation: HR departments in Cameroonian companies spend on average <strong>80% of their time answering the same questions</strong> — leave balances, pay slips, certificates, internal procedures.</p>
<p>This lost time is time not invested in what really matters: talent development, recruitment strategy, workforce planning.</p>

<h2>The HR chatbot: your tireless assistant</h2>
<p>A well-configured HR chatbot can handle <strong>90% of these requests in less than 30 seconds</strong>, 24/7, in languages spoken by your employees.</p>

<h3>Most common use cases</h3>
<ul>
<li><strong>Leave management</strong>: balance check, request submission, automatic approval</li>
<li><strong>Payroll support</strong>: pay slip line explanations, net salary simulation</li>
<li><strong>Onboarding</strong>: interactive guide for new recruits</li>
<li><strong>HR FAQ</strong>: internal policies, social benefits, procedures</li>
<li><strong>Reporting</strong>: confidential channel for raising issues</li>
</ul>

<blockquote><p>"In 3 months, our chatbot handled 4,200 requests. Our HR team was able to focus on 3 strategic projects we had been postponing for a year."</p>
<p>— HR Manager, insurance company, Yaoundé</p></blockquote>

<h2>HR chatbot ROI: the numbers</h2>
<ul>
<li><strong>Implementation cost</strong>: 3 to 8M FCFA (depending on complexity)</li>
<li><strong>Time saved</strong>: 15 to 25 hours/week for the HR team</li>
<li><strong>Employee satisfaction</strong>: +40% (instant response vs 48h average)</li>
<li><strong>ROI</strong>: positive from the 4th month</li>
</ul>
<p>AI doesn't replace your HR — it frees them to do what they do best: support humans.</p>
            `,
        },

        // ──────────────── ARTICLE 6 : DIGITAL ────────────────
        {
            slug: 'master-data-management-rh-enjeux',
            titleFr: "Master Data Management RH : l'arme secrète des organisations performantes",
            titleEn: "HR Master Data Management: The Secret Weapon of High-Performing Organizations",
            summaryFr: "Vos données RH sont votre actif le plus précieux — si elles sont fiables. Comment structurer votre référentiel de données pour piloter votre organisation avec précision.",
            summaryEn: "Your HR data is your most valuable asset — if it's reliable. How to structure your data repository to steer your organization with precision.",
            coverImage: "/images/insights/digital.png",
            category: "DIGITAL" as const,
            author: "Équipe IA & Data",
            published: true,
            publishedAt: subDays(new Date(), 32),
            contentFr: `
<h2>Le chaos des données RH : un diagnostic alarmant</h2>
<p>Dans 8 entreprises camerounaises sur 10 que nous auditons, la même réalité s'impose : <strong>les données RH sont fragmentées, dupliquées, incohérentes, voire inexistantes.</strong></p>
<p>Fichiers Excel multiples, bases Access abandonnées, registres papier, informations dans les têtes — le patrimoine informationnel RH est un Far West.</p>

<h2>Pourquoi c'est un problème stratégique</h2>
<p>Sans données fiables, impossible de :</p>
<ul>
<li>Piloter la masse salariale avec précision</li>
<li>Identifier les hauts potentiels et planifier les successions</li>
<li>Mesurer le turnover et en comprendre les causes</li>
<li>Se conformer aux obligations réglementaires (CNPS, inspection du travail)</li>
<li>Déployer des outils d'IA (qui nécessitent des données propres)</li>
</ul>

<blockquote><p>« Quand nous avons demandé à notre client le nombre exact de collaborateurs, il nous a fallu 3 semaines pour obtenir un chiffre fiable. Trois semaines. Pour une question élémentaire. »</p></blockquote>

<h2>Notre approche : le référentiel RH unifié</h2>
<h3>Phase 1 : L'audit data (2-4 semaines)</h3>
<p>Identification de tous les silos de données, évaluation de la qualité et de la complétude, cartographie des flux d'information.</p>

<h3>Phase 2 : La modélisation (3-4 semaines)</h3>
<p>Conception du modèle de données cible : quelles entités, quels attributs, quelles règles de validation, quels processus de mise à jour.</p>

<h3>Phase 3 : La migration et le nettoyage (4-8 semaines)</h3>
<p>Le plus gros chantier : dédupliquer, normaliser, enrichir, valider. C'est fastidieux mais indispensable.</p>

<h3>Phase 4 : La gouvernance (continue)</h3>
<p>Sans gouvernance, le chaos revient en 6 mois. Nous mettons en place des processus, des rôles (data stewards) et des indicateurs de qualité.</p>

<h2>Résultats concrets</h2>
<ul>
<li>Un groupe industriel a réduit ses erreurs de paie de <strong>45%</strong> dès le premier mois</li>
<li>Une banque a pu lancer son projet d'IA RH 6 mois plus tôt que prévu grâce à des données propres</li>
<li>Une PME a automatisé ses déclarations CNPS, passant de <strong>5 jours à 2 heures</strong> de traitement</li>
</ul>
<p>Le Master Data Management n'est pas sexy. Mais c'est le socle sans lequel aucune transformation digitale RH ne peut réussir.</p>
            `,
            contentEn: `
<h2>The chaos of HR data: an alarming diagnosis</h2>
<p>In 8 out of 10 Cameroonian companies we audit, the same reality imposes itself: <strong>HR data is fragmented, duplicated, inconsistent, or even non-existent.</strong></p>
<p>Multiple Excel files, abandoned Access databases, paper registers, information in people's heads — the HR information heritage is the Wild West.</p>

<h2>Why it's a strategic problem</h2>
<p>Without reliable data, it's impossible to:</p>
<ul>
<li>Manage payroll with precision</li>
<li>Identify high potentials and plan successions</li>
<li>Measure turnover and understand its causes</li>
<li>Comply with regulatory obligations</li>
<li>Deploy AI tools (which require clean data)</li>
</ul>

<blockquote><p>"When we asked our client for the exact number of employees, it took us 3 weeks to get a reliable figure. Three weeks. For an elementary question."</p></blockquote>

<h2>Our approach: the unified HR repository</h2>
<h3>Phase 1: Data audit (2-4 weeks)</h3>
<p>Identification of all data silos, quality and completeness assessment, information flow mapping.</p>

<h3>Phase 2: Modeling (3-4 weeks)</h3>
<p>Design of target data model: which entities, which attributes, which validation rules, which update processes.</p>

<h3>Phase 3: Migration and cleansing (4-8 weeks)</h3>
<p>The biggest workstream: deduplication, normalization, enrichment, validation. Tedious but essential.</p>

<h3>Phase 4: Governance (ongoing)</h3>
<p>Without governance, chaos returns in 6 months. We set up processes, roles (data stewards), and quality indicators.</p>

<h2>Concrete results</h2>
<ul>
<li>An industrial group reduced payroll errors by <strong>45%</strong> in the first month</li>
<li>A bank launched its HR AI project 6 months earlier than planned thanks to clean data</li>
<li>An SME automated its CNPS declarations, going from <strong>5 days to 2 hours</strong> of processing</li>
</ul>
<p>Master Data Management isn't sexy. But it's the foundation without which no HR digital transformation can succeed.</p>
            `,
        },

        // ──────────────── ARTICLE 7 : STRATEGY ────────────────
        {
            slug: 'gestion-previsionnelle-emplois-competences-gpec',
            titleFr: "GPEC en Afrique : anticiper les compétences de demain dès aujourd'hui",
            titleEn: "Strategic Workforce Planning in Africa: Anticipating Tomorrow's Skills Today",
            summaryFr: "La Gestion Prévisionnelle des Emplois et Compétences est un luxe réservé aux grands groupes ? Non. Voici comment l'adapter aux réalités des entreprises africaines.",
            summaryEn: "Is Strategic Workforce Planning a luxury reserved for large groups? No. Here's how to adapt it to African business realities.",
            coverImage: "/images/insights/leadership.png",
            category: "STRATEGY" as const,
            author: "Dr. K — Associé Gérant",
            published: true,
            publishedAt: subDays(new Date(), 40),
            contentFr: `
<h2>Pourquoi la GPEC est vitale pour les entreprises africaines</h2>
<p>La Gestion Prévisionnelle des Emplois et Compétences (GPEC) est trop souvent perçue comme un concept théorique européen. <strong>C'est pourtant en Afrique qu'elle est le plus urgente.</strong></p>
<p>Pourquoi ? Parce que le continent connaît simultanément :</p>
<ul>
<li>Une croissance démographique qui transforme le marché du travail</li>
<li>Une digitalisation accélérée qui rend obsolètes certains métiers</li>
<li>Une pénurie de compétences critiques dans les domaines technologiques</li>
<li>Une fuite des cerveaux vers l'Europe et l'Amérique du Nord</li>
</ul>

<h2>La GPEC simplifiée : une approche pragmatique</h2>
<p>Chez Krinch & Partners, nous avons développé une approche en 3 étapes adaptée aux PME et ETI africaines :</p>

<h3>Étape 1 : La photo de l'existant</h3>
<p>Qui sont vos collaborateurs aujourd'hui ? Quelles compétences possèdent-ils ? Où sont les concentrations de risque (départ à la retraite, postes critiques sans back-up) ?</p>

<h3>Étape 2 : La projection stratégique</h3>
<p>Quels métiers émergeront dans votre secteur d'ici 3 ans ? Quelles compétences seront requises ? Quels postes disparaîtront ou se transformeront ?</p>

<h3>Étape 3 : Le plan d'action</h3>
<p>Comment combler les écarts ? Par la formation interne, le recrutement ciblé, les partenariats avec les universités locales, ou la mobilité interne ?</p>

<blockquote><p>« La GPEC nous a permis d'anticiper le besoin de 12 data analysts 18 mois avant qu'il ne devienne critique. Nous avons formé 8 collaborateurs en interne et recruté 4 juniors. Zéro urgence, zéro surcoût. »</p>
<p>— DRH, banque panafricaine</p></blockquote>

<h2>Les outils de la GPEC moderne</h2>
<ul>
<li><strong>La matrice des compétences</strong> : visuel simple qui croise les postes et les niveaux de maîtrise</li>
<li><strong>Le 9-box grid RH</strong> : pour identifier les hauts potentiels et les plans de succession</li>
<li><strong>Le tableau de bord prévisionnel</strong> : dashboard dynamique intégrant les départs prévisibles, les besoins émergents et les actions de développement</li>
</ul>
<p>La GPEC n'est pas une contrainte administrative — c'est un avantage compétitif décisif pour les entreprises qui veulent grandir sans improvisier.</p>
            `,
            contentEn: `
<h2>Why Strategic Workforce Planning is vital for African companies</h2>
<p>Strategic Workforce Planning is too often perceived as a theoretical European concept. <strong>Yet it is in Africa where it is most urgent.</strong></p>
<p>Why? Because the continent simultaneously experiences:</p>
<ul>
<li>Demographic growth transforming the labor market</li>
<li>Accelerated digitalization making certain jobs obsolete</li>
<li>A shortage of critical skills in technological domains</li>
<li>Brain drain to Europe and North America</li>
</ul>

<h2>Simplified workforce planning: a pragmatic approach</h2>
<p>At Krinch & Partners, we developed a 3-step approach adapted to African SMEs and ETIs:</p>

<h3>Step 1: The current picture</h3>
<p>Who are your employees today? What skills do they possess? Where are the risk concentrations (retirement, critical positions without backup)?</p>

<h3>Step 2: Strategic projection</h3>
<p>What jobs will emerge in your sector within 3 years? What skills will be required? Which positions will disappear or transform?</p>

<h3>Step 3: The action plan</h3>
<p>How to bridge the gaps? Through internal training, targeted recruitment, partnerships with local universities, or internal mobility?</p>

<blockquote><p>"Workforce planning allowed us to anticipate the need for 12 data analysts 18 months before it became critical. We trained 8 employees internally and recruited 4 juniors. Zero urgency, zero extra cost."</p>
<p>— HR Director, pan-African bank</p></blockquote>

<h2>Modern workforce planning tools</h2>
<ul>
<li><strong>Skills matrix</strong>: simple visual crossing positions and proficiency levels</li>
<li><strong>9-box HR grid</strong>: to identify high potentials and succession plans</li>
<li><strong>Forecast dashboard</strong>: dynamic dashboard integrating predictable departures, emerging needs, and development actions</li>
</ul>
<p>Workforce planning is not an administrative constraint — it's a decisive competitive advantage for companies that want to grow without improvising.</p>
            `,
        },

        // ──────────────── ARTICLE 8 : HR ────────────────
        {
            slug: 'marque-employeur-afrique-attirer-meilleurs-talents',
            titleFr: "Marque Employeur en Afrique : comment attirer les meilleurs talents en 2026",
            titleEn: "Employer Branding in Africa: How to Attract the Best Talent in 2026",
            summaryFr: "Votre marque employeur est votre premier outil de recrutement. Dans un marché concurrentiel, voici comment construire une proposition de valeur irrésistible pour les talents africains.",
            summaryEn: "Your employer brand is your first recruitment tool. In a competitive market, here's how to build an irresistible value proposition for African talent.",
            coverImage: "/images/insights/ia-rh.png",
            category: "HR" as const,
            author: "Équipe Conseil RH",
            published: true,
            publishedAt: subDays(new Date(), 48),
            contentFr: `
<h2>La guerre des talents est déclarée</h2>
<p>En 2026, les meilleurs talents africains n'attendent plus qu'on vienne les chercher. <strong>Ils choisissent leur employeur autant que l'employeur les choisit.</strong></p>
<p>LinkedIn, Glassdoor, les réseaux sociaux — l'information sur les entreprises est accessible, partagée, commentée. Votre réputation en tant qu'employeur se construit chaque jour, que vous le vouliez ou non.</p>

<h2>Les 5 piliers de la marque employeur</h2>
<h3>1. L'Employee Value Proposition (EVP)</h3>
<p>Qu'est-ce qui rend votre entreprise unique pour un collaborateur ? Ce n'est pas seulement le salaire. C'est la combinaison de :</p>
<ul>
<li>L'environnement de travail et la culture</li>
<li>Les opportunités de développement et de carrière</li>
<li>La rémunération et les avantages</li>
<li>Le sens et l'impact du travail</li>
<li>La stabilité et la vision de l'entreprise</li>
</ul>

<h3>2. La présence digitale</h3>
<p>Votre page LinkedIn a-t-elle été mise à jour ce mois-ci ? Votre site carrières montre-t-il des vraies photos de vos locaux et de vos équipes ? Publiez-vous des témoignages de collaborateurs ?</p>

<h3>3. L'expérience candidat</h3>
<p>Chaque candidat non retenu est un ambassadeur potentiel — ou un détracteur. Le processus de recrutement DOIT être :</p>
<ul>
<li>Rapide (maximum 3 semaines entre candidature et offre)</li>
<li>Transparent (feedback systématique, même en cas de refus)</li>
<li>Respectueux (horaires d'entretien tenus, accueil professionnel)</li>
</ul>

<blockquote><p>« J'ai refusé une offre à 30% de plus parce que le processus de recrutement de l'autre entreprise m'avait laissé une impression désastreuse. Aucun retour pendant 6 semaines, puis une convocation sèche. »</p>
<p>— Ingénieur logiciel, 28 ans, Douala</p></blockquote>

<h3>4. Les ambassadeurs internes</h3>
<p>Vos collaborateurs sont vos meilleurs recruteurs. Mettez-les en avant :</p>
<ul>
<li>Témoignages vidéo sur les réseaux sociaux</li>
<li>Programme de cooptation attractif</li>
<li>Participation à des événements et conférences</li>
</ul>

<h3>5. L'engagement RSE</h3>
<p>Les talents de la génération Y et Z sont sensibles à l'impact sociétal. Votre engagement dans la communauté, l'environnement et l'inclusion n'est plus optionnel.</p>

<h2>Par où commencer ?</h2>
<p>Krinch & Partners propose un audit complet de marque employeur en 4 semaines :</p>
<ol>
<li>Diagnostic de perception (interne ET externe)</li>
<li>Benchmark concurrentiel</li>
<li>Définition de l'EVP</li>
<li>Plan d'action sur 12 mois avec KPIs</li>
</ol>
<p>Votre marque employeur est un investissement, pas un coût. Et dans un marché des talents de plus en plus tendu, c'est souvent le facteur décisif.</p>
            `,
            contentEn: `
<h2>The war for talent is declared</h2>
<p>In 2026, the best African talents no longer wait to be found. <strong>They choose their employer as much as the employer chooses them.</strong></p>
<p>LinkedIn, Glassdoor, social media — information about companies is accessible, shared, commented on. Your reputation as an employer is built every day, whether you want it or not.</p>

<h2>The 5 pillars of employer branding</h2>
<h3>1. The Employee Value Proposition (EVP)</h3>
<p>What makes your company unique for an employee? It's not just the salary. It's the combination of:</p>
<ul>
<li>Work environment and culture</li>
<li>Development and career opportunities</li>
<li>Compensation and benefits</li>
<li>Meaning and impact of work</li>
<li>Company stability and vision</li>
</ul>

<h3>2. Digital presence</h3>
<p>Has your LinkedIn page been updated this month? Does your careers site show real photos of your offices and teams? Do you publish employee testimonials?</p>

<h3>3. Candidate experience</h3>
<p>Every rejected candidate is a potential ambassador — or detractor. The recruitment process MUST be:</p>
<ul>
<li>Fast (maximum 3 weeks between application and offer)</li>
<li>Transparent (systematic feedback, even in case of rejection)</li>
<li>Respectful (interview times respected, professional welcome)</li>
</ul>

<blockquote><p>"I turned down an offer for 30% more because the other company's recruitment process left me with a disastrous impression. No feedback for 6 weeks, then a dry summons."</p>
<p>— Software engineer, 28, Douala</p></blockquote>

<h3>4. Internal ambassadors</h3>
<p>Your employees are your best recruiters. Put them forward:</p>
<ul>
<li>Video testimonials on social media</li>
<li>Attractive referral program</li>
<li>Participation in events and conferences</li>
</ul>

<h3>5. CSR commitment</h3>
<p>Generation Y and Z talent are sensitive to societal impact. Your commitment to community, environment, and inclusion is no longer optional.</p>

<h2>Where to start?</h2>
<p>Krinch & Partners offers a complete employer brand audit in 4 weeks:</p>
<ol>
<li>Perception diagnosis (internal AND external)</li>
<li>Competitive benchmark</li>
<li>EVP definition</li>
<li>12-month action plan with KPIs</li>
</ol>
<p>Your employer brand is an investment, not a cost. And in an increasingly tight talent market, it's often the decisive factor.</p>
            `,
        },
    ];

    for (const post of blogPosts) {
        await prisma.blogPost.create({ data: post });
        console.log(`  ✅ Article créé: ${post.slug}`);
    }

    // 4. Team
    await prisma.teamMember.create({
        data: {
            name: "Dr. K",
            roleFr: "Associé Gérant",
            roleEn: "Managing Partner",
            bioFr: "Expert en stratégie...",
            bioEn: "Expert in strategy...",
        }
    })

    console.log('✅ Seeding finished. 8 articles publiés.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
