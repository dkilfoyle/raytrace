import Vector3D from "../../src/Raytrace/Math/Vector3D";

test("length of unit vector is 1", () => {
  expect(new Vector3D(1, 0, 0).length()).toEqual(1.0);
});
