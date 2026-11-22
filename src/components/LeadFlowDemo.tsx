import { useRef, useState } from "react";
import type { FormEvent } from "react";

// Snapshot of the educational CRM tariffs; no connection to its spreadsheet.
const rates = {
  regular: { label: "Підтримувальне прибирання", perMeter: 35, minimum: 1000 },
  general: { label: "Генеральне прибирання", perMeter: 60, minimum: 1800 },
  renovation: { label: "Прибирання після ремонту", perMeter: 85, minimum: 2500 },
};
export type DemoInput = { service: keyof typeof rates; area: number; windows: number; oven: boolean; fridge: boolean; urgent: boolean };
export function calculateDemo(input: DemoInput) {
  const rate = rates[input.service];
  if (!rate || !Number.isFinite(input.area) || input.area < 1 || input.area > 1000 || !Number.isInteger(input.windows) || input.windows < 0 || input.windows > 100) throw new Error("Invalid demo input");
  const base = Math.max(input.area * rate.perMeter, rate.minimum);
  const extras = input.windows * 200 + (input.oven ? 350 : 0) + (input.fridge ? 300 : 0);
  const urgency = input.urgent ? Math.round((base + extras) * 25) / 100 : 0;
  return { base, extras, urgency, total: Math.round((base + extras + urgency) * 100) / 100 };
}
const initial: DemoInput = { service: "general", area: 60, windows: 2, oven: true, fridge: false, urgent: true };
const money = (amount: number) => new Intl.NumberFormat("uk-UA", { style: "currency", currency: "UAH" }).format(amount);
const stages = ["Заявка", "Перевірка", "Розрахунок", "Сповіщення", "CRM"];

export default function LeadFlowDemo() {
  const [input, setInput] = useState(initial);
  const [invalidContact, setInvalidContact] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const price = step >= 2 ? calculateDemo(input) : null;
  function update(patch: Partial<DemoInput>) { setInput({ ...input, ...patch }); setStep(0); setError(""); }
  function reset() { setInput(initial); setInvalidContact(false); setStep(0); setError(""); }
  function advance(event: FormEvent) {
    event.preventDefault();
    if (invalidContact) { setError("Помилка даних: контакт 32523532 не відповідає формату email. Оберіть коректний приклад, щоб продовжити."); setStep(0); }
    else {
      try { calculateDemo(input); setError(""); setStep(Math.min(step + 1, 4)); }
      catch { setError("Перевірте площу (1–1000 м²) і кількість вікон (ціле число від 0 до 100)."); }
    }
    result.current?.focus();
  }
  return <div className="leadflow-sandbox" id="interactive-demo">
    <div className="sandbox-heading"><span className="pill">Інтерактивний приклад</span><h3>Проведіть заявку через усі етапи.</h3><p>Усе відбувається на цій сторінці. Листи не надсилаються, справжні замовлення не створюються. Дані зникають після перезавантаження.</p></div>
    <ol className="demo-progress" aria-label="Етапи демонстрації">{stages.map((stage, index) => <li key={stage} aria-current={step === index ? "step" : undefined} className={step >= index ? "is-reached" : ""}><span aria-hidden="true">{index + 1}</span>{stage}</li>)}</ol>
    <div className="sandbox-layout">
      <form onSubmit={advance} className="sandbox-form" aria-label="Вигадана заявка">
        <p className="demo-person"><strong>Олена Приклад</strong><span>Вигаданий клієнт · м. Приклад, вул. Тестова, 10</span></p>
        <label htmlFor="demo-contact">Контакт для перевірки</label>
        <select id="demo-contact" value={invalidContact ? "invalid" : "valid"} onChange={e => { setInvalidContact(e.target.value === "invalid"); setStep(0); setError(""); }} aria-describedby="contact-hint"><option value="valid">demo@example.com — коректний формат</option><option value="invalid">32523532 — помилка формату</option></select>
        <p id="contact-hint" className="field-hint">Оберіть помилку, щоб перевірити блокування заявки.</p>
        <label htmlFor="demo-service">Послуга</label>
        <select id="demo-service" value={input.service} onChange={e => update({ service: e.target.value as DemoInput["service"] })}>{Object.entries(rates).map(([key, rate]) => <option value={key} key={key}>{rate.label}</option>)}</select>
        <div className="demo-input-row"><div><label htmlFor="demo-area">Площа, м²</label><input id="demo-area" type="number" min="1" max="1000" step="0.1" required value={Number.isNaN(input.area) ? "" : input.area} onChange={e => update({ area: e.target.valueAsNumber })} /></div><div><label htmlFor="demo-windows">Кількість вікон</label><input id="demo-windows" type="number" min="0" max="100" step="1" required value={Number.isNaN(input.windows) ? "" : input.windows} onChange={e => update({ windows: e.target.valueAsNumber })} /></div></div>
        <fieldset><legend>Додаткові послуги</legend>{([['oven', 'Духовка · 350 грн'], ['fridge', 'Холодильник · 300 грн'], ['urgent', 'Терміново · +25%']] as const).map(([key, label]) => <label className="demo-check" key={key}><input type="checkbox" checked={input[key]} onChange={e => update({ [key]: e.target.checked })} />{label}</label>)}</fieldset>
        <p className="field-hint">Тариф: {rates[input.service].perMeter} грн/м², мінімум {rates[input.service].minimum} грн. Вікно — 200 грн. Це тарифи навчального прототипу.</p>
        <div className="demo-actions"><button type="submit" className="button button-primary" disabled={step === 4}>{["Перевірити заявку", "Розрахувати вартість", "Показати сповіщення", "Додати в демо-CRM", "Демонстрацію завершено"][step]}</button><button type="button" className="demo-reset" onClick={reset}>Скинути приклад</button></div>
      </form>
      <div className="sandbox-result" ref={result} tabIndex={-1} aria-label="Результат демонстрації">
        <p className="demo-step-status" role="status">{error || ["Заявку підготовлено. Перевірте її дані.", "Дані перевірено. Тепер можна розрахувати ціну.", "Вартість розраховано. Наступний крок — сповіщення.", "Приклад сповіщення готовий. Додайте заявку в демо-CRM.", "DEMO-0001 додано до локальної демо-CRM."][step]}</p>
        {error ? <div className="demo-error"><h4>Помилка даних</h4><p>Підтвердження заблоковано до виправлення контакту. Сповіщення й запис у демо-CRM не створено.</p></div> : <>
          <h4>{step === 0 ? "Приклад готовий до перевірки" : step === 1 ? "Перевірку пройдено" : "Попередня вартість"}</h4>
          {price ? <dl className="demo-price"><div><dt>Прибирання з урахуванням мінімуму</dt><dd>{money(price.base)}</dd></div><div><dt>Додаткові послуги</dt><dd>{money(price.extras)}</dd></div><div><dt>Терміновість {input.urgent ? "25%" : "0%"}</dt><dd>{money(price.urgency)}</dd></div><div className="demo-total"><dt>Разом</dt><dd>{money(price.total)}</dd></div></dl> : <p>Оберіть параметри й натисніть «{step === 0 ? "Перевірити заявку" : "Розрахувати вартість"}». Зміна параметрів починає обробку знову.</p>}
          {step >= 3 && price && <article className="demo-message"><span className="eyebrow">Приклад листа · не надіслано</span><h4>Нова заявка DEMO-0001</h4><p>{rates[input.service].label}<br />Попередня вартість: {money(price.total)}<br />Наступна дія: зв’язатися з клієнтом.</p></article>}
          {step === 4 && price && <article className="demo-crm"><span className="eyebrow">Локальна демо-CRM · 1 запис</span><h4>DEMO-0001 · Олена Приклад</h4><p>{rates[input.service].label} · {input.area} м²</p><p>{money(price.total)} <span className="demo-new">Новий</span></p><p>Потрібна дія: узгодити деталі й підтвердити замовлення.</p></article>}
        </>}
      </div>
    </div>
  </div>;
}
