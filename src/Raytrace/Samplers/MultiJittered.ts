import Sampler from "./Sampler";
import Point2D from "../Math/Point2D";

export default class MultiJittered extends Sampler {
  constructor(num_samples = 25) {
    super(num_samples);
    this.generate_samples();
  }
  generate_samples() {
    let n: number = Math.sqrt(this.num_samples);
    let subcell_width: number = 1.0 / this.num_samples;

    // fill the samples array with dummy points to allow us to use the [ ] notation
    for (let j = 0; j < this.num_samples * this.num_sets; j++)
      this.samples.push(new Point2D());

    // distribute points in the initial patterns
    for (let p = 0; p < this.num_sets; p++)
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) {
          this.samples[i * n + j + p * this.num_samples].x =
            (i * n + j) * subcell_width + Math.random() * subcell_width;
          this.samples[i * n + j + p * this.num_samples].y =
            (j * n + i) * subcell_width + Math.random() * subcell_width;
        }

    this.shuffle_x_coordinates();
    this.shuffle_y_coordinates();
  }
}
