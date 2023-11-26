document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");
    const darkModeBtn = document.querySelector(".dark-mode-btn");
    const darkModeIcon = document.querySelector(".dark-mode-btn i");

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
        body.classList.add("dark");
        darkModeIcon.classList.toggle("fa-regular", false);
        darkModeIcon.classList.toggle("fa-solid", true);
    }

    darkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("darkMode", body.classList.contains("dark"));
        darkModeIcon.classList.toggle("fa-regular");
        darkModeIcon.classList.toggle("fa-solid");
    });
});
