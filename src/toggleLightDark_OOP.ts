
/* 
Question:

Door het Singleton patroon werkt het initialiseren van startTheme vanuit localStorage (of systeeminstellingen) in de constructor niet meer. 
Na één keer klikken blijft de waarde van startTheme en dus oppositeTheme gelijk. 

Hiervoor zijn (tenminste) twee oplossingen. Optie 1:
In de toggle() method geen parameters gebruiken, maar steeds storedTheme steeds opnieuw uit localStorage halen en vanuit daar startTheme en oppositeTheme vullen. 
niet erg DRY, dus in eerste instantie ben ik voor optie 2 gegaan:
In de toggleOnClick() method bij elke iteratie startTheme en OppositeTheme omdraaien. (Hiervoor returnt toggle() nu de thema's steeds)

Welke optie is beter? Of is er nog een betere optie?

*/


// Types
const enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

type Toggle = (before: Theme, after: Theme) => Theme[];


// Class
export class Mode {
    startTheme: Theme;
    oppositeTheme: Theme;
    button: HTMLElement;
    storedTheme: Theme;
    systemPreference: Theme;
    availableThemes: readonly Theme[];

    private static instance: Mode;

    private constructor() {
        this.availableThemes = [Theme.LIGHT, Theme.DARK];
        this.systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
        this.button = document.getElementById('mode-switchers')!;
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

    private toggle: Toggle = (before, after) => {
        document.querySelectorAll(`[class*='${before}']`).forEach((elem) => {
            const getMode = [...elem.classList].find((c) => c.includes(before))!;
            elem.classList.replace(getMode, getMode.replace(before, after as Theme));
        });

        localStorage.setItem('theme', after as Theme);
        this.button.style.transform = (before === Theme.LIGHT) ? 'rotate(90deg)' : 'rotate(0deg)';

        return [after, before]; // Switch the themes every go around
    }

    toggleOnLoad() {
        this.toggle(this.oppositeTheme, this.startTheme); // On load, any classes with the old theme are changed based on localStorage || system preference

    }

    toggleOnClick() {
        [this.startTheme, this.oppositeTheme] = this.toggle(this.startTheme, this.oppositeTheme); // On click, any current theme is replaced with its opposite
    }
}










