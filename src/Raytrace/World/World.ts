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
import * as log from "loglevel";

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
  abstract render_pixel(pixel_drawer: PixelDrawer, x: number, y: number): void;

  hit_objects(ray: Ray): ShadeRec {
    if (window.bDebug) console.group("World hit_objects");
    let sr: ShadeRec = new ShadeRec();
    let tmin: number = 1.0e10;
    let intersection: Intersection = new Intersection();

    for (let j = 0; j < this.objects.length; j++) {
      if (this.objects[j].hit(ray, intersection) && intersection.t < tmin) {
        if (window.bDebug) console.log("Intersection: ", sr.intersection);
        sr.intersection.cloneFrom(intersection);
        sr.intersection.ray = ray.clone();
        sr.intersection.hit_point = ray.o
          .clone()
          .add(ray.d.clone().multiply(intersection.t));
        tmin = intersection.t;
        sr.material = this.objects[j].material;
      }
    }
    if (!sr.intersection.hit_an_object && window.bDebug)
      console.log("No intersection found");
    if (window.bDebug) console.groupEnd();

    return sr;
  }
}
