// import Vector3D from "./Math/Vector3D";
// import Scene from "./Scene";
// import Sphere from "./Sphere";
// import SceneElement from "./SceneElement";
// import Intersection from "./Intersection";

// const MAX_RAY_DEPTH = 1;
// const INFINITY = 1e8;

// /**
//  * @class RayTracer
//  */
// export default class RayTracer {
//   constructor(public backgroundColor: Vector3D, public scene: Scene) {}

//   trace(rayOrigin: Vector3D, rayDir: Vector3D) {
//     let tnear = INFINITY;
//     let element: SceneElement | null = null;
//     const elements: Array<SceneElement> = this.scene.getElements();
//     const elementsLen: number = elements.length;
//     const hitInfo: Intersection = { t0: INFINITY, t1: INFINITY };

//     // intersect the current ray with all scene elements and find the closest intersection
//     for (let i: number = 0; i < elementsLen; i++) {
//       hitInfo.t0 = INFINITY;
//       hitInfo.t1 = INFINITY;
//       var el = elements[i];
//       if (el.intersect(rayOrigin, rayDir, hitInfo)) {
//         // ray hit intersect
//         if (hitInfo.t0 < 0) {
//           hitInfo.t0 = hitInfo.t1;
//         }

//         if (hitInfo.t0 < tnear) {
//           tnear = hitInfo.t0;
//           element = el;
//         }
//       }
//     }

//     if (element == null) {
//       // no hit, return background color
//       return this.backgroundColor;
//     }

//     let surfaceColor: Vector3D = new Vector3D(0, 0, 0);
//     let intersectionPoint: Vector3D = rayOrigin
//       .clone()
//       .add(rayDir.clone().multiply(tnear));
//     let intersectionNormal: Vector3D = element.getNormal(intersectionPoint);

//     let bias: number = 1e-4;
//     let inside: boolean = false;
//     if (rayDir.dotProduct(intersectionNormal) > 0) {
//       intersectionNormal.revert();
//       inside = true;
//     }

//     let mat = element.material;
//     for (let i = 0; i < elementsLen; i++) {
//       let el = elements[i];
//       let lightMat = el.material;
//       if (
//         lightMat.emissionColor.x > 0 ||
//         lightMat.emissionColor.y > 0 ||
//         lightMat.emissionColor.z > 0
//       ) {
//         // light source

//         // calculate the direction vector from object intersection point to this light
//         let transmission: Vector3D = new Vector3D(1, 1, 1);
//         let lightDirection: Vector3D = (<Sphere>el).center
//           .clone()
//           .subtract(intersectionPoint);
//         lightDirection.normalize();
//         var lightHitInfo = { t0: INFINITY, t1: INFINITY };

//         // find closest intersection of the ray from just outside the intersection point to the light
//         for (var j = 0; j < elementsLen; j++) {
//           if (i != j) {
//             if (
//               elements[j].intersect(
//                 intersectionPoint
//                   .clone()
//                   .add(intersectionNormal.clone().multiply(bias)),
//                 lightDirection,
//                 lightHitInfo
//               )
//             ) {
//               // something is blocking ray from object to light - therefore no lighting
//               transmission.x = 0;
//               transmission.y = 0;
//               transmission.z = 0;
//               break;
//             }
//           }
//         }

//         var lightRatio = Math.max(
//           0,
//           intersectionNormal.dotProduct(lightDirection)
//         );

//         surfaceColor.add(
//           mat.surfaceColor
//             .clone()
//             .product(transmission)
//             .product(lightMat.emissionColor.clone().multiply(lightRatio))
//         );
//       }
//     }

//     surfaceColor.add(mat.emissionColor);
//     return surfaceColor;
//   }

//   render(
//     width: number,
//     height: number,
//     startY: number,
//     scanHeight: number
//   ): ArrayBuffer {
//     // create buffer, 4 bytes for 1 pixel, r, g, b, a order
//     var colorDepth = 4;
//     var buffer = new ArrayBuffer(width * scanHeight * colorDepth);
//     var bufferView = new Uint32Array(buffer);
//     var invWidth = 1 / width;
//     var invHeight = 1 / height;
//     var fov = 30;
//     var aspectRatio = width / height;
//     var angle = Math.tan((Math.PI * 0.5 * fov) / 180);
//     var rayOrigin = new Vector3D(0, 0, 0);
//     var pixelIndex = 0;

//     // trace rays from camera through screen pixels into scene
//     for (var y = startY; y < startY + scanHeight; ++y) {
//       for (var x = 0; x < width; ++x, ++pixelIndex) {
//         var xx = (2 * ((x + 0.5) * invWidth) - 1) * angle * aspectRatio;
//         var yy = (1 - 2 * ((y + 0.5) * invHeight)) * angle;
//         var rayDir = new Vector3D(xx, yy, -1);
//         rayDir.normalize();

//         // trace
//         var pixelColor = this.trace(rayOrigin, rayDir);

//         pixelColor.x = Math.min(1, pixelColor.x);
//         pixelColor.y = Math.min(1, pixelColor.y);
//         pixelColor.z = Math.min(1, pixelColor.z);

//         // convert pixel to bytes
//         var r = Math.round(pixelColor.x * 255);
//         var g = Math.round(pixelColor.y * 255);
//         var b = Math.round(pixelColor.z * 255);

//         bufferView[pixelIndex] =
//           (255 << 24) | // alpha
//           (b << 16) | // blue
//           (g << 8) | // green
//           r; // red
//       }
//     }

//     return buffer;
//   }
// }
