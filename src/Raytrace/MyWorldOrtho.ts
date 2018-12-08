import World from "./World/World";
import RGBColor from "./Math/RGBColor";
import Ray from "./Math/Ray";
import Vector3D from "./Math/Vector3D";
import Point3D from "./Math/Point3D";
import PixelDrawer from "./PixelDrawer";
import SingleSphere from "./Tracers/SingleSphere";

export default class MyWorldOrtho extends World {
  constructor() {
    super();
  }
  build(): void {
    this.background_color = new RGBColor(0.1, 0.1, 0.1);
    this.tracer = new SingleSphere();
  }
  render_pixel(pixel_drawer: PixelDrawer, x: number, y: number): void {}
  render_scene(pixel_drawer: PixelDrawer): void {
    let pixel_color: RGBColor;
    let ray: Ray = new Ray();
    let hres: number = this.vp.hres;
    let vres: number = this.vp.vres;
    let s: number = this.vp.s;
    let zw: number = 100.0; // hardwired in

    ray.d = new Vector3D(0, 0, -1);

    for (
      let r = 0;
      r < vres;
      r++ // up
    )
      for (let c = 0; c <= hres; c++) {
        // across
        ray.o = new Point3D(
          s * (c - hres / 2.0 + 0.5),
          s * (r - vres / 2.0 + 0.5),
          zw
        );
        pixel_color = this.tracer.trace_ray(this, ray);
        pixel_drawer.draw_pixel(
          r,
          c,
          pixel_color.r,
          pixel_color.g,
          pixel_color.b
        );
      }
  }
}
