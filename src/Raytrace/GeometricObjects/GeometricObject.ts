import Material from "../Materials/Material";
import ShadeRec from "../Math/ShadeRec";
import Ray from "../Math/Ray";
import Intersection from "../Math/Intersection";

export default abstract class GeometricObject {
  material!: Material;
  name: string;
  casts_shadow: boolean = true;
  constructor(name: string = "GeometricObject") {
    this.name = name;
    this.material = new Material();
  }
  abstract hit(ray: Ray, intersection: Intersection): boolean;
  abstract shadow_hit(ray: Ray): number;
}
