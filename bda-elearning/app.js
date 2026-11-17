const $ = (s, r = document) => r.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const daysLeft = d => Math.ceil((new Date(d + "T23:59:59") - new Date()) / 864e5);
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

/* ---------- Icons ---------- */
const PATHS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  bell: '<path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/>',
  book: '<path d="M4 19V5a2 2 0 012-2h14v16H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h14"/>',
  clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
  folder: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>',
  link: '<path d="M10 14a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1-1"/>',
  db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  file: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/>',
  notes: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 3.5M12 17h.01"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  grid: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  slides: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  check: '<path d="M5 12l5 5L20 7"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="4"/>',
  star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  pinned: '<path d="M9 3h6l-1 6 4 4H6l4-4zM12 13v8"/>'
};
const ic = (n, s = 20) => `<svg class="i" viewBox="0 0 24 24" width="${s}" height="${s}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PATHS[n]}</svg>`;
const TYPE_ICON = { pdf: "file", video: "video", link: "link", book: "book", dataset: "db" };

/* ---------- Teacher profiles ---------- */
let cur = +store.get("bdaProfile") || 0;
if (!PROFILES[cur]) cur = 0;
const ME = () => PROFILES[cur];
const switcher = (style = "tabs") => PROFILES.length < 2 ? "" :
  `<div class="switch ${style}" role="tablist" aria-label="Choose teacher">${PROFILES.map((p, i) =>
    `<button role="tab" aria-selected="${i === cur}" data-p="${i}" title="${esc(p.name)}">${avatar(p, "xs")}<span>${esc(style === "dots" ? p.name.trim().split(/\s+/).pop() : p.name)}</span></button>`).join("")}</div>`;
const avatar = (P, size = "") => P.photo
  ? `<img class="avatar ${size}" src="${esc(P.photo)}" alt="Photo of ${esc(P.name)}">`
  : `<span class="avatar ph ${size}" role="img" aria-label="Photo of ${esc(P.name)}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="9" r="4.2"/><path d="M3.5 21.5a8.5 8.5 0 0117 0z"/></svg></span>`;

/* ---------- Small building blocks ---------- */
function dueTag(d) {
  const n = daysLeft(d);
  if (n < 0) return `<span class="badge red">Closed</span>`;
  if (n <= 7) return `<span class="badge amber">Due in ${n + 1 > 1 ? n + 1 + " days" : "1 day"}</span>`;
  return `<span class="badge green">Open</span>`;
}
const dlBtn = (url, label = "Download") => url
  ? `<a class="btn primary" href="${esc(url)}" ${url.startsWith("http") ? 'target="_blank" rel="noopener"' : "download"}>${ic(url.startsWith("http") ? "arrow" : "download", 16)} ${label}</a>`
  : `<span class="btn off" aria-disabled="true">Coming soon</span>`;
const pageHead = (icon, color, title, lead) => `<section class="page-head" style="--c:var(--${color})"><div class="wrap"><span class="tile lg">${ic(icon, 28)}</span><div><h1>${title}</h1><p>${lead}</p></div></div></section>`;
const notConnected = what => `<div class="empty">${ic("link", 18)} Nothing here yet.<small>Teacher: add the ${what} link in <b>data.js</b> (see SETUP-GOOGLE.md).</small></div>`;

/* ---------- Google Drive + Google Sheets ---------- */
const gid = s => (String(s || "").match(/[-\w]{25,}/) || [""])[0];
const G = "application/vnd.google-apps.";
const cache = {};
const fetchText = url => cache[url] || (cache[url] = fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).catch(e => { delete cache[url]; throw e; }));

/* View + Download buttons for any link: local file, Drive file, Google Doc/Sheet/Slides */
function fileLinks(url) {
  if (!url) return "";
  const id = gid(url), local = !/^https?:/i.test(url);
  let view = url, dl = url;
  if (/(drive|docs)\.google\.com/.test(url) && id) {
    if (/\/folders\//.test(url)) return `<a class="btn primary" href="${esc(url)}" target="_blank" rel="noopener">${ic("folder", 16)} Open folder</a>`;
    if (/\/document\//.test(url)) dl = `https://docs.google.com/document/d/${id}/export?format=pdf`;
    else if (/\/spreadsheets\//.test(url)) dl = `https://docs.google.com/spreadsheets/d/${id}/export?format=xlsx`;
    else if (/\/presentation\//.test(url)) dl = `https://docs.google.com/presentation/d/${id}/export/pptx`;
    else { view = `https://drive.google.com/file/d/${id}/view`; dl = `https://drive.google.com/uc?export=download&id=${id}`; }
  }
  return `<a class="btn primary" href="${esc(view)}" target="_blank" rel="noopener">${ic("eye", 16)} View</a>` +
         `<a class="btn ghost" href="${esc(dl)}" ${local ? "download" : 'target="_blank" rel="noopener"'}>${ic("download", 16)} Download</a>`;
}

function driveUrl(f) {
  if (f.mimeType === G + "folder") return `https://drive.google.com/drive/folders/${f.id}`;
  if (f.mimeType === G + "document") return `https://docs.google.com/document/d/${f.id}/edit`;
  if (f.mimeType === G + "spreadsheet") return `https://docs.google.com/spreadsheets/d/${f.id}/edit`;
  if (f.mimeType === G + "presentation") return `https://docs.google.com/presentation/d/${f.id}/edit`;
  return `https://drive.google.com/file/d/${f.id}/view`;
}
function fileKind(f) {
  const m = f.mimeType || "", ext = (f.name.match(/\.(\w+)$/) || ["", ""])[1].toLowerCase();
  if (m === G + "folder") return ["folder", "Folder"];
  if (m.includes("pdf")) return ["file", "PDF"];
  if (m.startsWith("image/")) return ["image", "Image"];
  if (m.startsWith("video/")) return ["video", "Video"];
  if (/sheet|excel/.test(m)) return ["grid", ext ? ext.toUpperCase() : "Sheet"];
  if (/presentation|powerpoint/.test(m)) return ["slides", ext ? ext.toUpperCase() : "Slides"];
  if (/document|word/.test(m)) return ["notes", ext ? ext.toUpperCase() : "Doc"];
  return ["file", ext ? ext.toUpperCase() : "File"];
}
const fileSize = b => !b ? "" : b > 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB";
function fileCard(f, color) {
  const [icon, type] = fileKind(f);
  const title = f.name.replace(/\.\w{2,5}$/, "");
  const meta = [f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "", fileSize(+f.size)].filter(Boolean).join(" · ");
  return `<article class="card res fcard" data-name="${esc(f.name.toLowerCase())}" style="--c:var(--${color})">
    <header><span class="tile">${ic(icon)}</span><span class="badge grey">${esc(type)}</span></header>
    <h3>${esc(title)}</h3><p>${esc(meta)}</p>
    <footer class="btns">${fileLinks(driveUrl(f))}</footer></article>`;
}
async function listFolder(id) {
  const q = encodeURIComponent(`'${id}' in parents and trashed=false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${encodeURIComponent(GOOGLE.apiKey)}&fields=files(id,name,mimeType,modifiedTime,size)&orderBy=folder,name&pageSize=1000`;
  return JSON.parse(await fetchText(url)).files || [];
}
const folderBlocks = (list, color) => (list || []).map(e =>
  `<section class="fblock" data-folder="${esc(e.folder)}" data-c="${color}"><h2 class="sec-title">${esc(e.label)}</h2><div class="fbody"><p class="empty">Loading files…</p></div></section>`).join("") || notConnected("Google Drive folder");
const embedBox = id => `<div class="card embed"><iframe src="https://drive.google.com/embeddedfolderview?id=${id}#list" title="Files" loading="lazy"></iframe>
  <div class="btns"><a class="btn primary" href="https://drive.google.com/drive/folders/${id}" target="_blank" rel="noopener">${ic("folder", 16)} Open in Google Drive</a><small class="muted">Click a file to view it, then use the download icon at the top.</small></div></div>`;
function hydrateFolders() {
  document.querySelectorAll("[data-folder]").forEach(el => {
    const id = gid(el.dataset.folder), body = el.querySelector(".fbody"), c = el.dataset.c;
    if (!id) return body.innerHTML = notConnected("Google Drive folder");
    if (!GOOGLE.apiKey) return body.innerHTML = embedBox(id);
    listFolder(id)
      .then(files => body.innerHTML = files.length ? `<div class="grid3">${files.map(f => fileCard(f, c)).join("")}</div>` : '<p class="empty">No files uploaded yet.</p>')
      .catch(() => body.innerHTML = embedBox(id));
  });
}
const searchBox = () => GOOGLE.apiKey ? `<label class="search">${ic("search", 18)}<input type="search" placeholder="Search files by name…" data-search aria-label="Search files"></label>` : "";

/* Read one tab of the Google Sheet as a list of rows {Header: value} */
function parseCSV(t) {
  const out = []; let row = [], f = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(f); f = ""; }
    else if (c === "\n") { row.push(f); out.push(row); row = []; f = ""; }
    else if (c !== "\r") f += c;
  }
  if (f || row.length) { row.push(f); out.push(row); }
  return out;
}
async function sheetTab(name, mustHave = []) {
  const id = gid(GOOGLE.sheet);
  if (!id) return null;
  const txt = await fetchText(`https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(name)}`);
  const rows = parseCSV(txt);
  const headers = (rows.shift() || []).map(h => h.trim());
  // A missing tab makes Google return the first tab instead, so check the headers.
  if (!mustHave.every(m => headers.some(h => h.toLowerCase().includes(m)))) return { headers: [], rows: [] };
  return { headers, rows: rows.filter(r => r.some(c => c.trim())).map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] || "").trim()]))) };
}
const col = (row, ...names) => { for (const k in row) if (names.some(n => k.toLowerCase().includes(n))) return row[k]; return ""; };
function toISO(s) {
  s = String(s || "").trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/);
  if (m) {
    let d = +m[1], mo = +m[2], y = +m[3]; if (y < 100) y += 2000;
    if (mo > 12) [d, mo] = [mo, d];
    return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }
  const t = Date.parse(s);
  return isNaN(t) ? "" : new Date(t).toISOString().slice(0, 10);
}

/* ---------- Notices (data.js + Google Sheet "Notices" tab) ---------- */
let SHEET_NOTICES = [];
const allNotices = () => [...NOTICES, ...SHEET_NOTICES];
const sortedNotices = () => allNotices().sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date));
const noticeCard = n => {
  const d = new Date(n.date + "T00:00:00");
  return `<article class="card notice ${n.pinned ? "is-pinned" : ""}">
    <div class="datebox"><b>${d.getDate()}</b><span>${d.toLocaleString("en-IN", { month: "short" })}</span></div>
    <div><h3>${esc(n.title)} ${n.pinned ? `<span class="badge amber">${ic("pinned", 12)} Pinned</span>` : ""}</h3><p>${esc(n.body)}</p>
    ${n.file ? `<div class="btns">${fileLinks(n.file)}</div>` : ""}</div></article>`;
};
async function loadSheetNotices() {
  try {
    const t = await sheetTab("Notices", ["title"]);
    if (!t) return;
    const today = new Date().toISOString().slice(0, 10);
    SHEET_NOTICES = t.rows.map(r => ({
      date: toISO(col(r, "date")) || today, title: col(r, "title"), body: col(r, "message", "body", "detail"),
      pinned: /^(y|yes|true|1)$/i.test(col(r, "pin")), file: col(r, "file", "link", "attach")
    })).filter(n => n.title);
    $("#noticeCount").textContent = allNotices().length;
    if (["", "#home", "#notices"].includes(location.hash)) render(true);
  } catch (e) { /* sheet not shared or offline: keep data.js notices */ }
}

/* ---------- Pages ---------- */
const SECTIONS = [
  ["syllabus", "book", "blue", "Syllabus", `${SYLLABUS.length} modules, outcomes and exam scheme`],
  ["notes", "notes", "green", "Notes", "Module-wise lecture notes to view or download"],
  ["questions", "help", "pink", "Important Questions", "Exam-focused questions and papers"],
  ["documents", "folder", "indigo", "Documents", "Timetable, circulars and forms"],
  ["resources", "link", "teal", "Resources", "Videos, books, links and datasets"],
  ["profile", "user", "gold", "Teacher profile", "Qualifications, experience and contact"]
];

const views = {
  home() {
    const P = ME();
    return `<section class="hero"><div class="wrap hero-in">
      <div class="hero-text">
        <span class="eyebrow">${ic("cap", 16)} ${esc(SITE.class)}</span>
        <h1>${esc(SITE.subject)}</h1>
        <p>${esc(SITE.about)}</p>
        <div class="row"><a class="btn gold" href="#notes">${ic("notes", 16)} Study notes</a><a class="btn glass" href="#syllabus">${ic("book", 16)} View syllabus</a></div>
      </div>
      <div class="card hero-teacher">
        ${switcher("dots")}
        ${avatar(P, "md")}
        <span class="label">Course teacher${PROFILES.length > 1 ? `s · ${cur + 1} of ${PROFILES.length}` : ""}</span>
        <strong>${esc(P.name)}</strong>
        <small>${esc(P.designation)}</small>
        <small class="muted">${esc(P.department)}</small>
        <a class="more" href="#profile">View profile ${ic("arrow", 16)}</a>
      </div>
    </div></section>

    <div class="wrap">
      <section class="stats">
        ${[["book", "blue", SYLLABUS.length, "Modules"], ["clock", "purple", SYLLABUS.reduce((s, u) => s + u.hours, 0), "Lecture hours"], ["bell", "orange", allNotices().length, "Notices"]]
          .map(([i, c, n, l]) => `<div class="card stat" style="--c:var(--${c})"><span class="tile">${ic(i)}</span><div><b>${n}</b><span>${l}</span></div></div>`).join("")}
      </section>

      <h2 class="sec-title">Explore the course</h2>
      <section class="grid3">
        ${SECTIONS.map(([h, i, c, t, d]) => `<a class="card feature" href="#${h}" style="--c:var(--${c})"><span class="tile">${ic(i, 22)}</span><h3>${t}</h3><p>${d}</p><span class="more">Open ${ic("arrow", 16)}</span></a>`).join("")}
      </section>

      <h2 class="sec-title">Latest notices <a href="#notices">View all</a></h2>
      <div>${sortedNotices().slice(0, 3).map(noticeCard).join("") || '<p class="empty">No notices yet.</p>'}</div>
    </div>`;
  },

  notices() {
    return pageHead("bell", "orange", "Notices", "Announcements from your teacher. Pinned notices stay on top.") +
      `<div class="wrap narrow">${sortedNotices().map(noticeCard).join("") || '<p class="empty">No notices yet.</p>'}</div>`;
  },

  syllabus() {
    const hrs = SYLLABUS.reduce((s, u) => s + u.hours, 0);
    const E = typeof EVALUATION === "object" ? EVALUATION : null;
    const books = (title, list, color) => list && list.length ? `<section class="card booklist" style="--c:var(--${color})"><h2 class="card-title">${ic("book")} ${title}</h2><ol>${list.map(b => `<li>${esc(b)}</li>`).join("")}</ol></section>` : "";
    return pageHead("book", "blue", "Syllabus", `${SYLLABUS.length} modules · ${hrs} lecture hours in total.`) +
      `<div class="wrap">
      <nav class="jump" aria-label="Syllabus sections"><a href="#syl-modules">Modules</a>${typeof OUTCOMES !== "undefined" ? '<a href="#syl-outcomes">Course outcomes</a>' : ""}<a href="#syl-books">Books</a>${E ? '<a href="#syl-eval">Evaluation</a>' : ""}</nav>
      <section class="grid2" id="syl-modules">
      ${SYLLABUS.map(u => `<article class="card unit" style="--c:var(--blue)"><header><span class="num">Module ${u.unit}</span><span class="badge blue">${ic("clock", 12)} ${u.hours} hrs</span></header><h3>${esc(u.title)}</h3><ul class="ticks">${u.topics.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        ${u.selfLearning ? `<div class="selfl">${ic("star", 16)}<div><small>Self-learning topic</small>${esc(u.selfLearning)}</div></div>` : ""}</article>`).join("")}
      </section>
      ${typeof OUTCOMES !== "undefined" && OUTCOMES.length ? `<h2 class="sec-title" id="syl-outcomes">Course outcomes</h2><p class="muted sub">Learners will be able to:</p>
      <section class="grid3">${OUTCOMES.map((o, i) => `<div class="card co" style="--c:var(--green)"><span class="num">CO${i + 1}</span><p>${esc(o)}</p></div>`).join("")}</section>` : ""}
      <h2 class="sec-title" id="syl-books">Books</h2>
      <section class="grid2">${books("Text books", typeof TEXTBOOKS !== "undefined" ? TEXTBOOKS : [], "blue")}${books("Reference books", REFERENCES, "teal")}</section>
      ${E ? `<h2 class="sec-title" id="syl-eval">Evaluation scheme</h2>
      <section class="grid2">
        <div class="card" style="--c:var(--amber)"><h2 class="card-title">${ic("chart")} Marks distribution</h2>
          <div class="split-bar"><span style="flex:${E.internal}">Internal ${E.internal}%</span><span style="flex:${E.endSem}">Semester end ${E.endSem}%</span></div>
          <ul class="info evals">${E.continuous.map(([k, v]) => `<li><div><span>${esc(k)}</span></div><b>${esc(v)}</b></li>`).join("")}</ul></div>
        <div class="card" style="--c:var(--purple)"><h2 class="card-title">${ic("clip")} Question paper format</h2><p class="muted sub">End-semester examination</p>
          <ul class="ticks" style="--c:var(--purple)">${E.paperFormat.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
      </section>` : ""}
      </div>`;
  },

  notes() {
    return pageHead("notes", "green", "Notes", "Lecture notes for every module. View online or download.") +
      `<div class="wrap">${searchBox()}${folderBlocks(GOOGLE.notes, "green")}</div>`;
  },

  questions() {
    return pageHead("help", "pink", "Important Questions", "Module-wise important and repeated exam questions, plus papers to view or download.") +
      `<div class="wrap"><div id="impList"><p class="empty">Loading questions…</p></div>${searchBox()}${folderBlocks(GOOGLE.questions, "pink")}</div>`;
  },


  documents() {
    return pageHead("folder", "indigo", "Documents", "Timetable, circulars, forms and other important documents.") +
      `<div class="wrap">${searchBox()}${folderBlocks(GOOGLE.documents, "indigo")}</div>`;
  },


  resources() {
    const types = ["all", ...new Set(RESOURCES.map(r => r.type))];
    return pageHead("link", "teal", "Resources", "Videos, books, links and datasets for self-study.") +
      `<div class="wrap"><div class="filters" role="group" aria-label="Filter by type">${types.map(t => `<button aria-pressed="${t === "all"}" data-f="${t}">${t === "all" ? "All" : ic(TYPE_ICON[t] || "file", 15) + " " + t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div>
      <section class="grid3" id="resGrid"></section></div>`;
  },

  profile() {
    const P = ME();
    const row = (i, k, v) => v ? `<li><span class="tile sm">${ic(i, 16)}</span><div><small>${k}</small><span>${v}</span></div></li>` : "";
    const chips = a => (a || []).filter(Boolean).map(x => `<span class="chip">${esc(x)}</span>`).join("");
    const links = (P.links || []).filter(l => l.url).map(l => `<a class="btn ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${ic("link", 16)} ${esc(l.label)}</a>`).join("");
    return `<section class="cover"><div class="wrap">${switcher("tabs")}</div></section>
    <div class="wrap">
      <section class="card profile-head">
        <div class="photo-wrap">${avatar(P, "xl")}<span class="cam" title="Add your photo in data.js (photo: files/photo.jpg)">${ic("camera", 16)}</span></div>
        <div class="who">
          <h1>${esc(P.name)}</h1>
          <p class="role">${esc(P.designation)}</p>
          <p class="muted">${[P.department, P.college].filter(Boolean).map(esc).join(" · ")}</p>
          <div class="row">${P.email ? `<a class="btn primary" href="mailto:${esc(P.email)}">${ic("mail", 16)} Email</a>` : ""}${links}</div>
        </div>
        ${(() => { const m = (P.experience || "").match(/^\s*(\d+(?:\.\d+)?\+?)\s*([a-z]+)/i);
          return m ? `<div class="exp"><b>${esc(m[1])}</b><span>${esc(m[2].toLowerCase())}<br>experience</span></div>` : ""; })()}
      </section>
      <div class="pgrid">
        ${P.bio ? `<section class="card"><h2 class="card-title">${ic("user")} About</h2><p class="bio">${esc(P.bio)}</p></section>` : ""}
        ${P.expertise?.length ? `<section class="card"><h2 class="card-title">${ic("star")} Areas of expertise</h2><div class="chips">${chips(P.expertise)}</div></section>` : ""}
        ${P.subjects?.length ? `<section class="card"><h2 class="card-title">${ic("book")} Subjects taught</h2><div class="chips">${chips(P.subjects)}</div></section>` : ""}
        ${P.qualifications?.length ? `<section class="card"><h2 class="card-title">${ic("cap")} Qualifications</h2><ul class="timeline">${P.qualifications.map(q => `<li>${esc(q)}</li>`).join("")}</ul></section>` : ""}
        <section class="card"><h2 class="card-title">${ic("brief")} Professional details</h2><ul class="info">
          ${row("brief", "Designation", esc(P.designation))}${row("cap", "Department", esc(P.department))}${row("home", "Institution", esc(P.college))}${row("clock", "Experience", esc(P.experience))}
        </ul></section>
        <section class="card"><h2 class="card-title">${ic("mail")} Contact</h2><ul class="info">
          ${row("mail", "Email", P.email ? `<a href="mailto:${esc(P.email)}">${esc(P.email)}</a>` : "")}${row("phone", "Phone", esc(P.phone))}${row("pin", "Cabin", esc(P.cabin))}${row("cal", "Office hours", esc(P.officeHours))}
        </ul></section>
      </div>
    </div>`;
  }
};

const TITLES = { questions: "Important Questions" };

/* ---------- Page helpers that load data after the page shows ---------- */
function drawResources(f) {
  const list = RESOURCES.filter(r => f === "all" || r.type === f);
  $("#resGrid").innerHTML = list.map(r => `<article class="card res" style="--c:var(--teal)">
    <header><span class="tile">${ic(TYPE_ICON[r.type] || "file")}</span><span class="badge grey">${esc(r.type)}</span></header>
    <h3>${esc(r.title)}</h3><p>${esc(r.note)}</p>
    <footer class="btns">${!r.url ? '<span class="btn off">Available in library</span>' : r.url.startsWith("http") && !/(drive|docs)\.google\.com/.test(r.url) ? dlBtn(r.url, "Open") : fileLinks(r.url)}</footer></article>`).join("") || '<p class="empty">Nothing here yet.</p>';
}

async function hydrateQuestions() {
  const box = $("#impList");
  if (!gid(GOOGLE.sheet)) { box.innerHTML = ""; return; }
  try {
    const t = await sheetTab("ImpQuestions", ["question"]);
    if (!t.rows.length) { box.innerHTML = ""; return; }
    const groups = {};
    t.rows.forEach(r => { const q = col(r, "question"); if (q) (groups[col(r, "module", "unit") || "General"] ||= []).push(r); });
    const tagClass = s => /very|must|imp/i.test(s) ? "red" : /repeat/i.test(s) ? "amber" : "blue";
    if (!$("#impList")) return;
    $("#impList").innerHTML = `<section class="grid2 qgrid">${Object.entries(groups).map(([u, rows]) => `
      <article class="card unit" style="--c:var(--pink)"><header><span class="num">${/^\d+$/.test(u) ? "Module " + esc(u) : esc(u)}</span><span class="badge grey">${rows.length} question${rows.length > 1 ? "s" : ""}</span></header>
      <ol class="qlist">${rows.map(r => { const tag = col(r, "tag", "type"), mk = col(r, "mark");
        return `<li><span>${esc(col(r, "question"))}</span><span class="qmeta">${mk ? `<span class="badge blue">${esc(mk)} marks</span>` : ""}${tag ? `<span class="badge ${tagClass(tag)}">${esc(tag)}</span>` : ""}</span></li>`; }).join("")}</ol></article>`).join("")}</section>`;
  } catch (e) { if ($("#impList")) $("#impList").innerHTML = ""; }
}

/* ---------- Router ---------- */
function render(keepScroll) {
  const key = (location.hash || "#home").slice(1);
  const name = views[key] ? key : "home";
  $("#main").innerHTML = views[name]();
  document.querySelectorAll("#nav a").forEach(a => {
    const on = a.getAttribute("href") === "#" + name;
    a.classList.toggle("on", on);
    on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
  });
  document.querySelectorAll(".dd").forEach(d => { d.classList.remove("open"); d.querySelector(".dd-btn").classList.toggle("on", !!d.querySelector("a.on")); });
  document.title = (name === "home" ? "" : (TITLES[name] || name[0].toUpperCase() + name.slice(1)) + " | ") + SITE.subject;

  if (name === "resources") {
    drawResources("all");
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => {
      document.querySelectorAll("[data-f]").forEach(x => x.setAttribute("aria-pressed", x === b));
      drawResources(b.dataset.f);
    });
  }
  hydrateFolders();
  if (name === "questions") hydrateQuestions();
  const s = $("[data-search]");
  if (s) s.oninput = () => { const q = s.value.trim().toLowerCase(); document.querySelectorAll(".fcard").forEach(c => c.hidden = !!q && !c.dataset.name.includes(q)); };

  document.querySelectorAll("[data-p]").forEach(b => b.onclick = () => {
    cur = +b.dataset.p; store.set("bdaProfile", cur); render(true);
  });
  drawChrome();
  setMenu(false);
  if (!keepScroll) window.scrollTo(0, 0);
}

/* ---------- Header + footer ---------- */
const menuBtn = $("#menuBtn");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = ic(open ? "close" : "menu", 24);
}
menuBtn.onclick = () => setMenu(!document.body.classList.contains("menu-open"));
document.querySelectorAll(".dd").forEach(d => {
  const b = d.querySelector(".dd-btn");
  b.insertAdjacentHTML("beforeend", ic("chev", 16));
  b.onclick = e => { e.stopPropagation(); const o = d.classList.toggle("open"); b.setAttribute("aria-expanded", o); };
});
document.addEventListener("click", e => document.querySelectorAll(".dd.open").forEach(d => { if (!d.contains(e.target)) { d.classList.remove("open"); d.querySelector(".dd-btn").setAttribute("aria-expanded", false); } }));

$("#brandCode").textContent = SITE.code;
$("#brandSubject").textContent = SITE.subject;
$("#noticeCount").textContent = allNotices().length;
function drawChrome() {
  const P = ME();
  $("#navProfile").innerHTML = `${avatar(P, "xs")} Profile`;
  $("#footer").innerHTML = `
  <div><a class="brand" href="#home"><span class="logo">${$(".logo").innerHTML}</span><span><strong>${esc(SITE.code)}</strong><small>${esc(SITE.subject)}</small></span></a>
    <p class="fnote">${esc(SITE.about)}</p></div>
  <div><h4>Study</h4><a href="#syllabus">Syllabus</a><a href="#notes">Notes</a><a href="#questions">Important Questions</a><a href="#resources">Resources</a></div>
  <div><h4>Updates</h4><a href="#notices">Notices</a><a href="#documents">Documents</a><a href="#profile">Teacher profiles</a></div>
  <div><h4>Contact</h4>
    ${PROFILES.map((t, i) => `<div class="fteacher-box">
      <a class="fteacher" href="#profile" data-p="${i}">${avatar(t, "sm")}<span><strong>${esc(t.name)}</strong><small>${esc(t.designation)}</small></span></a>
      ${t.email ? `<a href="mailto:${esc(t.email)}">${ic("mail", 16)} ${esc(t.email)}</a>` : ""}
    </div>`).join("")}
  </div>`;
  $("#footBottom").innerHTML = `<span>© ${new Date().getFullYear()} ${esc(P.college || SITE.subject)}</span><span>${esc(SITE.class)}</span>`;
  document.querySelectorAll("#footer [data-p]").forEach(a => a.addEventListener("click", () => {
    cur = +a.dataset.p; store.set("bdaProfile", cur);
    if (location.hash === "#profile") render();
  }));
}

window.addEventListener("hashchange", () => render());
render();
loadSheetNotices();
