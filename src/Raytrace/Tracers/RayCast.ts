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
    if (window.bDebug) console.group("RayCast trace_ray");
    const sr: ShadeRec = world.hit_objects(ray);

    let raycastcolor: RGBColor;

    if (sr.intersection.hit_an_object) {
      raycastcolor = sr.material.shade(world, sr);
    } else {
      raycastcolor = world.background_color;
    }

    if (window.bDebug) console.groupEnd();
    return raycastcolor;
  }
}
