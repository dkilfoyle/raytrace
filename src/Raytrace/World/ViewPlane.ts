export default class ViewPlane {
  num_samples: number;
  constructor(public hres: number, public vres: number, public s: number) {
    this.num_samples = 1;
  }
}
