
// Types
const enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

type Toggle = (before: Theme, after: Theme, elem: HTMLElement) => Theme[];


// Classes
export class Mode {
    public static systemPreference: Theme;
    public static storedTheme: Theme;
    public static startTheme: Theme;
    public static oppositeTheme: Theme;

    private static init() {
        this.systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
        this.storedTheme = localStorage.getItem('theme') as Theme;
        this.startTheme = this.storedTheme || this.systemPreference;
        this.oppositeTheme = [Theme.LIGHT, Theme.DARK].find(t => t !== this.startTheme) as Theme;
    }

    private static toggle: Toggle = (before, after, element) => {
        document.querySelectorAll(`[class*='${before}']`).forEach((elem) => {
            const getMode = [...elem.classList].find((c) => c.includes(before))!;
            elem.classList.replace(getMode, getMode.replace(before, after as Theme));
        });

        localStorage.setItem('theme', after as Theme);
        element.style.transform = (before === Theme.LIGHT) ? 'rotate(90deg)' : 'rotate(0deg)';

        return [after, before]; // Switch the themes every go around
    }

    public static toggleOnLoad(button: HTMLElement) {
        this.init();
        this.toggle(this.oppositeTheme, this.startTheme, button); // On load, any classes with the old theme are changed based on localStorage || system preference

    }

    public static toggleOnClick(button: HTMLElement) {
        if (!this.startTheme || !this.oppositeTheme) {
            this.init();
        }
        [this.startTheme, this.oppositeTheme] = this.toggle(this.startTheme, this.oppositeTheme, button); // On click, any current theme is replaced with its opposite
    }
}



