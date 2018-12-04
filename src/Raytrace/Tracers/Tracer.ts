import Ray from "../Math/Ray";
import RGBColor from "../Math/RGBColor";
import World from "../World/World";

export default class Tracer {
  constructor() {}
  trace_ray(world: World, ray: Ray, depth: number = 0): RGBColor {
    return new RGBColor(0, 0, 0);
  }
}
