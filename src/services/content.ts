import { db } from '../lib/db';
import { PageContentSchema } from '../lib/schemas';
import { z } from 'zod';

export type UpdateContentDTO = z.infer<typeof PageContentSchema>;

export async function getPageContent(pageKey: string, locale: string = 'fr') {
    const items = await db.pageContent.findMany({
        where: { pageKey }
    });

    // Transforme en un objet clé-valeur simple pour le frontend
    // ex: { 'hero_title': 'Bienvenue...', 'cta_label': 'Cliquez ici' }
    const contentMap: Record<string, string> = {};

    items.forEach(item => {
        const fullKey = \`\${item.sectionKey}_\${item.key}\`;
    contentMap[fullKey] = locale === 'fr' ? item.contentFr : item.contentEn;
  });

  return contentMap;
}

export async function updateContent(data: UpdateContentDTO) {
  // Upsert: Créer ou Mettre à jour
  return await db.pageContent.upsert({
    where: {
      pageKey_sectionKey_key: {
        pageKey: data.pageKey,
        sectionKey: data.sectionKey,
        key: data.key
      }
    },
    update: {
      contentFr: data.contentFr,
      contentEn: data.contentEn
    },
    create: {
      pageKey: data.pageKey,
      sectionKey: data.sectionKey,
      key: data.key,
      contentFr: data.contentFr,
      contentEn: data.contentEn
    }
  });
}
