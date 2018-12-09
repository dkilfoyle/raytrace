import Vue from "vue";
import App from "./App.vue";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import RGBColor from './Raytrace/Math/RGBColor';
// import Point3D from './Raytrace/Math/Point3D';
// import XYZ from './Raytrace/Math/XYZ';

Vue.config.productionTip = false;

// window.devtoolsFormatters = [{
//   header: function(obj: any){
//     if ((obj instanceof Vector3D) || (obj instanceof RGBColor) || (obj instanceof Point3D)){
//       return ["div", {}, `${(<XYZ>obj).x]
//  }
//       return ["div", {}, obj.toString()]
//   },
//   hasBody: function(){
//       return false;
//   }
// }]

window.bDebug = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
