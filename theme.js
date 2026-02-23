// Ansyah Global Theme System - Auto Device + Manual Override

(function () {
  const html = document.documentElement;
  const storageKey = "theme";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    html.classList.remove("light", "dark");
    html.classList.add(theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;
    return systemDark.matches ? "dark" : "light";
  }

  // Apply theme saat pertama load (anti flicker)
  applyTheme(getPreferredTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const lightIcon = toggleBtn.querySelector(".light-icon");
    const darkIcon = toggleBtn.querySelector(".dark-icon");

    function updateIcons() {
      const isDark = html.classList.contains("dark");

      if (lightIcon && darkIcon) {
        if (isDark) {
          lightIcon.style.opacity = 1;
          lightIcon.style.transform = "translateY(0)";
          darkIcon.style.opacity = 0;
          darkIcon.style.transform = "translateY(-4px)";
        } else {
          lightIcon.style.opacity = 0;
          lightIcon.style.transform = "translateY(4px)";
          darkIcon.style.opacity = 1;
          darkIcon.style.transform = "translateY(0)";
        }
      }
    }

    updateIcons();

    toggleBtn.addEventListener("click", function () {
      const isDark = html.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";

      applyTheme(newTheme);
      localStorage.setItem(storageKey, newTheme);
      updateIcons();
    });

    // 🔄 Auto update kalau device berubah
    systemDark.addEventListener("change", (e) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? "dark" : "light");
        updateIcons();
      }
    });
  });
})();