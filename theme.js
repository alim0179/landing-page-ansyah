// Global Theme System - Ansyah

(function () {
  const html = document.documentElement;

  // Apply theme secepat mungkin (anti flicker)
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    html.classList.add(savedTheme);
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const lightIcon = toggleBtn.querySelector(".light-icon");
    const darkIcon = toggleBtn.querySelector(".dark-icon");

    function updateIcons() {
      if (html.classList.contains("dark")) {
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

    updateIcons();

    toggleBtn.addEventListener("click", function () {
      html.classList.toggle("dark");

      if (html.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }

      updateIcons();
    });
  });
})();