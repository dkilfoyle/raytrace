export default class RGBColor {
  /**
   * RGB Color functions
   * @param r red
   * @param g green
   * @param b blue
   */
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  clone(): RGBColor {
    return new RGBColor(this.r, this.g, this.b);
  }

  product(otherVector: RGBColor): RGBColor {
    this.r *= otherVector.r;
    this.g *= otherVector.g;
    this.b *= otherVector.b;
    return this;
  }

  multiply(scalarValue: number): RGBColor {
    this.r *= scalarValue;
    this.g *= scalarValue;
    this.b *= scalarValue;
    return this;
  }

  add(otherVector: RGBColor): RGBColor {
    this.r += otherVector.r;
    this.g += otherVector.g;
    this.b += otherVector.b;
    return this;
  }

  subtract(otherVector: RGBColor): RGBColor {
    this.r -= otherVector.r;
    this.g -= otherVector.g;
    this.b -= otherVector.b;
    return this;
  }

  maxToOne(): RGBColor {
    var maxValue = Math.max(this.r, Math.max(this.g, this.b));
    if (maxValue > 1) {
      return this.multiply(1.0 / maxValue);
    } else {
      return this;
    }
  }
}
