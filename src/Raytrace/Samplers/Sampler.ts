import Ray from "../Math/Ray";
import RGBColor from "../Math/RGBColor";
import World from "../World/World";
import Point2D from "../Math/Point2D";

function rand_int(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export default abstract class Sampler {
  num_samples: number;
  num_sets: number;
  count: number;
  jump: number;
  samples: Point2D[];
  shuffled_indices: number[];

  constructor(num_samples: number = 1, num_sets: number = 83) {
    this.num_samples = num_samples;
    this.num_sets = num_sets;
    this.count = 0;
    this.jump = 0;
    this.samples = new Array<Point2D>();
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
}
