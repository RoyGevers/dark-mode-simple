type Theme = 'dark' | 'light';

export class Mode {
    startTheme: Theme;
    oppositeTheme: Theme;
    button: HTMLElement;
    storedTheme: Theme;
    systemPreference: Theme;
    availableThemes: Theme[];

    constructor() {
        this.availableThemes = ['light', 'dark'];
        this.storedTheme = localStorage.getItem('theme') as Theme;
        this.systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
        this.startTheme = this.storedTheme || this.systemPreference;
        this.oppositeTheme = this.availableThemes.find(t => t !== this.startTheme) as Theme;
        this.button = document.getElementById('mode-switchers')!;
    }

    private toggle(before: Theme, after: Theme) {
        document.querySelectorAll(`[class*='${before}']`).forEach((elem) => {
            const getMode = [...elem.classList].find((c) => c.includes(before))!;
            elem.classList.replace(getMode, getMode.replace(before, after as Theme));
        });

        localStorage.setItem('theme', after as Theme);
        this.button.style.transform = (before === 'light') ? 'rotate(90deg)' : 'rotate(0deg)';
    }

    toggleOnLoad() {
        this.toggle(this.oppositeTheme, this.startTheme); // On load, classes with the old theme are changed based on localStorage || system preference
    }

    toggleOnClick() {
        this.toggle(this.startTheme, this.oppositeTheme); // On click, any current theme is replaced with its opposite
    }
}










