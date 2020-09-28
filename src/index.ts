import "./style.scss";
import { Mode } from "./toggleLightDark_OOP"


window.addEventListener('load', (e) => {
  Mode.toggleOnLoad(document.getElementById('mode-switchers')!);

  document.getElementById('mode-switchers')!.addEventListener('click', (e) => {
    Mode.toggleOnClick(document.getElementById('mode-switchers')!);
  });

});