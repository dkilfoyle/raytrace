import Ray from "../Math/Ray";
import Intersection from "../Math/Intersection";
import GeometricObject from "./GeometricObject";
import Point3D from "../Math/Point3D";
import Vector3D from "../Math/Vector3D";

export default class Plane extends GeometricObject {
  constructor(
    name: string = "Plane",
    public a: Point3D = new Point3D(),
    public n: Vector3D = new Vector3D()
  ) {
    super(name);
  }
  hit(ray: Ray, intersection: Intersection): boolean {
    let t: number = this.a
      .cloneVector()
      .subtract(ray.o.asVector3D())
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
        .addVector(ray.d.clone().multiplyScalar(t));

      return true;
    }

    return false;
  }
}
