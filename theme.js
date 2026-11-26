// const btn = document.getElementById("theme-toggle");

// try {
//     btn.ariaPressed = localStorage.getItem("dark-theme") === "true";
// } catch {} 

// btn.onclick = () => {
//     btn.ariaPressed = btn.ariaPressed !== "true";

//     if (btn.ariaPressed == "true"){
//         btn.textContent = "Light Theme";
//     } else{
//         btn.textContent = "Dark Theme";
//     }
//     try {
//         localStorage.setItem("dark-theme", btn.ariaPressed);
//     } catch {}
// };

// btn.hidden = false;


const root = document.documentElement;
let btn = null;

function applyTheme(isDark) {
    if (isDark) {
        root.dataset.theme = "dark";
    } else {
        delete root.dataset.theme;
    }
    // label names the action the button will perform
    btn.textContent = isDark ? "Light theme" : "Dark theme";
}

function saveTheme(isDark) {
    try {
        localStorage.setItem("dark-theme", String(isDark));
    } catch (e) {}
}

function handleToggleClick() {
    const isDark = root.dataset.theme !== "dark";
    applyTheme(isDark);   // apply first so it works even if saving fails
    saveTheme(isDark);
}

function initThemeButton() {
    btn = document.getElementById("theme-toggle");
    applyTheme(root.dataset.theme === "dark");
    btn.addEventListener("click", handleToggleClick);
    btn.hidden = false;
}

// runs immediately, before first paint
try {
    if (localStorage.getItem("dark-theme") === "true") {
        root.dataset.theme = "dark";
    }
} catch (e) {}

// the button doesn't exist yet, so wait for the DOM
document.addEventListener("DOMContentLoaded", initThemeButton);
