// get theme on page load
localStorage.getItem("theme");

// set theme on button press
localStorage.setItem("theme", newTheme);

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
// or
const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");