import "./style.scss";


// 
// import { toggleLightDark } from "./toggleLightDark";

// window.addEventListener('load', function (event) {
//   toggleLightDark();
// });


import { Mode } from "./toggleLightDark_OOP"


window.addEventListener('load', (e) => {
  Mode.getInstance().toggleOnLoad();

  document.getElementById('mode-switchers')!.addEventListener('click', (e) => {
    Mode.getInstance().toggleOnClick();
  });

});