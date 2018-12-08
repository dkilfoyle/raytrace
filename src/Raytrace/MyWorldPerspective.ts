import World from "./World/World";
import RGBColor from "./Math/RGBColor";
import Ray from "./Math/Ray";
import Vector3D from "./Math/Vector3D";
import Point3D from "./Math/Point3D";
import PixelDrawer from "./PixelDrawer";
import RayCast from "./Tracers/RayCast";
import Ambient from "./Lights/Ambient";
import PinHole from "./Cameras/PinHole";
import Matte from "./Materials/Matte";
import Sphere from "./GeometricObjects/Sphere";
import Directional from "./Lights/Directional";
import ViewPlane from "./World/ViewPlane";
import Plane from "./GeometricObjects/Plane";

export default class MyWorldPerspective extends World {
  constructor() {
    super();
  }
  build(): void {
    this.lights = [];
    this.objects = [];

    this.vp = new ViewPlane(200, 200, 1.0);
    this.background_color = new RGBColor(0.1, 0.1, 0.1);
    this.tracer = new RayCast();

    let myAmbient = new Ambient();
    myAmbient.scale_radiance(1.0);
    this.ambient = myAmbient;

    let myCamera = new PinHole();
    myCamera.eye = new Point3D(0, 0, 500);
    myCamera.lookat = new Point3D(0, 0, 0);
    myCamera.d = 600.0;
    myCamera.compute_uvw();
    this.camera = myCamera;

    let light = new Directional();
    light.set_direction(new Vector3D(100, 100, 200));
    light.scale_radiance(3.0);
    this.lights.push(light);

    let matte1 = new Matte();
    matte1.ambient_brdf.kd = 0.25;
    matte1.diffuse_brdf.kd = 0.75;
    matte1.set_cd(new RGBColor(1, 1, 0));

    // let plane = new Plane(new Point3D(0, 0, -175), new Vector3D(0, 0, 1));
    // plane.material = matte1;
    // this.objects.push(plane);

    let sphere = new Sphere("SphereBlue", new Point3D(0, 0, 0), 85);
    let matte2 = new Matte();
    matte2.ambient_brdf.kd = 0.25;
    matte2.diffuse_brdf.kd = 0.75;
    matte2.set_cd(new RGBColor(0, 0, 1));
    sphere.material = matte2;
    this.objects.push(sphere);
  }
  render_scene(pixel_drawer: PixelDrawer): void {
    this.camera.render_scene(this, pixel_drawer);
  }
  render_pixel(pixel_drawer: PixelDrawer, x: number, y: number): void {
    this.camera.render_pixel(this, pixel_drawer, x, y);
  }
}
