import Sampler from "./Sampler";
import Point2D from "../Math/Point2D";

export default class Jittered extends Sampler {
  constructor() {
    super();
    this.generate_samples();
  }
  generate_samples() {
    let n: number = Math.sqrt(this.num_samples);

    for (let j = 0; j < this.num_sets; j++)
      for (let p = 0; p < n; p++)
        for (let q = 0; q < n; q++)
          this.samples.push(
            new Point2D((q + Math.random()) / n, (p + Math.random()) / n)
          );
  }
}
