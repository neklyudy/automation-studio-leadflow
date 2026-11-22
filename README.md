# Automation Studio — Олександр Неклюдов

Україномовне портфоліо спеціаліста з автоматизації та навчальний кейс LeadFlow.
Збережено темно-синій дизайн, логотип, інтерактивні схеми й справжні знімки прототипу.
Контакти: sasha.nekludov43@gmail.com, https://t.me/neklyudy.

## Технології та структура

React 19, TypeScript, Vite 7, Tailwind CSS 4, Motion, Lucide, локальний Manrope.

- `src/App.tsx` — головна, LeadFlow, сторінка 404.
- `src/components/UI.tsx` — навігація, схема, галерея, контакти.
- `src/components/VideoDemo.tsx` — MP4, YouTube та альтернативи без готового відео.
- `src/config/site.ts` — ім’я, фото, контакти, тексти й послуги.
- `src/config/video.ts` — конфігурація `leadflowDemoVideo`.
- `src/config/paths.ts` — маршрути та ресурси в підпапці GitHub Pages.
- `src/data/projects.ts` — проєкти, можливості, етапи, галерея.
- `src/styles.css`, `src/fonts.css` — дизайн і локальні шрифти.
- `scripts/prerender.mjs` — статичний HTML, metadata, robots та sitemap.
- `scripts/check-content.mjs`, `scripts/check-build.mjs` — перевірки вмісту та збірки.
- `scripts/browser-smoke.mjs` — повторювані перевірки через браузерний REPL Codex.
- `.github/workflows/pages.yml` — перевірки, збірка й публікація на GitHub Pages.
- `public/projects/leadflow` — знімки навчального прототипу й заготовка субтитрів.

## Локальний запуск

Потрібні Node.js 24 і pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Для перевірки саме GitHub Pages у PowerShell:

```powershell
$env:GITHUB_PAGES='true'
$env:VITE_GITHUB_PAGES='true'
$env:VITE_BASE_PATH='/automation-studio-leadflow/'
$env:VITE_SITE_ORIGIN='https://neklyudy.github.io'
$env:VITE_PUBLIC_SITE='true'
pnpm check
pnpm lint
pnpm build
pnpm check:build
pnpm preview --port 4173
```

Відкрийте `http://127.0.0.1:4173/automation-studio-leadflow/`.
Без цих змінних dev працює від `/`; не використовуйте локальну адресу як canonical.

## GitHub Pages

У Settings → Pages оберіть Source: GitHub Actions. Workflow бере origin і base_path
з configure-pages, збирає сайт після push у main та публікує dist. Перед публікацією
перевіряйте фактичний diff; стан публікації перевіряйте за останнім успішним запуском GitHub Actions.
Прямий маршрут кейса має файл `projects/leadflow/index.html`, тому працює після перезавантаження.
Заголовками кешування керує GitHub Pages; локальний конфіг не змінює їх. Імена JS/CSS/шрифтів
містять hash для оновлення ресурсів. HTTPS налаштовується GitHub Pages.

## Зміна контенту

Контакти й тексти редагуйте у `src/config/site.ts`; порожній контакт не показується.
Фото: додайте власний файл до public та задайте `site.photo`. За відсутності фото — ініціали.
Не публікуйте особисті дані без дозволу. Поточні email і Telegram власник дозволив оприлюднити.

Проєкти описано масивом `projects` у `src/data/projects.ts`. Для нового кейса додайте
окрему сторінку/маршрут в App та запис у prerender, sitemap і перевірки. Самого slug недостатньо
для появи нового повного кейса. Вигадані роботи й комерційні результати не додавайте.

Зображення: додайте файл у public, задайте `src`, українські `title`, `description`, `alt`
в gallery. Використовуйте шляхи від `/`, без префікса репозиторію: його додає localUrl.
Не використовуйте фото зі справжніми контактами, приватними адресами таблиць і даними акаунтів.
Знімки російського інтерфейсу не перекладаються штучно; поруч є українське пояснення.

Відео: дивіться `DEMO_VIDEO_GUIDE.md`. Порожній URL показує чесні робочі альтернативи.
MP4/YouTube гілки реалізовано, але справжнього ролика ще немає.

## Перевірки

`pnpm check` — TypeScript і перевірка публічного вмісту; `pnpm lint` — ESLint;
`pnpm build` — клієнт і prerender; `pnpm check:build` — файли маршрутів, метадані,
ресурси, контакти, порожнє відео та перевірка URL YouTube. Запускати check:build після build.

Браузерний smoke використовує документовані tab/viewport API Codex і не запускається як Node CLI:
імпортуйте `runBrowserSmoke` з `scripts/browser-smoke.mjs` у cua_repl, передайте вкладку,
viewport capability та URL preview. Перевіряються 14 комбінацій сторінок/ширин,
меню, клавіатура, галерея, zoom, Escape, повернення фокуса й контакти.

Результати та обмеження: `IMPROVEMENTS.md`. Lighthouse-оцінки не заявлено: вимірювання
не виконувалося. Це портфоліо й навчальний стенд; виробнича CRM і її резервна копія не входять до сайту.

JSON-протоколи проведених браузерних перевірок: `reports/browser-smoke.json`,
`reports/browser-final.json`. Вони не є звітами Lighthouse або повного WCAG-аудиту.

## Інтерактивна демонстрація

На сторінці кейса `#interactive-demo` можна пройти вигадану заявку до локальної демо-CRM. Реальні форми, CRM і пошта з цього блоку не викликаються. Компонент і перевірена формула: `src/components/LeadFlowDemo.tsx`; контрольні приклади: `scripts/check-build.mjs`; UI-сценарії: `scripts/browser-smoke.mjs`. Тарифи — знімок навчального проєкту, не пропозиція клінінгових послуг.

Звіт цього проходу та обмеження: `IMPROVEMENTS.md`, `reports/interactive-local.json`.
