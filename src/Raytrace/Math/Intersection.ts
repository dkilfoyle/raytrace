import Vector3D from "./Vector3D";
import Point3D from "./Point3D";
import Ray from "./Ray";
import RGBColor from "./RGBColor";
import Material from "../Materials/Material";

export default class Intersection {
  hit_an_object: boolean = false;
  hit_point: Point3D = new Point3D();
  local_hit_point: Point3D = new Point3D();
  normal: Vector3D = new Vector3D();
  ray: Ray = new Ray();
  t: number = 0;

  constructor() {}
  clone(c: Intersection) {
    this.hit_an_object = c.hit_an_object;
    this.hit_point = c.hit_point.clone();
    this.local_hit_point = c.local_hit_point.clone();
    this.normal = c.normal.clone();
    this.ray = c.ray.clone();
    this.t = c.t;
  }
}
