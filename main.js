const projects = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Cards-based hub for all my projects.",
    link: "https://github.com/Thirumadeshwaran/Dashboard",
    thumbnail: "",
    tags: ["Web", "HTML", "CSS", "JS"],
    updatedAt: "2025-09-02"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "Personal portfolio with work samples and contact.",
    link: "https://example.com/portfolio",
    thumbnail: "",
    tags: ["Web", "Responsive"],
    updatedAt: "2025-08-20"
  }
];

// Render cards
function renderCards(list) {
  const container = document.getElementById("cards");
  if (!container) return;
  container.innerHTML = "";

  list.forEach(p => {
    const article = document.createElement("article");
    article.className = "card light-mode";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `${p.title} – open project`);
    article.addEventListener("click", () => openProject(p.link));
    article.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openProject(p.link);
    });

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    if (p.thumbnail) {
      const img = document.createElement("img");
      img.src = p.thumbnail;
      img.alt = p.title;
      thumb.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "placeholder";
      ph.textContent = (p.title?.[0] || "P").toUpperCase();
      thumb.appendChild(ph);
    }

    const content = document.createElement("div");
    content.className = "card-content";
    content.innerHTML = `
      <h3>${escapeHTML(p.title)}</h3>
      <p>${escapeHTML(p.description || "")}</p>
      <div class="tag-row">
        ${(p.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join("")}
      </div>
      <div class="card-footer">
        <span>${p.updatedAt ? `Updated: ${p.updatedAt}` : ""}</span>
        <span>Open ↗</span>
      </div>
    `;

    article.appendChild(thumb);
    article.appendChild(content);
    container.appendChild(article);
  });
}

// Basic search
document.addEventListener("DOMContentLoaded", () => {
  const searchEl = document.getElementById("search");
  if (searchEl) {
    searchEl.addEventListener("input", () => {
      const q = searchEl.value.trim().toLowerCase();
      const filtered = projects.filter(p =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.tags || []).join(" ").toLowerCase().includes(q)
      );
      renderCards(filtered);
    });
  }

  // Initial render
  renderCards(projects);
  console.log("Dashboard loaded");

  // Theme toggle
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      body.classList.toggle("light-mode");

      document.querySelectorAll(".card").forEach(card => {
        card.classList.toggle("dark-mode");
        card.classList.toggle("light-mode");
      });

      document.querySelector(".header")?.classList.toggle("dark-mode");
      document.querySelector(".header")?.classList.toggle("light-mode");

      document.querySelector(".footer")?.classList.toggle("dark-mode");
      document.querySelector(".footer")?.classList.toggle("light-mode");

      toggleBtn.textContent = body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  } else {
    console.warn("Theme toggle button not found");
  }
});

// Helpers
function openProject(url) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, m => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ));
}