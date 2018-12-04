import Vector3D from "../../src/Raytrace/Math/Vector3D";
import Ray from "../../src/Raytrace/Math/Ray";
import Point3D from "@/Raytrace/Math/Point3D";

test("Ray constructor makes own copy of origin and dir", () => {
  let origin = new Point3D(1, 2, 3);
  let dir = new Vector3D(4, 5, 6);
  let ray = new Ray(origin, dir);
  ray.o.x = 10;
  ray.d.y = 20;
  expect(origin.x).toEqual(1.0);
  expect(dir.y).toEqual(5.0);
});
