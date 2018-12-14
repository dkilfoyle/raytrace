import Sampler from "../Samplers/Sampler";
import MultiJittered from "../Samplers/MultiJittered";
import Regular from "../Samplers/Regular";

export default class ViewPlane {
  num_samples: number;
  sampler: Sampler;
  hres: number;
  vres: number;
  s: number;
  // s = pixel size. viewplane will be hres*s by vres*s in size
  constructor(hres: number, vres: number, s: number, samples = 1) {
    this.hres = hres;
    this.vres = vres;
    this.s = s;
    this.num_samples = samples;
    if (this.num_samples === 1) this.sampler = new Regular(1);
    else this.sampler = new MultiJittered(25);
  }
}
