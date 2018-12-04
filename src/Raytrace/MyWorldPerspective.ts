import World from "./World/World";
import RGBColor from "./Math/RGBColor";
import Ray from "./Math/Ray";
import Vector3D from "./Math/Vector3D";
import Point3D from "./Math/Point3D";
import PixelDrawer from "./PixelDrawer";

export default class MyWorldPerspective extends World {
  constructor() {
    super();
  }
  build(): void {}
  render_scene(pixel_drawer: PixelDrawer): void {
    this.camera.render_scene(this, pixel_drawer);
  }
}
