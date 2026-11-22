// Run with the documented Codex browser tab/viewport APIs; never starts a browser.
// import this module in cua_repl and call runBrowserSmoke(tab, viewport, localURL).
export async function runBrowserSmoke(tab, viewport, homeURL) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const results = [];
  for (const page of ["home", "leadflow"]) {
    const url = page === "home" ? homeURL : homeURL + "projects/leadflow/";
    await tab.goto(url);
    await tab.getAXState({ emit: false });
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await viewport.set({ width, height: 900 });
      await tab.getAXState({ emit: false });
      const state = await tab.playwright.evaluate(() => ({
        width: innerWidth,
        layoutWidth: document.documentElement.clientWidth,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        h1: document.querySelectorAll("h1").length,
        clipped: [...document.querySelectorAll("h1,h2,h3")].filter(h => h.scrollWidth > h.clientWidth + 1).map(h => h.textContent),
        invalidControls: [...document.querySelectorAll("[aria-controls]")].filter(e => !document.getElementById(e.getAttribute("aria-controls"))).length,
      }));
      assert(state.width === width && !state.overflow && state.h1 === 1 && !state.clipped.length && !state.invalidControls, `${page} ${width}: ${JSON.stringify(state)}`);
      results.push({ page, ...state });
    }
  }
  await viewport.set({ width: 390, height: 844 });
  await tab.getAXState({ emit: false });
  await tab.playwright.getByRole("button", { name: "Відкрити меню", exact: true }).click();
  await tab.getAXState({ emit: false });
  await tab.playwright.getByRole("button", { name: "Закрити меню", exact: true }).press("Escape");
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.getByRole("button", { name: "Відкрити меню", exact: true }).isVisible(), "Menu Escape");
  await tab.playwright.getByRole("tab", { name: "Заявка Google Forms", exact: true }).press("ArrowDown");
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.getByRole("heading", { name: "Система обробляє дані", exact: true }).isVisible(), "Workflow keyboard");
  await tab.playwright.getByRole("button", { name: "Збільшити: Форма заявки", exact: true }).click();
  await tab.getAXState({ emit: false });
  await tab.playwright.getByRole("button", { name: "Збільшити зображення", exact: true }).click();
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.getByRole("button", { name: "Умістити зображення", exact: true }).getAttribute("aria-pressed") === "true", "Gallery zoom");
  await tab.playwright.getByRole("button", { name: "Наступне зображення", exact: true }).click();
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.getByRole("heading", { name: "Панель менеджера", exact: true }).isVisible(), "Gallery next");
  await tab.playwright.getByRole("button", { name: "Закрити зображення", exact: true }).press("Escape");
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.evaluate(() => !document.querySelector("dialog").open && document.activeElement?.getAttribute("aria-label") === "Збільшити: Форма заявки"), "Dialog Escape/focus");
  await tab.playwright.getByLabel("Контакт для перевірки", { exact: true }).selectOption("invalid");
  await tab.playwright.getByRole("button", { name: "Перевірити заявку", exact: true }).click();
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.getByRole("heading", { name: "Помилка даних", exact: true }).isVisible(), "Invalid contact blocked");
  assert(await tab.playwright.locator(".demo-crm").count() === 0, "Invalid request cannot enter CRM");
  await tab.playwright.getByLabel("Контакт для перевірки", { exact: true }).selectOption("valid");
  for (const name of ["Перевірити заявку", "Розрахувати вартість", "Показати сповіщення", "Додати в демо-CRM"]) {
    await tab.playwright.getByRole("button", { name, exact: true }).click();
    await tab.getAXState({ emit: false });
  }
  assert((await tab.playwright.locator(".demo-crm").innerText()).includes("5 437,50"), "Demo reference price");
  assert(await tab.playwright.locator(".demo-crm").count() === 1, "Exactly one demo CRM record");
  assert(await tab.playwright.getByRole("button", { name: "Демонстрацію завершено", exact: true }).isEnabled() === false, "Repeated insertion blocked");
  await tab.playwright.getByLabel("Площа, м²", { exact: true }).fill("10");
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.locator(".demo-crm").count() === 0, "Edited parameters invalidate result");
  await tab.playwright.getByRole("button", { name: "Перевірити заявку", exact: true }).press("Enter");
  await tab.getAXState({ emit: false });
  await tab.playwright.getByRole("button", { name: "Розрахувати вартість", exact: true }).press("Enter");
  await tab.getAXState({ emit: false });
  assert((await tab.playwright.locator(".demo-total").innerText()).includes("3 187,50"), "Minimum with extras and urgency");
  await tab.playwright.getByRole("button", { name: "Скинути приклад", exact: true }).click();
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.locator(".demo-total").count() === 0 && await tab.playwright.getByRole("button", { name: "Перевірити заявку", exact: true }).isEnabled(), "Demo reset");
  await tab.playwright.getByRole("link", { name: "Обговорити мою задачу", exact: true }).click();
  await tab.getAXState({ emit: false });
  assert(await tab.playwright.evaluate(() => location.hash === "#contact" && document.querySelector("#contact").getBoundingClientRect().top >= document.querySelector("header").getBoundingClientRect().bottom - 1), "Contact navigation/header");
  assert(await tab.playwright.getByRole("link", { name: "Написати на email", exact: true }).getAttribute("href") === "mailto:sasha.nekludov43@gmail.com", "Email");
  assert(await tab.playwright.getByRole("link", { name: "Telegram", exact: true }).getAttribute("href") === "https://t.me/neklyudy", "Telegram");
  await viewport.reset();
  return { responsive: results, menu: true, workflowKeyboard: true, gallery: true, focusReturn: true, contactNavigation: true, demo: { invalidContactBlocked: true, pricing: true, minimum: true, simulatedNotification: true, singleRecord: true, editInvalidation: true, keyboard: true, reset: true } };
}
