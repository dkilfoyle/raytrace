import Point3D from "../Math/Point3D";
import Vector3D from "../Math/Vector3D";
import World from "../World/World";
import PixelDrawer from "../PixelDrawer";

export default abstract class Camera {
  eye: Point3D = new Point3D();
  lookat: Point3D = new Point3D();
  ra: number = 0;
  u: Vector3D = new Vector3D(1, 0, 0);
  v: Vector3D = new Vector3D(0, 1, 0);
  w: Vector3D = new Vector3D(0, 0, 1);
  up: Vector3D = new Vector3D(0, 1, 0);
  exposure_time: number = 1.0;
  constructor() {}
  abstract render_scene(w: World, pixel_drawer: PixelDrawer): void;
  abstract render_pixel(
    w: World,
    pixel_drawer: PixelDrawer,
    x: number,
    y: number
  ): void;
  compute_uvw(): void {
    this.w = this.eye
      .clone()
      .subtract(this.lookat)
      .asVector3D();
    this.w.normalize();
    this.u = this.up.clone().crossProduct(this.w);
    this.u.normalize();
    this.v = this.w.clone().crossProduct(this.u);

    // take care of the singularity by hardwiring in specific camera orientations
    if (
      this.eye.x == this.lookat.x &&
      this.eye.z == this.lookat.z &&
      this.eye.y > this.lookat.y
    ) {
      // camera looking vertically down
      this.u = new Vector3D(0, 0, 1);
      this.v = new Vector3D(1, 0, 0);
      this.w = new Vector3D(0, 1, 0);
    }

    if (
      this.eye.x == this.lookat.x &&
      this.eye.z == this.lookat.z &&
      this.eye.y < this.lookat.y
    ) {
      // camera looking vertically up
      this.u = new Vector3D(1, 0, 0);
      this.v = new Vector3D(0, 0, 1);
      this.w = new Vector3D(0, -1, 0);
    }
  }
}
