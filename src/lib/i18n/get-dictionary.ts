import { db } from '@/lib/db';

export type Locale = 'fr' | 'en'

// All content file keys
const FILE_KEYS = [
    'common', 'about', 'services', 'training', 'digital_ia',
    'careers', 'contact', 'legal', 'privacy', 'cookies',
    'insights', 'sectors', 'quiz'
] as const;

// Static JSON imports (fallback)
const staticDictionaries: Record<string, Record<Locale, () => Promise<any>>> = {
    common: {
        fr: () => import('../../../locales/fr/common.json').then(m => m.default),
        en: () => import('../../../locales/en/common.json').then(m => m.default),
    },
    about: {
        fr: () => import('../../../locales/fr/about.json').then(m => m.default),
        en: () => import('../../../locales/en/about.json').then(m => m.default),
    },
    services: {
        fr: () => import('../../../locales/fr/services.json').then(m => m.default),
        en: () => import('../../../locales/en/services.json').then(m => m.default),
    },
    training: {
        fr: () => import('../../../locales/fr/training.json').then(m => m.default),
        en: () => import('../../../locales/en/training.json').then(m => m.default),
    },
    digital_ia: {
        fr: () => import('../../../locales/fr/digital_ia.json').then(m => m.default),
        en: () => import('../../../locales/en/digital_ia.json').then(m => m.default),
    },
    careers: {
        fr: () => import('../../../locales/fr/careers.json').then(m => m.default),
        en: () => import('../../../locales/en/careers.json').then(m => m.default),
    },
    contact: {
        fr: () => import('../../../locales/fr/contact.json').then(m => m.default),
        en: () => import('../../../locales/en/contact.json').then(m => m.default),
    },
    legal: {
        fr: () => import('../../../locales/fr/legal.json').then(m => m.default),
        en: () => import('../../../locales/en/legal.json').then(m => m.default),
    },
    privacy: {
        fr: () => import('../../../locales/fr/privacy.json').then(m => m.default),
        en: () => import('../../../locales/en/privacy.json').then(m => m.default),
    },
    cookies: {
        fr: () => import('../../../locales/fr/cookies.json').then(m => m.default),
        en: () => import('../../../locales/en/cookies.json').then(m => m.default),
    },
    insights: {
        fr: () => import('../../../locales/fr/insights.json').then(m => m.default),
        en: () => import('../../../locales/en/insights.json').then(m => m.default),
    },
    sectors: {
        fr: () => import('../../../locales/fr/sectors.json').then(m => m.default),
        en: () => import('../../../locales/en/sectors.json').then(m => m.default),
    },
    quiz: {
        fr: () => import('../../../locales/fr/quiz.json').then(m => m.default),
        en: () => import('../../../locales/en/quiz.json').then(m => m.default),
    },
};

/**
 * Deep merge: DB content overrides static JSON defaults
 * Arrays are replaced entirely (not merged element-by-element)
 */
function deepMerge(base: any, override: any): any {
    if (override === undefined || override === null) return base;
    if (typeof override !== 'object' || Array.isArray(override)) return override;
    if (typeof base !== 'object' || Array.isArray(base)) return override;

    const result = { ...base };
    for (const key of Object.keys(override)) {
        if (key in result) {
            result[key] = deepMerge(result[key], override[key]);
        } else {
            result[key] = override[key];
        }
    }
    return result;
}

/**
 * Main dictionary function:
 * 1. Load all static JSON files (baseline)
 * 2. Load DB overrides for this locale
 * 3. Deep merge DB over static (DB wins)
 */
export const getDictionary = async (locale: Locale) => {
    // 1. Load static baseline
    const staticParts: any[] = [];
    for (const key of FILE_KEYS) {
        try {
            const data = await staticDictionaries[key][locale]();
            if (key === 'quiz') {
                staticParts.push({ quiz: data });
            } else {
                staticParts.push(data);
            }
        } catch {
            // File might not exist for this locale
        }
    }
    const staticDict = Object.assign({}, ...staticParts);

    // 2. Load DB overrides
    try {
        const dbEntries = await db.siteContent.findMany({
            where: { locale }
        });

        if (dbEntries.length === 0) return staticDict;

        // 3. Deep merge each DB entry over the static dict
        let merged = { ...staticDict };
        for (const entry of dbEntries) {
            try {
                const dbContent = JSON.parse(entry.content);
                if (entry.fileKey === 'quiz') {
                    merged = deepMerge(merged, { quiz: dbContent });
                } else {
                    merged = deepMerge(merged, dbContent);
                }
            } catch {
                // Invalid JSON in DB, skip
            }
        }

        return merged;
    } catch {
        // DB not available, use static fallback
        return staticDict;
    }
}
