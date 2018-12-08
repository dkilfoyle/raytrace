import Tracer from "./Tracer";
import Ray from "../Math/Ray";
import World from "../World/World";
import ShadeRec from "../Math/ShadeRec";
import RGBColor from "../Math/RGBColor";
import Sphere from "../GeometricObjects/Sphere";
import Point3D from "../Math/Point3D";
import Intersection from "../Math/Intersection";

export default class SingleSphere extends Tracer {
  sphere: Sphere;
  constructor() {
    super();
    this.sphere = new Sphere("SingleSphere", new Point3D(0, 0, 0), 85.0);
  }
  trace_ray(world: World, ray: Ray): RGBColor {
    let intersection: Intersection = new Intersection();

    if (this.sphere.hit(ray, intersection)) {
      return new RGBColor(0, 1, 0);
    } else return world.background_color;
  }
}
