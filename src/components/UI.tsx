import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import {
  Bell,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileInput,
  Inbox,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  Menu,
  MonitorPlay,
  Settings2,
  ShieldCheck,
  Sparkles,
  Table2,
  X,
  ChartNoAxesCombined,
  ExternalLink,
  Mail,
  Github,
  Send,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { navigation, site } from "../config/site";
import { localUrl } from "../config/paths";
import { workflow } from "../data/projects";
import type { GalleryItem } from "../data/projects";
const iconMap: Record<string, LucideIcon> = {
  bell: Bell,
  calculator: Calculator,
  copy: Copy,
  form: FileInput,
  inbox: Inbox,
  layout: LayoutDashboard,
  list: ListChecks,
  lock: LockKeyhole,
  settings: Settings2,
  shield: ShieldCheck,
  sparkles: Sparkles,
  table: Table2,
  chart: ChartNoAxesCombined,
};
export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const Component = iconMap[name] || Workflow;
  return <Component size={size} strokeWidth={1.65} aria-hidden="true" />;
}
export function Brand() {
  return (
    <span className="brand">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      automation<span className="brand-light">studio</span>
    </span>
  );
}
export function Button({
  children,
  href,
  secondary = false,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      href={localUrl(href)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external && <ExternalLink size={16} aria-hidden="true" />}
    </a>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [6, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Header({ isCase = false }: { isCase?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        const first = links[0],
          last = links[links.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          menuButton.current?.focus();
        } else if (
          e.shiftKey &&
          document.activeElement === menuButton.current
        ) {
          e.preventDefault();
          last.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          menuButton.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href={localUrl("/")} aria-label="Automation Studio — головна">
          <Brand />
        </a>
        <nav
          ref={menu}
          id="main-navigation"
          className={open ? "nav nav-open" : "nav"}
          aria-label="Основна навігація"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={localUrl(`${isCase ? "/" : ""}#${item.id}`)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={localUrl(isCase ? "/#contact" : "#contact")}>
          Обговорити проєкт
        </a>
        <button
          ref={menuButton}
          className="menu-toggle icon-button"
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function FlowDiagram({
  interactive = false,
}: {
  interactive?: boolean;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className={`flow ${interactive ? "flow-interactive" : ""}`}>
      <div className="flow-top">
        <span>
          <Workflow size={16} aria-hidden="true" /> LeadFlow / процес
        </span>
        <span className="mono">WORKFLOW</span>
      </div>
      <div
        className="flow-track"
        role={interactive ? "tablist" : undefined}
        aria-label={interactive ? "Етапи обробки заявки" : undefined}
      >
        {workflow.map((step, i) =>
          interactive ? (
            <button
              role="tab"
              aria-selected={active === i}
              aria-controls={`flow-panel-${i}`}
              id={`flow-tab-${i}`}
              tabIndex={active === i ? 0 : -1}
              key={step.short}
              className={`flow-node ${active === i ? "flow-node-active" : ""}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 3
                        : (active + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : 3)) % 4;
                  setActive(next);
                  document.getElementById(`flow-tab-${next}`)?.focus();
                }
              }}
            >
              <span className="node-icon">
                <Icon name={step.icon} />
              </span>
              <span>{step.short}</span>
              <small>{step.detail}</small>
            </button>
          ) : (
            <div
              key={step.short}
              className={`flow-node ${i === 1 ? "flow-node-active" : ""}`}
            >
              <span className="node-icon">
                <Icon name={step.icon} />
              </span>
              <span>{step.short}</span>
              <small>{step.detail}</small>
            </div>
          ),
        )}
      </div>
      {interactive ? (
        workflow.map((step, index) => <div
          key={step.short}
          hidden={active !== index}
          className="flow-detail"
          role="tabpanel"
          id={`flow-panel-${index}`}
          aria-labelledby={`flow-tab-${index}`}
          tabIndex={0}
        >
          <div>
            <span className="eyebrow">{step.detail}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
          <div
            className="demo-record"
            aria-label="Ілюстрація на вигаданих даних"
          >
            <small>ПРИКЛАД · ВИГАДАНІ ДАНІ</small>
            {step.fields.map((f) => (
              <span key={f}>
                <Check size={14} aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </div>)
      ) : (
        <div className="flow-summary">
          <span className="signal" />
          Одна заявка. Узгоджений процес.
          <span className="summary-caption">Без ручного перенесення</span>
        </div>
      )}
    </div>
  );
}
export function ContactLinks() {
  const contacts = [
    {
      value: site.contacts.email,
      href: `mailto:${site.contacts.email}`,
      label: "Написати на email",
      icon: Mail,
    },
    {
      value: site.contacts.telegram,
      href: site.contacts.telegram,
      label: "Telegram",
      icon: Send,
    },
    {
      value: site.contacts.github,
      href: site.contacts.github,
      label: "GitHub",
      icon: Github,
    },
  ].filter((c) => c.value);
  return contacts.length ? (
    <div className="contact-links">
      {contacts.map((c) => (
        <a
          className="button button-primary"
          key={c.label}
          href={c.href}
          {...(c.icon !== Mail
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <c.icon size={18} />
          {c.label}
        </a>
      ))}
    </div>
  ) : (
    <p className="contact-pending">
      Контакти для зв’язку з’являться тут після запуску портфоліо.
      <br />
      <a href={localUrl("/projects/leadflow#demo")}>Поки можна ознайомитися з LeadFlow</a>
    </p>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <a href={localUrl("/")} aria-label="На головну">
        <Brand />
      </a>
      <p>Практичні рішення для зрозумілих процесів.</p>
      <span>© {new Date().getFullYear()} Automation Studio</span>
    </footer>
  );
}
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const isOpen = selected !== null;
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (selected === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    closeButton.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      lastFocus.current?.focus();
    };
  }, [isOpen]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    setZoomed(false);
  }
  function move(offset: number) {
    if (selected === null) return;
    let next = (selected + offset + items.length) % items.length;
    while (!items[next].src)
      next = (next + offset + items.length) % items.length;
    setSelected(next);
    setZoomed(false);
  }
  const current = selected === null ? null : items[selected];
  return (
    <>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <article
            className={`gallery-card ${i === 0 ? "gallery-featured" : ""}`}
            key={item.id}
          >
            {item.src ? (
              <button
                className="gallery-image"
                onClick={() => setSelected(i)}
                aria-label={`Збільшити: ${item.title}`}
              >
                <img
                  src={localUrl(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="700"
                />
                <span>
                  Збільшити <ExternalLink size={15} />
                </span>
              </button>
            ) : (
              <div className="gallery-placeholder">
                <MonitorPlay size={32} />
                <span>{item.title}</span>
                <small>Знімок екрана буде додано</small>
              </div>
            )}
            <div className="gallery-caption">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="gallery-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        {current && (
          <div className="lightbox-inner">
            <div className="lightbox-header">
              <h3 id="gallery-title">{current.title}</h3>
              <button
                ref={closeButton}
                className="icon-button"
                onClick={close}
                aria-label="Закрити зображення"
              >
                <X />
              </button>
            </div>
            <div className={`lightbox-canvas ${zoomed ? "is-zoomed" : ""}`}><img src={localUrl(current.src)} alt={current.alt} /></div>
            <button className="zoom-control" onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>{zoomed ? "Умістити зображення" : "Збільшити зображення"}</button>
            <div className="lightbox-bottom">
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label="Попереднє зображення"
              >
                <ChevronLeft />
              </button>
              <p>{current.description}</p>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label="Наступне зображення"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
