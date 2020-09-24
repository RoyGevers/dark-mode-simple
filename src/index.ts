import "./style.scss";


// 
// import { toggleLightDark } from "./toggleLightDark";

// window.addEventListener('load', function (event) {
//   toggleLightDark();
// });


import { Mode } from "./toggleLightDark_OOP"


window.addEventListener('load', (e) => {
  let mode = new Mode();
  mode.toggleOnLoad();

  document.getElementById('mode-switchers')!.addEventListener('click', (e) => {
    mode = new Mode();
    mode.toggleOnClick();
  });

});