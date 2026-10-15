/*
 * Static assets for the generated docs site: stylesheet, client script, highlight
 * theme. Kept as strings so the site build has no asset pipeline and no external
 * requests.
 */

export const siteCss = `
/* ------------------------------------------------------------------ tokens */

:root {
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
    "Liberation Mono", monospace;

  --bg: #ffffff;
  --bg-subtle: #f6f7f9;
  --bg-raised: #ffffff;
  --bg-code: #f5f6f8;

  --fg: #14161a;
  --fg-muted: #5a6273;
  --fg-faint: #858c99;

  --border: #e2e5ea;
  --border-strong: #cfd4dc;

  --accent: #1f5fd8;
  --accent-hover: #1a4fb4;
  --accent-bg: #e9f0fe;

  --note: #1f5fd8;
  --tip: #15803d;
  --warn: #b45309;
  --danger: #c02626;

  --radius-sm: 6px;
  --radius: 10px;
  --radius-lg: 14px;

  --sidebar-w: 272px;
  --toc-w: 232px;
  --header-h: 60px;
  --content-max: 820px;

  --shadow-sm: 0 1px 2px rgba(16, 20, 28, 0.06);
  --shadow-md: 0 8px 28px rgba(16, 20, 28, 0.1);
}

html[data-theme="dark"] {
  --bg: #0e1015;
  --bg-subtle: #14171e;
  --bg-raised: #161a22;
  --bg-code: #171b24;

  --fg: #e7eaf0;
  --fg-muted: #9aa3b4;
  --fg-faint: #6f7789;

  --border: #242a35;
  --border-strong: #333b4a;

  --accent: #7aa7ff;
  --accent-hover: #9cbcff;
  --accent-bg: #16233b;

  --note: #7aa7ff;
  --tip: #4ade80;
  --warn: #fbbf24;
  --danger: #f87171;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 10px 34px rgba(0, 0, 0, 0.5);
}

/* ------------------------------------------------------------------- base */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-h) + 16px);
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: var(--accent);
  text-decoration: none;
}
a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

img {
  max-width: 100%;
  height: auto;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ----------------------------------------------------------------- header */

header.site {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 650;
  font-size: 15px;
  letter-spacing: -0.01em;
  color: var(--fg);
  white-space: nowrap;
}
.brand:hover {
  text-decoration: none;
  color: var(--fg);
}
.brand .dot {
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: linear-gradient(135deg, #1f5fd8, #7c3aed);
  box-shadow: var(--shadow-sm);
}
.brand .version {
  font-size: 12px;
  font-weight: 500;
  color: var(--fg-faint);
  padding: 2px 7px;
  border: 1px solid var(--border);
  border-radius: 999px;
}

.version-picker {
  flex: 0 0 auto;
  font: inherit;
  font-size: 13px;
  color: var(--fg);
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
}
.version-picker:hover {
  border-color: var(--fg-faint);
}
.icon-button {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-subtle);
  color: var(--fg-muted);
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: border-color 0.12s ease, color 0.12s ease;
}
.icon-button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.nav-toggle {
  display: none;
}

/* ----------------------------------------------------------------- search */

.search {
  margin-left: auto;
  position: relative;
  width: min(340px, 42vw);
}
.search input {
  width: 100%;
  padding: 7px 40px 7px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-subtle);
  color: var(--fg);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color 0.12s ease, background 0.12s ease;
}
.search input::placeholder {
  color: var(--fg-faint);
}
.search input:focus {
  border-color: var(--accent);
  background: var(--bg-raised);
}
.search kbd {
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-faint);
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
  pointer-events: none;
}
.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  display: none;
  z-index: 40;
}
.search-results.open {
  display: block;
}
.search-results a {
  display: block;
  padding: 9px 12px;
  color: var(--fg);
  font-size: 14px;
  border-bottom: 1px solid var(--border);
}
.search-results a:last-child {
  border-bottom: 0;
}
.search-results a:hover,
.search-results a.active {
  background: var(--accent-bg);
  text-decoration: none;
}
.search-results span {
  display: block;
  color: var(--fg-muted);
  font-size: 12px;
  margin-top: 1px;
}

/* ----------------------------------------------------------------- layout */

.layout {
  display: grid;
  grid-template-columns: var(--sidebar-w) minmax(0, 1fr) var(--toc-w);
  gap: 40px;
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------------------------------------------------------------- sidebar */

nav.sidebar {
  position: sticky;
  top: var(--header-h);
  align-self: start;
  max-height: calc(100vh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 28px 10px 48px 0;
  border-right: 1px solid var(--border);
  font-size: 14px;
}
nav.sidebar .section {
  margin-bottom: 22px;
}
nav.sidebar .section-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-faint);
  font-weight: 650;
  margin: 0 0 8px 10px;
}
nav.sidebar a {
  display: block;
  padding: 5px 10px;
  margin-bottom: 1px;
  border-radius: var(--radius-sm);
  color: var(--fg-muted);
  font-weight: 450;
  transition: background 0.1s ease, color 0.1s ease;
}
nav.sidebar a:hover {
  background: var(--bg-subtle);
  color: var(--fg);
  text-decoration: none;
}
nav.sidebar a.active {
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 600;
}

/* ----------------------------------------------------------------- content */

main.content {
  padding: 34px 0 80px;
  min-width: 0;
  max-width: var(--content-max);
}

main.content h1 {
  font-size: clamp(28px, 4vw, 36px);
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 700;
  margin: 0 0 12px;
}

main.content .lede {
  font-size: 18px;
  line-height: 1.6;
  color: var(--fg-muted);
  margin: 0 0 28px;
}

main.content h2 {
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.015em;
  font-weight: 660;
  margin: 48px 0 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
main.content h2:first-of-type {
  border-top: 0;
  padding-top: 0;
}

main.content h3 {
  font-size: 18px;
  line-height: 1.35;
  font-weight: 640;
  margin: 30px 0 8px;
}

main.content h4 {
  font-size: 15px;
  font-weight: 640;
  margin: 22px 0 6px;
  color: var(--fg-muted);
}

main.content p {
  margin: 14px 0;
}

main.content ul,
main.content ol {
  margin: 14px 0;
  padding-left: 24px;
}
main.content li {
  margin: 5px 0;
}
main.content li::marker {
  color: var(--fg-faint);
}

main.content hr {
  border: 0;
  border-top: 1px solid var(--border);
  margin: 36px 0;
}

main.content strong {
  font-weight: 640;
}

.anchor {
  margin-left: 8px;
  color: var(--border-strong);
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.12s ease;
}
h2:hover .anchor,
h3:hover .anchor,
.anchor:focus-visible {
  opacity: 1;
}

/* ------------------------------------------------------------------- code */

code {
  font-family: var(--font-mono);
  font-size: 0.86em;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.12em 0.36em;
  word-break: break-word;
}

pre {
  position: relative;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  margin: 18px 0;
  overflow-x: auto;
  line-height: 1.6;
}
pre code {
  background: none;
  border: 0;
  padding: 0;
  font-size: 13px;
  border-radius: 0;
  word-break: normal;
}

pre .lang {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--fg-faint);
  background: color-mix(in srgb, var(--bg-subtle) 70%, transparent);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  border-radius: var(--radius) 0 var(--radius) 0;
  pointer-events: none;
}

pre .copy {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 9px;
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--fg-muted);
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease, color 0.12s ease;
}
pre:hover .copy,
pre:focus-within .copy {
  opacity: 1;
}
pre .copy:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* ----------------------------------------------------------------- tables */

table {
  display: block;
  width: 100%;
  margin: 18px 0;
  overflow-x: auto;
  border-collapse: collapse;
  font-size: 14.5px;
}
th,
td {
  border: 1px solid var(--border);
  padding: 9px 13px;
  text-align: left;
  vertical-align: top;
}
th {
  background: var(--bg-subtle);
  font-weight: 640;
  white-space: nowrap;
}
tbody tr:nth-child(even) td {
  background: color-mix(in srgb, var(--bg-subtle) 45%, transparent);
}

/* --------------------------------------------------------------- callouts */

.callout {
  border: 1px solid var(--border);
  border-left: 3px solid var(--note);
  background: var(--bg-subtle);
  border-radius: var(--radius);
  padding: 14px 18px;
  margin: 20px 0;
}
.callout > *:first-child {
  margin-top: 0;
}
.callout > *:last-child {
  margin-bottom: 0;
}
.callout-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--note);
  margin-bottom: 4px;
}
.callout-tip {
  border-left-color: var(--tip);
}
.callout-tip .callout-title {
  color: var(--tip);
}
.callout-warning {
  border-left-color: var(--warn);
}
.callout-warning .callout-title {
  color: var(--warn);
}
.callout-danger {
  border-left-color: var(--danger);
}
.callout-danger .callout-title {
  color: var(--danger);
}

/* ------------------------------------------------------------------ cards */

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin: 26px 0;
}
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  background: var(--bg-subtle);
}
.card h3 {
  margin: 0 0 6px;
  font-size: 15px;
}
.card p {
  margin: 0;
  color: var(--fg-muted);
  font-size: 14px;
}

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 2px 9px;
  background: var(--accent-bg);
  color: var(--accent);
  vertical-align: middle;
}

/* -------------------------------------------------------------------- toc */

aside.toc {
  position: sticky;
  top: var(--header-h);
  align-self: start;
  max-height: calc(100vh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 34px 0 48px 4px;
  font-size: 13.5px;
  border-left: 1px solid var(--border);
  padding-left: 20px;
}
aside.toc .toc-title {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--fg-faint);
  font-weight: 650;
  margin-bottom: 10px;
}
aside.toc a {
  display: block;
  padding: 3px 0;
  color: var(--fg-muted);
  line-height: 1.45;
}
aside.toc a:hover {
  color: var(--accent);
  text-decoration: none;
}
aside.toc a.depth-3 {
  padding-left: 14px;
  font-size: 13px;
}

/* ----------------------------------------------------------------- pager */

.pager {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.pager a {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 11px 16px;
  color: var(--fg);
  font-size: 14px;
  font-weight: 550;
  min-width: 150px;
  transition: border-color 0.12s ease, background 0.12s ease;
}
.pager a:hover {
  border-color: var(--accent);
  background: var(--bg-subtle);
  text-decoration: none;
}
.pager .next {
  text-align: right;
  margin-left: auto;
}
.pager small {
  display: block;
  color: var(--fg-faint);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  margin-bottom: 2px;
}

/* ----------------------------------------------------------------- footer */

footer.site {
  border-top: 1px solid var(--border);
  margin-top: 40px;
  padding: 22px 24px 48px;
  color: var(--fg-muted);
  font-size: 13.5px;
}
footer.site .inner {
  max-width: 1460px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
footer.site .spacer {
  margin-left: auto;
}

/* ------------------------------------------------------------ responsive */

@media (max-width: 1180px) {
  .layout {
    grid-template-columns: var(--sidebar-w) minmax(0, 1fr);
  }
  aside.toc {
    display: none;
  }
}

@media (max-width: 820px) {
  :root {
    --header-h: 56px;
  }
  .layout {
    grid-template-columns: minmax(0, 1fr);
    padding: 0 18px;
  }
  .nav-toggle {
    display: inline-flex;
  }
  nav.sidebar {
    display: none;
    position: fixed;
    inset: var(--header-h) auto 0 0;
    width: min(300px, 84vw);
    background: var(--bg-raised);
    border-right: 1px solid var(--border);
    z-index: 25;
    padding: 22px 14px 40px;
    box-shadow: var(--shadow-md);
  }
  nav.sidebar.open {
    display: block;
  }
  .search {
    width: min(190px, 40vw);
  }
  .search kbd {
    display: none;
  }
  main.content {
    padding-top: 24px;
  }
  main.content h1 {
    font-size: 27px;
  }
  .pager {
    flex-direction: column;
  }
  .pager a {
    min-width: 0;
  }
}

@media print {
  header.site,
  nav.sidebar,
  aside.toc,
  .pager,
  footer.site,
  pre .copy {
    display: none !important;
  }
  .layout {
    display: block;
    padding: 0;
  }
  pre {
    white-space: pre-wrap;
  }
}
`;

export const siteJs = `
(function () {
  var root = document.documentElement;

  var stored = localStorage.getItem("theme");
  if (!stored) {
    stored = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", stored);

  var toggle = document.getElementById("theme-toggle");
  function paint() {
    toggle.textContent = root.getAttribute("data-theme") === "dark" ? "\\u2600" : "\\u263C";
  }
  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    paint();
  });
  paint();

  var navToggle = document.querySelector(".nav-toggle");
  var sidebar = document.querySelector("nav.sidebar");
  if (navToggle && sidebar) {
    navToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
    sidebar.addEventListener("click", function (event) {
      if (event.target.tagName === "A") sidebar.classList.remove("open");
    });
  }

  // Version switcher. versions.json is written into the site root and into
  // every version folder, so a nested page finds it with the same basePath its
  // own links use. Absent on a locally served build, so it just does not show.
  var picker = document.getElementById("version-picker");
  if (picker) {
    var here = document.body.getAttribute("data-version");
    fetch((window.basePath || "") + "versions.json")
      .then(function (response) { return response.ok ? response.json() : []; })
      .then(function (versions) {
        if (!versions.length) { picker.remove(); return; }
        versions.forEach(function (entry) {
          var option = document.createElement("option");
          option.value = entry.path;
          option.textContent = entry.label || entry.version;
          if (entry.version === here) option.selected = true;
          picker.appendChild(option);
        });
        picker.addEventListener("change", function () {
          if (picker.value) window.location.href = picker.value;
        });
      })
      .catch(function () { picker.remove(); });
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    var button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = "copy";
    button.addEventListener("click", function () {
      var code = pre.querySelector("code");
      navigator.clipboard.writeText(code.innerText).then(function () {
        button.textContent = "copied";
        setTimeout(function () { button.textContent = "copy"; }, 1400);
      });
    });
    pre.appendChild(button);
  });

  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var index = [];
  var timer = null;

  if (input && results) {
    fetch(basePath + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; })
      .catch(function () {});

    function score(entry, query) {
      var title = entry.title.toLowerCase();
      var description = (entry.description || "").toLowerCase();
      var headings = (entry.headings || []).join(" ").toLowerCase();
      var text = (entry.text || "").toLowerCase();

      if (title.indexOf(query) === 0) return 100;
      if (title.indexOf(query) !== -1) return 60;
      if (headings.indexOf(query) !== -1) return 30;
      if (description.indexOf(query) !== -1) return 20;
      if (text.indexOf(query) !== -1) return 10;
      return 0;
    }

    function render(matches, query) {
      if (!matches.length) {
        results.innerHTML = '<a href="#" class="empty">No matches for "' + query + '"</a>';
        results.classList.add("open");
        return;
      }
      results.innerHTML = matches.slice(0, 10).map(function (entry) {
        return '<a href="' + entry.url + '">' + entry.title +
          "<span>" + (entry.description || entry.section || "") + "</span></a>";
      }).join("");
      results.classList.add("open");
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var query = input.value.trim().toLowerCase();
        if (query.length < 2) {
          results.classList.remove("open");
          return;
        }
        render(index.map(function (entry) {
          return Object.assign({}, entry, { _s: score(entry, query) });
        }).filter(function (entry) {
          return entry._s > 0;
        }).sort(function (a, b) {
          return b._s - a._s;
        }), query);
      }, 120);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        results.classList.remove("open");
        input.blur();
      }
      if (event.key === "Enter") {
        var first = results.querySelector("a");
        if (results.classList.contains("open") && first) window.location.href = first.href;
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".search")) results.classList.remove("open");
    });

    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  var current = document.body.getAttribute("data-path");
  document.querySelectorAll("nav.sidebar a").forEach(function (link) {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  var headings = [].slice.call(document.querySelectorAll("main.content h2[id], main.content h3[id]"));
  if (headings.length && "IntersectionObserver" in window) {
    var links = {};
    document.querySelectorAll("aside.toc a").forEach(function (link) {
      links[link.getAttribute("href").slice(1)] = link;
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(links).forEach(function (key) { links[key].style.color = ""; });
          link.style.color = "var(--accent)";
        }
      });
    }, { rootMargin: "-72px 0px -70% 0px" });
    headings.forEach(function (heading) { observer.observe(heading); });
  }
})();
`;

export const highlightCss = `
.hljs-comment,
.hljs-quote {
  color: #6b7280;
  font-style: italic;
}
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-type {
  color: #a21caf;
}
.hljs-string,
.hljs-doctag,
.hljs-regexp {
  color: #047857;
}
.hljs-title,
.hljs-section,
.hljs-title.function_ {
  color: #1d4ed8;
}
.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
  color: #b45309;
}
.hljs-number,
.hljs-symbol,
.hljs-bullet {
  color: #b91c1c;
}
.hljs-variable,
.hljs-template-variable,
.hljs-attr,
.hljs-attribute {
  color: #0f766e;
}
.hljs-built_in,
.hljs-builtin-name,
.hljs-meta {
  color: #6d28d9;
}
.hljs-deletion {
  background: #fee2e2;
}
.hljs-addition {
  background: #dcfce7;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-strong {
  font-weight: 700;
}
`;