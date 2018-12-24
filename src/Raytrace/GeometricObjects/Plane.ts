import Ray from "../Math/Ray";
import Intersection from "../Math/Intersection";
import GeometricObject from "./GeometricObject";
import Point3D from "../Math/Point3D";
import Vector3D from "../Math/Vector3D";

export default class Plane extends GeometricObject {
  constructor(
    name: string = "Plane",
    public a: Point3D = new Point3D(0, 0, 0),
    public n: Vector3D = new Vector3D(0, 1, 0)
  ) {
    super(name);
  }
  hit(ray: Ray, intersection: Intersection): boolean {
    let t: number = this.a
      .cloneVector()
      .subtract(ray.o)
      .dotProduct(
        this.n.clone().divideScalar(ray.d.clone().dotProduct(this.n))
      );

    if (t > 0.00001) {
      intersection.name = this.name;
      intersection.t = t;
      intersection.hit_an_object = true;
      intersection.normal = this.n;
      intersection.local_hit_point = ray.o
        .clone()
        .add(ray.d.clone().multiplyScalar(t));

      return true;
    }

    return false;
  }
  shadow_hit(ray: Ray): number {
    if (!this.casts_shadow) return -1;
    let t: number = this.a
      .cloneVector()
      .subtract(ray.o)
      .dotProduct(
        this.n.clone().divideScalar(ray.d.clone().dotProduct(this.n))
      );

    if (t > 0.00001) {
      return t;
    }

    return -1;
  }
}
