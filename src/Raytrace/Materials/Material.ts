import RGBColor from "../Math/RGBColor";
import ShadeRec from "../Math/ShadeRec";
import World from "../World/World";

export default class Material {
  constructor() {}
  shade(w: World, sr: ShadeRec): RGBColor {
    return new RGBColor();
  }
}
