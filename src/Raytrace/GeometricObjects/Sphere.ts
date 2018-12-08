import GeometricObject from "./GeometricObject";
import Point3D from "../Math/Point3D";
import Ray from "../Math/Ray";
import Vector3D from "../Math/Vector3D";
import Intersection from "../Math/Intersection";

export default class Sphere extends GeometricObject {
  center: Point3D;
  radius: number;
  constructor(name: string = "Sphere", center: Point3D, radius: number) {
    super(name);
    this.center = center.clone();
    this.radius = radius;
  }
  hit(ray: Ray, intersection: Intersection): boolean {
    let t: number;
    let rtoc: Vector3D = ray.o
      .clone()
      .subtract(this.center)
      .asVector3D();
    let a: number = ray.d.dotProduct(ray.d);
    let b: number = 2.0 * rtoc.dotProduct(ray.d);
    let c: number = rtoc.dotProduct(rtoc) - this.radius * this.radius;
    let disc: number = b * b - 4.0 * a * c;

    if (disc < 0.0) return false;
    else {
      let e: number = Math.sqrt(disc);
      let denom: number = 2.0 * a;
      t = (-b - e) / denom; // smaller root

      if (t > 0.0001) {
        intersection.t = t;
        intersection.ray = ray;
        intersection.hit_an_object = true;
        intersection.normal = rtoc
          .clone()
          .add(ray.d.clone().multiplyScalar(t))
          .multiplyScalar(1.0 / this.radius);
        intersection.local_hit_point = ray.o
          .clone()
          .addVector(ray.d.clone().multiplyScalar(t));
        return true;
      }

      t = (-b + e) / denom; // larger root

      if (t > 0.0001) {
        intersection.t = t;
        intersection.ray = ray;
        intersection.hit_an_object = true;
        intersection.normal = rtoc
          .clone()
          .add(ray.d.clone().multiplyScalar(t))
          .multiplyScalar(1.0 / this.radius);
        intersection.local_hit_point = ray.o
          .clone()
          .addVector(ray.d.clone().multiplyScalar(t));
        return true;
      }
    }

    return false;
  }
}
