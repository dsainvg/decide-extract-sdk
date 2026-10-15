
(function () {
  var root = document.documentElement;

  var stored = localStorage.getItem("theme");
  if (!stored) {
    stored = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", stored);

  var toggle = document.getElementById("theme-toggle");
  function paint() {
    toggle.textContent = root.getAttribute("data-theme") === "dark" ? "\u2600" : "\u263C";
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
