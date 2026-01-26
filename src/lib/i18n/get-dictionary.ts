export type Locale = 'fr' | 'en'

const dictionaries = {
    fr: async () => ({
        ...(await import('../../../locales/fr/common.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/sectors.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/about.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/services.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/training.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/digital_ia.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/careers.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/contact.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/legal.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/privacy.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/cookies.json').then((module) => module.default)),
        ...(await import('../../../locales/fr/insights.json').then((module) => module.default)),
        quiz: await import('../../../locales/fr/quiz.json').then((module) => module.default),
    }),
    en: async () => ({
        ...(await import('../../../locales/en/common.json').then((module) => module.default)),
        ...(await import('../../../locales/en/services.json').then((module) => module.default)),
        ...(await import('../../../locales/en/sectors.json').then((module) => module.default)),
        ...(await import('../../../locales/en/about.json').then((module) => module.default)),
        ...(await import('../../../locales/en/training.json').then((module) => module.default)),
        ...(await import('../../../locales/en/digital_ia.json').then((module) => module.default)),
        ...(await import('../../../locales/en/careers.json').then((module) => module.default)),
        ...(await import('../../../locales/en/contact.json').then((module) => module.default)),
        ...(await import('../../../locales/en/legal.json').then((module) => module.default)),
        ...(await import('../../../locales/en/privacy.json').then((module) => module.default)),
        ...(await import('../../../locales/en/cookies.json').then((module) => module.default)),
        ...(await import('../../../locales/en/insights.json').then((module) => module.default)),
        quiz: await import('../../../locales/en/quiz.json').then((module) => module.default),
    }),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
