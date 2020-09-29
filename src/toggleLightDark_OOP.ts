// Types
const enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

type Toggle = (before: Theme, after: Theme, el: HTMLElement) => Theme[];


// Classes
export class Mode {
    private startTheme: Theme;
    private oppositeTheme: Theme;
    private storedTheme: Theme;
    private systemPreference: Theme;
    private availableThemes: readonly Theme[];

    private static instance: Mode;

    private constructor() {
        this.availableThemes = [Theme.LIGHT, Theme.DARK];
        this.systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
        this.storedTheme = localStorage.getItem('theme') as Theme;
        this.startTheme = this.storedTheme || this.systemPreference;
        this.oppositeTheme = this.availableThemes.find(t => t !== this.startTheme) as Theme;
    }

    public static getInstance(): Mode {
        if (!Mode.instance) {
            Mode.instance = new Mode();
        }

        return Mode.instance;
    }

    private toggle: Toggle = (before, after, button) => {
        document.querySelectorAll(`[class*='${before}']`).forEach((elem) => {
            const getMode = [...elem.classList].find((c) => c.includes(before))!;
            elem.classList.replace(getMode, getMode.replace(before, after as Theme));
        });

        localStorage.setItem('theme', after as Theme);
        button.style.transform = (before === Theme.LIGHT) ? 'rotate(90deg)' : 'rotate(0deg)';

        return [after, before]; // Switch the themes every go around
    }

    toggleOnLoad(button: HTMLElement) {
        this.toggle(this.oppositeTheme, this.startTheme, button); // On load, any classes with the old theme are changed based on localStorage || system preference

    }

    toggleOnClick(button: HTMLElement) {
        [this.startTheme, this.oppositeTheme] = this.toggle(this.startTheme, this.oppositeTheme, button); // On click, any current theme is replaced with its opposite
    }
}



