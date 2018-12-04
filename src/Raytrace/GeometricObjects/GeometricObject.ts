import Material from "../Materials/Material";
import ShadeRec from "../Math/ShadeRec";
import Ray from "../Math/Ray";
import Intersection from "../Math/Intersection";

export default abstract class GeometricObject {
  material!: Material;
  constructor() {}
  abstract hit(ray: Ray, intersection: Intersection): boolean;
}