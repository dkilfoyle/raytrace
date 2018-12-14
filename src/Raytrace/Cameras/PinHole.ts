import Camera from "./Camera";
import World from "../World/World";
import RGBColor from "../Math/RGBColor";
import Ray from "../Math/Ray";
import Point2D from "../Math/Point2D";
import Vector3D from "../Math/Vector3D";
import PixelDrawer from "../PixelDrawer";

export default class PinHole extends Camera {
  constructor(public d: number = 0, public zoom: number = 1.0) {
    super();
  }
  get_direction(p: Point2D): Vector3D {
    let dir: Vector3D = this.u
      .clone()
      .multiplyScalar(p.x)
      .add(this.v.clone().multiplyScalar(p.y))
      .subtract(this.w.clone().multiplyScalar(this.d))
      .normalize();
    return dir;
  }
  render_scene(world: World, pixel_drawer: PixelDrawer): void {
    let L: RGBColor;
    let ray: Ray = new Ray();
    let depth: number = 0;
    let pp: Point2D = new Point2D();
    let sp: Point2D;
    let n = Math.sqrt(world.vp.num_samples);
    let s = world.vp.s / this.zoom;

    ray.o = this.eye.clone();
    for (let r: number = 0; r < world.vp.vres; r++) {
      //  up row
      for (let c: number = 0; c < world.vp.hres; c++) {
        // across column
        L = new RGBColor(0, 0, 0);

        // anti-alias by sampling the ray direction
        for (let p = 0; p < world.vp.num_samples; p++) {
          sp = world.vp.sampler.sample_unit_square();
          pp.x = s * (c - 0.5 * world.vp.hres + sp.x);
          pp.y = s * (r - 0.5 * world.vp.vres + sp.y);

          ray.d = this.get_direction(pp);
          let l = world.tracer.trace_ray(world, ray, depth);
          L.add(l);
        }

        L.multiply(1.0 / world.vp.num_samples);
        L.multiply(this.exposure_time);
        L.maxToOne();
        pixel_drawer.draw_pixel(r, c, L.r, L.g, L.b);
      }
    }
  }
  render_pixel(
    w: World,
    pixel_drawer: PixelDrawer,
    x: number,
    y: number
  ): void {
    let L: RGBColor;
    let ray: Ray = new Ray();
    let depth: number = 0;
    let pp: Point2D = new Point2D();
    let n = Math.sqrt(w.vp.num_samples);
    let s = w.vp.s / this.zoom;

    let r = y;
    let c = x;

    ray.o = this.eye.clone();

    L = new RGBColor(0, 0, 0);

    pp.x = s * (c - 0.5 * w.vp.hres + 0.5 / n);
    pp.y = s * (r - 0.5 * w.vp.vres + 0.5 / n);
    ray.d = this.get_direction(pp);
    if (window.bDebug) console.group("Camera Ray", ray);
    let l = w.tracer.trace_ray(w, ray, depth);
    L.add(l);
    L.multiply(this.exposure_time);
    L.maxToOne();
    if (window.bDebug) console.log("Render Pixel Color: ", L);
    pixel_drawer.draw_pixel(r, c, L.r, L.g, L.b);
    if (window.bDebug) console.groupEnd();
  }
}
