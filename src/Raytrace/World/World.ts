import ViewPlane from "./ViewPlane";
import RGBColor from "../Math/RGBColor";
import Ray from "../Math/Ray";
import Point3D from "../Math/Point3D";
import Light from "../Lights/Light";
import Tracer from "../Tracers/Tracer";
import Camera from "../Cameras/Camera";
import ShadeRec from "../Math/ShadeRec";
import Vector3D from "../Math/Vector3D";
import Intersection from "../Math/Intersection";
import GeometricObject from "../GeometricObjects/GeometricObject";
import PixelDrawer from "../PixelDrawer";

export default abstract class World {
  vp: ViewPlane;
  tracer!: Tracer;
  ambient!: Light;
  camera!: Camera;
  objects: Array<GeometricObject>;
  lights: Array<Light>;
  background_color: RGBColor;
  draw_pixel:
    | ((x: number, y: number, r: number, g: number, b: number) => void)
    | undefined;

  constructor() {
    this.vp = new ViewPlane(200, 200, 1.0);
    this.background_color = new RGBColor(0, 0, 0);
    this.objects = [];
    this.lights = [];
  }
  abstract build(): void;
  abstract render_scene(pixel_drawer: PixelDrawer): void;

  hit_objects(ray: Ray): ShadeRec {
    let sr: ShadeRec = new ShadeRec();
    let normal: Vector3D;
    let local_hit_point: Point3D;
    let tmin: number = 1.0e10;
    let intersection: Intersection = new Intersection();

    for (let j = 0; j < this.objects.length; j++) {
      if (this.objects[j].hit(ray, intersection) && intersection.t < tmin) {
        sr.intersection.clone(intersection);
        tmin = intersection.t;
        sr.material = this.objects[j].material;
      }
    }

    return sr;
  }
}
