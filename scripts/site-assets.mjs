/*
 * Static assets for the generated docs site: stylesheet, client script, highlight theme.
 * Kept as strings so the site build has no asset pipeline and no external requests.
 */

export const siteCss = `
:root {
  --bg: #ffffff;
  --bg-soft: #f7f8fa;
  --bg-code: #f4f5f7;
  --text: #16181d;
  --text-soft: #5b6270;
  --border: #e3e6ea;
  --accent: #1f6feb;
  --accent-soft: #e8f0fe;
  --sidebar-width: 270px;
  --toc-width: 230px;
  --header-height: 60px;
  --radius: 10px;
  --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
}

html[data-theme="dark"] {
  --bg: #0f1116;
  --bg-soft: #151821;
  --bg-code: #171b24;
  --text: #e6e9ef;
  --text-soft: #9aa3b2;
  --border: #262b36;
  --accent: #6ea8fe;
  --accent-soft: #16233a;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

code {
  font-family: var(--mono);
  font-size: 0.875em;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 0.12em 0.38em;
}

pre {
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  overflow-x: auto;
  position: relative;
  margin: 18px 0;
}
pre code {
  background: none;
  border: 0;
  padding: 0;
  font-size: 13px;
  line-height: 1.6;
}

header.site {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 650;
  color: var(--text);
  letter-spacing: -0.01em;
}
.brand .dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, #1f6feb, #7c3aed);
}

.search {
  margin-left: auto;
  position: relative;
  width: min(320px, 40vw);
}
.search input {
  width: 100%;
  padding: 7px 34px 7px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  font-size: 14px;
  outline: none;
}
.search input:focus { border-color: var(--accent); }
.search kbd {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--text-soft);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 1px 5px;
}
.search-results {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
  display: none;
}
.search-results.open { display: block; }
.search-results a {
  display: block;
  padding: 8px 12px;
  color: var(--text);
  font-size: 14px;
  border-bottom: 1px solid var(--border);
}
.search-results a:last-child { border-bottom: 0; }
.search-results a:hover,
.search-results a.active { background: var(--accent-soft); }
.search-results span { color: var(--text-soft); font-size: 12px; display: block; }

.icon-button {
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  border-radius: 8px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.icon-button:hover { border-color: var(--accent); }

.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr) var(--toc-width);
  gap: 36px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

nav.sidebar {
  position: sticky;
  top: var(--header-height);
  align-self: start;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  padding: 26px 8px 40px 0;
  border-right: 1px solid var(--border);
}
nav.sidebar .section {
  margin-bottom: 20px;
}
nav.sidebar .section > .section-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-soft);
  font-weight: 650;
  margin: 0 0 8px 10px;
}
nav.sidebar a {
  display: block;
  padding: 5px 10px;
  border-radius: 7px;
  color: var(--text-soft);
  font-size: 14px;
}
nav.sidebar a:hover { background: var(--bg-soft); color: var(--text); text-decoration: none; }
nav.sidebar a.active { background: var(--accent-soft); color: var(--accent); font-weight: 600; }

main.content { padding: 30px 0 72px; min-width: 0; }
main.content h1 {
  font-size: 34px;
  letter-spacing: -0.02em;
  margin: 6px 0 10px;
  line-height: 1.2;
}
main.content .lede { font-size: 18px; color: var(--text-soft); margin: 0 0 26px; }
main.content h2 {
  font-size: 24px;
  margin: 40px 0 12px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
  letter-spacing: -0.01em;
}
main.content h3 { font-size: 18px; margin: 28px 0 8px; }
main.content p, main.content li { color: var(--text); }
main.content ul, main.content ol { padding-left: 22px; }
main.content li { margin: 4px 0; }

.anchor {
  margin-left: 8px;
  color: var(--border);
  font-weight: 400;
  opacity: 0;
  transition: opacity 0.12s ease;
}
h2:hover .anchor, h3:hover .anchor, .anchor:focus { opacity: 1; }

.callout {
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  background: var(--bg-soft);
  border-radius: var(--radius);
  padding: 12px 16px;
  margin: 18px 0;
}
.callout p { margin: 4px 0; }
.callout .callout-title {
  font-weight: 650;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--accent);
}
.callout-warning { border-left-color: #d97706; }
.callout-warning .callout-title { color: #d97706; }
.callout-danger { border-left-color: #dc2626; }
.callout-danger .callout-title { color: #dc2626; }
.callout-tip { border-left-color: #16a34a; }
.callout-tip .callout-title { color: #16a34a; }

table {
  border-collapse: collapse;
  width: 100%;
  margin: 18px 0;
  font-size: 14.5px;
  display: block;
  overflow-x: auto;
}
th, td {
  border: 1px solid var(--border);
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
th { background: var(--bg-soft); font-weight: 650; }
tr:nth-child(even) td { background: color-mix(in srgb, var(--bg-soft) 45%, transparent); }

pre .copy {
  position: absolute;
  top: 8px;
  right: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-soft);
  border-radius: 6px;
  font-size: 11px;
  padding: 3px 8px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
}
pre:hover .copy { opacity: 1; }
pre .lang {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 11px;
  color: var(--text-soft);
  font-family: var(--mono);
}

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; margin: 24px 0; }
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  background: var(--bg-soft);
}
.card h3 { margin: 0 0 6px; font-size: 16px; }
.card p { margin: 0; color: var(--text-soft); font-size: 14px; }

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 2px 8px;
  background: var(--accent-soft);
  color: var(--accent);
  vertical-align: middle;
}

.pager { display: flex; justify-content: space-between; gap: 12px; margin-top: 52px; }
.pager a {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 14px;
  color: var(--text);
  font-size: 14px;
  min-width: 140px;
}
.pager a:hover { border-color: var(--accent); text-decoration: none; }
.pager .next { text-align: right; margin-left: auto; }
.pager small { display: block; color: var(--text-soft); font-size: 12px; }

aside.toc {
  position: sticky;
  top: var(--header-height);
  align-self: start;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  padding: 30px 0 40px 4px;
  font-size: 13.5px;
}
aside.toc .toc-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-soft);
  font-weight: 650;
  margin-bottom: 8px;
}
aside.toc a { display: block; color: var(--text-soft); padding: 3px 0; }
aside.toc a:hover { color: var(--accent); text-decoration: none; }
aside.toc a.depth-3 { padding-left: 14px; }

footer.site {
  border-top: 1px solid var(--border);
  padding: 22px 24px 44px;
  color: var(--text-soft);
  font-size: 13.5px;
}
footer.site .inner { max-width: 1400px; margin: 0 auto; display: flex; gap: 18px; flex-wrap: wrap; }

.nav-toggle { display: none; }

@media (max-width: 1100px) {
  .layout { grid-template-columns: var(--sidebar-width) minmax(0, 1fr); }
  aside.toc { display: none; }
}

@media (max-width: 780px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
  .nav-toggle { display: inline-flex; }
  nav.sidebar {
    display: none;
    position: fixed;
    inset: var(--header-height) auto 0 0;
    width: 280px;
    background: var(--bg);
    border-right: 1px solid var(--border);
    z-index: 15;
    padding: 20px;
  }
  nav.sidebar.open { display: block; }
  .search { width: 40vw; }
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

  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    document.getElementById("theme-toggle").textContent = next === "dark" ? "\\u2600" : "\\u263D";
  }
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("theme-toggle").textContent =
    stored === "dark" ? "\\u2600" : "\\u263D";

  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.querySelector("nav.sidebar").classList.toggle("open");
    });
  }

  document.querySelectorAll("pre").forEach(function (pre) {
    var button = document.createElement("button");
    button.className = "copy";
    button.textContent = "copy";
    button.addEventListener("click", function () {
      var code = pre.querySelector("code");
      navigator.clipboard.writeText(code.innerText).then(function () {
        button.textContent = "copied";
        setTimeout(function () { button.textContent = "copy"; }, 1200);
      });
    });
    pre.appendChild(button);
  });

  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var index = [];
  var timer = null;

  if (input) {
    fetch(basePath + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; })
      .catch(function () {});

    function score(entry, query) {
      var text = (entry.title + " " + entry.description + " " + entry.text + " " + entry.headings.join(" ")).toLowerCase();
      if (!text.includes(query)) return 0;
      var value = 1;
      if (entry.title.toLowerCase().includes(query)) value += 10;
      if (entry.description.toLowerCase().includes(query)) value += 4;
      return value;
    }

    function render(matches) {
      if (!matches.length) { results.classList.remove("open"); return; }
      results.innerHTML = matches.slice(0, 8).map(function (m) {
        return '<a href="' + m.url + '">' + m.title + "<span>" + (m.description || m.section) + "</span></a>";
      }).join("");
      results.classList.add("open");
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var query = input.value.trim().toLowerCase();
        if (query.length < 2) { results.classList.remove("open"); return; }
        render(index.map(function (e) { return Object.assign({}, e, { _s: score(e, query) }); })
          .filter(function (e) { return e._s > 0; })
          .sort(function (a, b) { return b._s - a._s; }));
      }, 120);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { results.classList.remove("open"); input.blur(); }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".search")) results.classList.remove("open");
    });

    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        input.focus();
      }
    });
  }

  var current = document.body.getAttribute("data-path");
  document.querySelectorAll("nav.sidebar a").forEach(function (link) {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });
})();
`;

export const highlightCss = `
.hljs-comment, .hljs-quote { color: #6b7280; font-style: italic; }
.hljs-keyword, .hljs-selector-tag, .hljs-literal, .hljs-type { color: #a21caf; }
.hljs-string, .hljs-doctag, .hljs-regexp { color: #047857; }
.hljs-title, .hljs-section, .hljs-title.function_ { color: #1d4ed8; }
.hljs-name, .hljs-selector-id, .hljs-selector-class { color: #b45309; }
.hljs-number, .hljs-symbol, .hljs-bullet { color: #b91c1c; }
.hljs-variable, .hljs-template-variable, .hljs-attr, .hljs-attribute { color: #0f766e; }
.hljs-built_in, .hljs-builtin-name, .hljs-meta { color: #6d28d9; }
.hljs-deletion { background: #fee2e2; }
.hljs-addition { background: #dcfce7; }
.hljs-emphasis { font-style: italic; }
.hljs-strong { font-weight: 700; }
`;