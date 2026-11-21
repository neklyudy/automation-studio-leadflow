# Automation Studio — Олександр Неклюдов

Україномовне портфоліо спеціаліста з автоматизації та навчальний кейс LeadFlow.
React, TypeScript, Vite. Дані демонстрації вигадані.

## Запуск
Node.js 24 та pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Публікація
У Settings → Pages виберіть Source: GitHub Actions, потім запустіть workflow
Publish portfolio to GitHub Pages. Адреса та базовий шлях беруться з налаштувань Pages.
Workflow будує сайт після змін у main.

src/config/site.ts — ім’я, контакти та тексти.
src/data/projects.ts — проєкти й галерея.
scripts/prerender.mjs — статичні сторінки та SEO.
.github/workflows/pages.yml — автоматична публікація.

Фото та відео ще не додано. Справжня CRM і резервні копії таблиць не входять до репозиторію.
