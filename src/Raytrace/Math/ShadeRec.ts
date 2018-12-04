import Vector3D from "./Vector3D";
import Point3D from "./Point3D";
import Ray from "./Ray";
import RGBColor from "./RGBColor";
import Material from "../Materials/Material";
import Intersection from "./Intersection";

export default class ShadeRec {
  intersection: Intersection = new Intersection();
  material!: Material;
  depth: number = 0;
  color: RGBColor = new RGBColor();

  constructor() {}
}
