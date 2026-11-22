import fs from "node:fs/promises";
import assert from "node:assert/strict";
import { youtubeId } from "../.ssr/entry-server.js";
const prefix = process.env.VITE_BASE_PATH || "/";
const pages = process.env.GITHUB_PAGES === "true";
for (const [file, heading] of [["dist/index.html", "Допомагаю бізнесу"], [pages ? "dist/projects/leadflow/index.html" : "dist/projects/leadflow.html", "LeadFlow"]]) {
  const html = await fs.readFile(file, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
  assert.ok(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].includes(heading));
  assert.ok(html.includes('lang="uk"'));
  for (const name of ["description", "og:title", "og:description", "og:image", "twitter:title", "twitter:description", "twitter:image"])
    assert.match(html, new RegExp(`(?:name|property)="${name}"\\s+content="[^"]+"`));
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
    assert.ok(url.startsWith(prefix), `Invalid base path: ${url}`);
    const pathname = url.split(/[?#]/)[0].slice(prefix.length);
    const candidates = ["dist/" + pathname, "dist/" + pathname + "index.html"];
    assert.ok((await Promise.all(candidates.map(p => fs.stat(p).then(s => s.isFile()).catch(() => false)))).some(Boolean), `Missing local asset or route: ${url}`);
  }
  assert.ok(html.includes('mailto:sasha.nekludov43@gmail.com'));
  assert.ok(html.includes('https://t.me/neklyudy'));
  if (heading === "LeadFlow") {
    assert.ok(html.includes("Форма навчальна"));
    assert.ok(!html.includes("Відтворити демонстрацію"), "Empty video must not have a play button");
    assert.ok(!html.includes("<iframe"), "YouTube must load only after user interaction");
  }
  console.log(`PASS: static HTML, metadata, contacts, local paths — ${file}`);
}
assert.ok((await fs.readFile("dist/404.html", "utf8")).includes('content="noindex,nofollow"'));
for (const url of ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://youtu.be/dQw4w9WgXcQ", "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"])
  assert.equal(youtubeId(url), "dQw4w9WgXcQ");
for (const url of ["javascript:alert(1)", "https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ", "https://example.com/dQw4w9WgXcQ", "https://youtu.be/bad"]) assert.equal(youtubeId(url), null);
console.log("PASS: video source validation and noindex on 404");
