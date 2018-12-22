import Ray from "../Math/Ray";
import RGBColor from "../Math/RGBColor";
import World from "../World/World";
import Point2D from "../Math/Point2D";
import Point3D from "../Math/Point3D";

function rand_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export default abstract class Sampler {
  num_samples: number;
  num_sets: number;
  count: number;
  jump: number;
  samples: Point2D[];
  disk_samples: Point2D[];
  hemisphere_samples: Point3D[];
  sphere_samples: Point3D[];
  shuffled_indices: number[];

  constructor(num_samples: number = 1, num_sets: number = 83) {
    this.num_samples = num_samples;
    this.num_sets = num_sets;
    this.count = 0;
    this.jump = 0;
    this.samples = new Array<Point2D>();
    this.disk_samples = new Array<Point2D>();
    this.hemisphere_samples = new Array<Point3D>();
    this.sphere_samples = new Array<Point3D>();
    this.shuffled_indices = new Array<number>();
    this.setup_shuffled_indices();
  }

  abstract generate_samples(): void;

  setup_shuffled_indices(): void {
    console.assert(this.shuffled_indices.length === 0);
    // set indices to the sequence 0..num_samples
    let indices: number[] = [];
    for (let j = 0; j < this.num_samples; j++) indices.push(j);

    // copy a shuffled version of the indices array num_sets times
    for (let p = 0; p < this.num_sets; p++) {
      // shuffle the indices array
      indices.sort((a, b) => 0.5 - Math.random());
      for (let k = 0; k < this.num_samples; k++) {
        this.shuffled_indices.push(indices[k]);
      }
    }
  }

  shuffle_x_coordinates(): void {
    for (let p = 0; p < this.num_sets; p++)
      for (let i = 0; i < this.num_samples - 1; i++) {
        let target: number = rand_int(this.num_samples) + p * this.num_samples;
        let temp: number = this.samples[i + p * this.num_samples + 1].x;
        this.samples[i + p * this.num_samples + 1].x = this.samples[target].x;
        this.samples[target].x = temp;
      }
  }

  shuffle_y_coordinates(): void {
    for (let p = 0; p < this.num_sets; p++)
      for (let i = 0; i < this.num_samples - 1; i++) {
        let target: number = rand_int(this.num_samples) + p * this.num_samples;
        let temp: number = this.samples[i + p * this.num_samples + 1].y;
        this.samples[i + p * this.num_samples + 1].y = this.samples[target].y;
        this.samples[target].y = temp;
      }
  }

  sample_unit_square(): Point2D {
    // retrieve the next point in the unit_square of samples
    if (this.count % this.num_samples == 0)
      // start of a new pixel
      this.jump = rand_int(this.num_sets) * this.num_samples; // random index jump initialised to zero in constructor

    return this.samples[
      this.jump +
        this.shuffled_indices[this.jump + (this.count++ % this.num_samples)]
    ];
  }

  // Maps the 2D sample points in the square [-1,1] X [-1,1] to a unit disk, using Peter Shirley's concentric map function

  map_samples_to_unit_disk(): void {
    let size: number = this.samples.length;
    let r: number, phi: number; // polar coordinates
    let sp: Point2D = new Point2D(); // sample point on unit disk

    this.disk_samples = new Array<Point2D>(size);

    for (let j = 0; j < size; j++) {
      // map sample point to [-1, 1] X [-1,1]

      sp.x = 2.0 * this.samples[j].x - 1.0;
      sp.y = 2.0 * this.samples[j].y - 1.0;

      if (sp.x > -sp.y) {
        // sectors 1 and 2
        if (sp.x > sp.y) {
          // sector 1
          r = sp.x;
          phi = sp.y / sp.x;
        } else {
          // sector 2
          r = sp.y;
          phi = 2 - sp.x / sp.y;
        }
      } else {
        // sectors 3 and 4
        if (sp.x < sp.y) {
          // sector 3
          r = -sp.x;
          phi = 4 + sp.y / sp.x;
        } else {
          // sector 4
          r = -sp.y;
          if (sp.y != 0.0)
            // avoid division by zero at origin
            phi = 6 - sp.x / sp.y;
          else phi = 0.0;
        }
      }

      phi *= Math.PI / 4.0;

      this.disk_samples[j].x = r * Math.cos(phi);
      this.disk_samples[j].y = r * Math.sin(phi);
    }

    this.samples = [];
  }

  // Maps the 2D sample points to 3D points on a unit hemisphere with a cosine power density distribution in the polar angle

  map_samples_to_hemisphere(exp: number): void {
    let size: number = this.samples.length;
    this.hemisphere_samples = new Array<Point3D>();

    for (let j = 0; j < size; j++) {
      let cos_phi: number = Math.cos(2.0 * Math.PI * this.samples[j].x);
      let sin_phi: number = Math.sin(2.0 * Math.PI * this.samples[j].x);
      let cos_theta: number = Math.pow(
        1.0 - this.samples[j].y,
        1.0 / (exp + 1.0)
      );
      let sin_theta: number = Math.sqrt(1.0 - cos_theta * cos_theta);
      let pu: number = sin_theta * cos_phi;
      let pv: number = sin_theta * sin_phi;
      let pw: number = cos_theta;
      this.hemisphere_samples.push(new Point3D(pu, pv, pw));
    }
  }

  // ------------------------------------------------------------------- map_samples_to_sphere

  // Maps the 2D sample points to 3D points on a unit sphere with a uniform density distribution over the surface
  // this is used for modelling a spherical light

  map_samples_to_sphere(): void {
    let r1: number, r2: number;
    let x: number, y: number, z;
    let r: number, phi: number;

    this.sphere_samples = new Array<Point3D>();

    for (let j = 0; j < this.num_samples * this.num_sets; j++) {
      r1 = this.samples[j].x;
      r2 = this.samples[j].y;
      z = 1.0 - 2.0 * r1;
      r = Math.sqrt(1.0 - z * z);
      phi = Math.PI * 2 * r2;
      x = r * Math.cos(phi);
      y = r * Math.sin(phi);
      this.sphere_samples.push(new Point3D(x, y, z));
    }
  }
}
