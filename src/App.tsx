import { useEffect } from "react";
import {
  Check,
  CheckCircle2,
  Code2,
  FileInput,
  LayoutDashboard,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import { site, services, copy } from "./config/site";
import { appPath, localUrl } from "./config/paths";
import {
  projects,
  leadflow,
  capabilities,
  checks,
  gallery,
} from "./data/projects";
import {
  Header,
  Footer,
  Button,
  Icon,
  Reveal,
  SectionHeading,
  FlowDiagram,
  Gallery,
  ContactLinks,
  VideoDemo,
} from "./components/UI";

function Contact() {
  return (
    <section className="contact-section section" id="contact">
      <div className="container contact-layout">
        <div>
          <span className="eyebrow">Наступний крок</span>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.description}</p>
          <ContactLinks />
        </div>
        <div className="contact-symbol" aria-hidden="true">
          <Workflow size={100} strokeWidth={0.7} />
          <span>
            Спочатку завдання.
            <br />
            Потім — рішення.
          </span>
        </div>
      </div>
    </section>
  );
}
function ProjectPreview() {
  return (
    <div
      className="project-preview"
      aria-label="Схематичний приклад інтерфейсу LeadFlow"
    >
      <div className="preview-top">
        <span>
          <span className="tiny-mark" /> LeadFlow
        </span>
        <span>Навчальна CRM</span>
      </div>
      <div className="preview-body">
        <aside>
          <LayoutDashboard size={18} />
          <div className="preview-side-active" />
          <div />
          <div />
        </aside>
        <div className="preview-main">
          <div className="preview-title">
            <h4>Панель менеджера</h4>
            <span>Приклад інтерфейсу</span>
          </div>
          <div className="preview-metrics">
            <div>
              <small>Нові</small>
              <strong>28</strong>
            </div>
            <div>
              <small>Виконані</small>
              <strong>2</strong>
            </div>
            <div>
              <small>Виконано на</small>
              <strong>
                7 500 <em>грн</em>
              </strong>
            </div>
          </div>
          <div className="preview-table">
            <div className="preview-table-head">
              <span>Замовлення</span>
              <span>Потрібна дія</span>
              <span>Статус</span>
            </div>
            <div>
              <span>CLN-0002</span>
              <span>Виправити дані</span>
              <b className="status-error">Помилка даних</b>
            </div>
            <div>
              <span>CLN-0028</span>
              <span>Перевірити повтор</span>
              <b className="status-warn">Можливий дублікат</b>
            </div>
            <div>
              <span>CLN-0009</span>
              <span>Зв’язатися з клієнтом</span>
              <b className="status-new">Новий</b>
            </div>
          </div>
        </div>
      </div>
      <div className="preview-bottom">
        <ShieldCheck size={13} />
        <span>
          Ілюстрація інтерфейсу · справжні результати навчальної перевірки
        </span>
      </div>
    </div>
  );
}
function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-line" />
              {copy.hero.eyebrow}
            </span>
            <h1>
              {copy.hero.title}
              <br />
              <span>{copy.hero.accent}</span>
            </h1>
            <p>{copy.hero.description}</p>
            <div className="button-row">
              <Button href="#projects">Переглянути проєкти</Button>
              <Button href="#contact" secondary>
                Зв’язатися зі мною
              </Button>
            </div>
            <div className="hero-note">
              <CheckCircle2 size={17} /> Від конкретного завдання — до робочої системи
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-grid" aria-hidden="true" />
            <div className="incoming-card">
              <div className="soft-icon">
                <FileInput size={22} />
              </div>
              <div>
                <small>Вхідна заявка</small>
                <strong>Генеральне прибирання</strong>
                <span>60 м² · додаткові послуги</span>
              </div>
              <span className="mini-label">ПРИКЛАД</span>
            </div>
            <div className="connector-path" aria-hidden="true">
              <span />
            </div>
            <div className="processing-card">
              <div className="processing-brand">
                <span className="process-orbit">
                  <Workflow size={25} />
                </span>
                <div>
                  <strong>
                    Дані стають
                    <br />
                    наступною дією.
                  </strong>
                  <small>Перевірка · розрахунок · сповіщення</small>
                </div>
              </div>
              <div className="processing-tags">
                <span>
                  <Check size={13} /> Дані перевірено
                </span>
                <span>
                  <Check size={13} /> Ціну розраховано
                </span>
              </div>
              <div className="processing-total">
                <span>Попередня вартість</span>
                <strong>
                  5 437,50 <small>грн</small>
                </strong>
              </div>
            </div>
            <div className="result-row">
              <div>
                <Icon name="bell" size={18} />
                <span>Менеджера сповіщено</span>
              </div>
              <div>
                <Icon name="table" size={18} />
                <span>Замовлення в CRM</span>
              </div>
            </div>
            <span className="visual-footnote">
              Як може працювати ваша автоматизація
            </span>
          </div>
        </section>
        <div className="principles-strip">
          <div className="container">
            <span>Більше, ніж набір інструментів.</span>
            <strong>Узгоджений процес.</strong>
            <span className="strip-tools">
              Заявки <i /> Розрахунки <i /> Сповіщення <i /> Контроль
            </span>
          </div>
        </div>
        <section id="services" className="section container">
          <SectionHeading
            eyebrow="Що я автоматизую"
            title="Рутина повторюється. Рішення — працює."
            text="Допомагаю поєднати окремі дії в послідовний і зрозумілий процес."
          />
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} className="service-card">
                <span className="service-icon">
                  <Icon name={s.icon} size={27} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="service-note">
                  {i === 3 && <span className="dev-label">У розвитку</span>}
                  {s.note}
                </span>
              </Reveal>
            ))}
          </div>
        </section>
        <section id="projects" className="section projects-section">
          <div className="container">
            <div className="heading-inline">
              <SectionHeading
                eyebrow="Мої проєкти"
                title="Менше обіцянок. Більше робочих рішень."
                text="Практичний проєкт для автоматизації звичного бізнес-процесу."
              />
              <span className="section-side-note">
                ВІД ІДЕЇ
                <br />
                ДО ПЕРЕВІРКИ
              </span>
            </div>
            {projects.map((project) => (
              <Reveal key={project.slug} className="project-feature">
                <div className="project-description">
                  <div className="project-type">
                    <span className="pill">{project.type}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3>
                    {project.name}
                    <span className="project-name-dot">.</span>
                  </h3>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <ul className="project-capabilities">
                    {project.features.map((f) => (
                      <li key={f}>
                        <Check size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button href={`/projects/${project.slug}`}>
                    Докладніше про проєкт
                  </Button>
                </div>
                <a
                  href={localUrl(`/projects/${project.slug}`)}
                  className="project-preview-link"
                  aria-label={`Відкрити кейс ${project.name}`}
                >
                  <ProjectPreview />
                </a>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section container approach-section">
          <SectionHeading
            eyebrow="Принцип роботи"
            title="Інструменти поєднані. Дії — зрозумілі."
            text="Клієнт заповнює форму. Система бере на себе повторювані дії. Менеджер ухвалює рішення."
          />
          <FlowDiagram />
        </section>
        <section id="about" className="section about-section">
          <div className="container about-layout">
            <div className="about-visual">
              {site.photo ? (
                <img
                  src={localUrl(site.photo)}
                  alt={site.name || "Автор Automation Studio"}
                  loading="lazy"
                />
              ) : (
                <>
                  <Code2 size={80} strokeWidth={0.8} />
                  <span>
                    Створюю. Перевіряю.
                    <br />
                    Удосконалюю.
                  </span>
                </>
              )}
              <div className="about-caption">
                {site.name ? `${site.name} · ${site.role}` : "Незалежний розробник автоматизацій"}
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow={copy.about.eyebrow}
                title={copy.about.title}
              />
              <p className="about-intro">{copy.about.text}</p>
              <p className="about-detail">{copy.about.detail}</p>
              <div className="about-values">
                <span>
                  <ShieldCheck size={19} /> Перевірена логіка
                </span>
                <span>
                  <Workflow size={19} /> Практичний підхід
                </span>
              </div>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
function LeadFlow() {
  return (
    <>
      <Header isCase />
      <main id="main">
        <section className="case-hero container">
          <a className="back-link" href={localUrl("/#projects")}>
            Повернутися до проєктів
          </a>
          <div className="case-hero-grid">
            <div>
              <span className="eyebrow">Автоматизація бізнесу / CRM</span>
              <h1>
                LeadFlow<span>.</span>
              </h1>
              <p className="case-subtitle">
                Від заявки до керування замовленням — в одній системі.
              </p>
              <p className="case-intro">
                Автоматизація обробки заявок для клінінгової компанії: форма, розрахунки, сповіщення й робоча панель менеджера.
              </p>
              <div className="tech-tags">
                {leadflow.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="button-row">
                <Button href="#demo">Переглянути систему</Button>
                <Button href="#workflow" secondary>
                  Як це працює
                </Button>
              </div>
            </div>
            <div className="case-summary">
              <span className="pill">Навчальний проєкт</span>
              <h2>
                Один процес.
                <br />
                Від першого звернення
                <br />
                до результату.
              </h2>
              <dl>
                <div>
                  <dt>Завдання</dt>
                  <dd>Організувати обробку заявок</dd>
                </div>
                <div>
                  <dt>Для кого</dt>
                  <dd>Малий сервісний бізнес</dd>
                </div>
                <div>
                  <dt>Формат</dt>
                  <dd>Робочий демонстраційний проєкт</dd>
                </div>
              </dl>
              <p>Вигадані дані. Без заяв про комерційне впровадження.</p>
            </div>
          </div>
        </section>
        <section className="problem-section section">
          <div className="container problem-layout">
            <div>
              <span className="eyebrow">Від проблеми до рішення</span>
              <h2>
                Заявка надійшла.
                <br />
                Що відбувається далі?
              </h2>
              <p>
                За ручної роботи кожен наступний крок залежить від уваги менеджера. Це типові труднощі, для розв’язання яких створено навчальний проєкт.
              </p>
            </div>
            <div className="problem-list">
              {[
                "Дані доводиться переносити вручну.",
                "Вартість потрібно щоразу розраховувати.",
                "Помилки й повторні заявки складно помітити.",
                "Статуси зберігаються в різних місцях.",
                "Нове звернення може залишитися без уваги.",
              ].map((t) => (
                <div key={t}>
                  <span />
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container solution-section">
          <span className="eyebrow">Рішення</span>
          <h2>
            Зібрати все
            <br />в узгоджений процес.
          </h2>
          <p className="lead-text">
            Я поєднав клієнтську форму, автоматичну обробку, CRM-таблицю, панель менеджера й email-сповіщення. Інструменти виконують повторювані дії, менеджер працює із замовленнями.
          </p>
        </section>
        <section id="workflow" className="section container workflow-section">
          <SectionHeading
            eyebrow="Як працює LeadFlow"
            title="Чотири етапи. Жодного втраченого кроку."
            text="Оберіть етап, щоб побачити, що відбувається із заявкою. Приклад нижче ілюструє логіку системи."
          />
          <FlowDiagram interactive />
        </section>
        <section className="section capabilities-section">
          <div className="container">
            <SectionHeading
              eyebrow="Можливості системи"
              title="Усе, що потрібно для обробки заявки."
            />
            <div className="capability-grid">
              {capabilities.map(([icon, title, text]) => (
                <Reveal className="capability" key={title}>
                  <Icon name={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section test-section">
          <div className="container">
            <div className="test-intro">
              <SectionHeading
                eyebrow="Перевірка на практиці"
                title="Не лише налаштувати. Перевірити."
                text="Систему перевіряв на вигаданих заявках: від різних комбінацій послуг до роботи менеджера в окремому обліковому записі."
              />
              <div className="test-mark">
                <ShieldCheck size={42} strokeWidth={1} />
                <span>
                  Перевірені
                  <br />
                  результати
                </span>
              </div>
            </div>
            <div className="test-metrics">
              <div>
                <strong>
                  25<span> / 25</span>
                </strong>
                <h3>тестових заявок збережено</h3>
                <p>Кожну знайдено у формі й CRM рівно один раз.</p>
              </div>
              <div>
                <strong>
                  25<span> / 25</span>
                </strong>
                <h3>розрахунків збіглося</h3>
                <p>Ціни звірено з очікуваними значеннями.</p>
              </div>
              <div>
                <strong>3</strong>
                <h3>навмисні дублікати виявлено</h3>
                <p>Позначено для рішення менеджером.</p>
              </div>
              <div>
                <strong>25</strong>
                <h3>email-сповіщень отримано</h3>
                <p>Отримання підтверджено в Gmail.</p>
              </div>
            </div>
            <div className="check-list">
              {checks.map((c) => (
                <span key={c}>
                  <Check size={16} />
                  {c}
                </span>
              ))}
            </div>
            <details className="test-details">
              <summary>Що показав навантажувальний тест</summary>
              <p>
                Перша серія виявила пропуск 10 сповіщень через очікування блокування обробників. Усі заявки збереглися. Час очікування збільшено, повторну обробку вже записаних відповідей оптимізовано, пропущені листи надіслано без повторів.
              </p>
              <p>
                Потім ті самі 25 подій оброблено повторно: нові замовлення й повторні листи не з’явилися. Нова одночасна серія з 25 форм після виправлення не проводилася. Ці перевірки стосуються навчального стенда й не є показниками комерційного впровадження.
              </p>
            </details>
          </div>
        </section>
        <section className="section container" id="screenshots">
          <SectionHeading
            eyebrow="Інтерфейс системи"
            title="Подивіться, як це виглядає."
            text="Справжні екрани навчального проєкту. Службові елементи облікових записів вилучено з кадрів."
          />
          <Gallery items={gallery} />
        </section>
        <section className="section demo-section" id="demo">
          <div className="container">
            <div className="demo-top">
              <div>
                <SectionHeading
                  eyebrow="Спробуйте самі"
                  title="Від ідеї — до робочої системи."
                  text="Відкрийте форму або перегляньте інтерактивну схему обробки заявки."
                />
                <p className="demo-warning">
                  <ShieldCheck size={17} /> Форма навчальна. Використовуйте лише вигадані ім’я, контакт і адресу. Надсилання не бронює прибирання.
                </p>
              </div>
              <div className="demo-buttons">
                <Button href={site.formUrl} external>
                  Відкрити форму заявки
                </Button>
                <Button
                  href={site.demoCrmUrl || "#workflow"}
                  external={!!site.demoCrmUrl}
                  secondary
                >
                  Переглянути демо
                </Button>
              </div>
            </div>
            <VideoDemo />
          </div>
        </section>
        <section className="section container technology-section">
          <SectionHeading
            eyebrow="Технології"
            title="Доступні інструменти. Продуманий зв’язок."
          />
          <div className="technology-grid">
            {[
              [
                "Google Forms",
                "Інтерфейс для клієнта",
                "Приймає заявки й допомагає зібрати потрібні дані.",
              ],
              [
                "Google Sheets",
                "Дані й робота менеджера",
                "Зберігає замовлення, статуси, вартість і показники.",
              ],
              [
                "Google Apps Script",
                "Логіка автоматизації",
                "Обробляє відповіді, перевіряє дані й надсилає сповіщення.",
              ],
            ].map(([name, role, text]) => (
              <article key={name}>
                <span className="tech-role">{role}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section case-conclusion container">
          <span className="eyebrow">Підсумок проєкту</span>
          <h2>
            Від заявки до керування замовленням —<br />в одній системі.
          </h2>
          <p>
            LeadFlow — навчальний проєкт, що демонструє, як доступні інструменти Google Workspace можна поєднати в повноцінний процес обробки заявок для малого бізнесу.
          </p>
          <Button href="/#contact">Обговорити схоже рішення</Button>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
function NotFound() {
  return (
    <>
      <Header isCase />
      <main id="main" className="container not-found">
        <span className="eyebrow">Сторінку не знайдено</span>
        <h1>
          Здається, тут
          <br />
          немає наступного кроку.
        </h1>
        <Button href="/">На головну</Button>
      </main>
      <Footer />
    </>
  );
}
export default function App({
  path = typeof window === "undefined" ? "/" : window.location.pathname,
}: {
  path?: string;
}) {
  const cleaned = appPath(path).replace(/\/$/, "").replace(/\/index\.html$/, "").replace(/\.html$/, "") || "/";
  const isCase = cleaned === "/projects/leadflow";
  useEffect(() => {
    document.documentElement.lang = "uk";
    document.title = isCase
      ? "LeadFlow — навчальна CRM для клінінгу | Automation Studio"
      : cleaned === "/"
        ? "Automation Studio — автоматизація бізнес-процесів"
        : "Сторінку не знайдено | Automation Studio";
  }, [isCase, cleaned]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Перейти до вмісту
      </a>
      {cleaned === "/" ? <Home /> : isCase ? <LeadFlow /> : <NotFound />}
    </MotionConfig>
  );
}
