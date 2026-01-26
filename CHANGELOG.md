# Changelog - Krinch & Partners

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.0.0] - 2026-01-25

### Ajouté
- **Infrastructure** : Initialisation du projet Next.js 15 avec Tailwind CSS 4.
- **Design System** : Configuration de la charte graphique premium (Bleu Nuit #0F2A44, Or Doux #C9A24D).
- **Multilingue** : Migration de l'architecture i18n vers le dossier racine `/locales` avec configuration centralisée (`i18n.config.json`).
- **Identité Visuelle** : Contextualisation bilingue avec des visuels premium ancrés localement (Cameroun/Afrique Subsaharienne).
- **Composants Layout** :
  - `Header` bilingue avec effet glassmorphism et toggle de langue.
  - `Footer` structuré avec liens d'expertise et informations institutionnelles.
- **Pages** :
  - `Landing Page (Hero)` : Section d'impact bilingue.
  - `Services Hub` : Grille détaillée des domaines d'expertise.
  - `Secteurs & Expertises` : Mise en page Z-Pattern incluant le nouveau pilier **PME & Startups** pour le soutien au tissu économique local.

### Corrigé
- Erreurs de nommage lors de l'initialisation du projet npm.
- Migration des fichiers vers la structure de route dynamique `[locale]`.
- **Hydratation** : Résolution du conflit d'hydratation dans `layout.tsx` (gestion dynamique de l'attribut `lang` et suppression des avertissements liés aux extensions).

---
*Document généré par l'Expert Développeur Senior Krinch & Partners.*
