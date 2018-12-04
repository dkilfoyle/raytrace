import Tracer from "./Tracer";
import Ray from "../Math/Ray";
import World from "../World/World";
import ShadeRec from "../Math/ShadeRec";
import RGBColor from "../Math/RGBColor";

export default class RayCast extends Tracer {
  constructor() {
    super();
  }
  trace_ray(world: World, ray: Ray): RGBColor {
    const sr: ShadeRec = world.hit_objects(ray);

    if (sr.intersection.hit_an_object) {
      return sr.material.shade(world, sr);
    } else {
      return world.background_color;
    }
  }
}
