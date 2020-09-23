// Types
type Theme = 'dark' | 'light';

// Global vars
const modeSwitchers = document.getElementById('mode-switchers')!;
const themes: Theme[] = ['dark', 'light'];

// Functions
const changeClassList = (future: Theme, past: Theme): void => {
    document.querySelectorAll(`[class*='${past}']`).forEach((elem) => {
        const getMode = [...elem.classList].find((c) => c.includes(past))!;
        elem.classList.replace(getMode, getMode.replace(past, future));
    });

    localStorage.setItem('theme', future);
    modeSwitchers.style.transform = (future === 'light') ? 'rotate(0deg)' : 'rotate(90deg)';
};

const getStartTheme = (): Theme => {
    const storage = localStorage.getItem('theme') as Theme;
    const sysPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';

    // Each visit, we get the theme from local storage. If nothing is stored (e.g., first visit), we use the system preference
    if (!storage) {
        return sysPreference;
    } else {
        return storage;
    }

}

export const toggleLightDark = (): void => {
    const startTheme = getStartTheme();
    const oppositeTheme = themes.find(t => t !== startTheme)!;
    let rotation = 0;

    // On load, make sure current theme is stored theme
    changeClassList(startTheme, oppositeTheme);

    // On click, toggle mode
    modeSwitchers.addEventListener('click', (e) => {
        const currentTheme = localStorage.getItem('theme') as Theme;
        const setTheme = themes.find(t => t !== currentTheme)!;
        changeClassList(setTheme, currentTheme);
    });
}



