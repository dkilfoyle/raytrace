// import Vector3D from "../Raytrace/Math/Vector3D";
// import Material from "./Material";
// import Intersection from "./Intersection";
// import SceneElement from "./SceneElement";

// /**
//  * @class Sphere
//  */
// export default class Sphere extends SceneElement {
//   radius2: number;
//   constructor(
//     public center: Vector3D,
//     public radius: number,
//     public material: Material
//   ) {
//     super();
//     this.radius2 = radius * radius;
//   }

//   intersect(rayOrigin: Vector3D, rayDir: Vector3D, out: Intersection): boolean {
//     const l: Vector3D = this.center.clone().subtract(rayOrigin);
//     const tca: number = l.dotProduct(rayDir);
//     if (tca < 0) {
//       return false;
//     }

//     const d2: number = l.dotProduct(l) - tca * tca;
//     if (d2 > this.radius2) {
//       return false;
//     }

//     const thc: number = Math.sqrt(this.radius2 - d2);

//     out.t0 = tca - thc;
//     out.t1 = tca + thc;

//     return true;
//   }

//   getNormal(point: Vector3D): Vector3D {
//     const normal: Vector3D = point.clone().subtract(this.center);
//     normal.normalize();
//     return normal;
//   }
// }
