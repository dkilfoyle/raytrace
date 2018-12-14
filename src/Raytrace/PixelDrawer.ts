export default interface PixelDrawer {
  w: number;
  h: number;
  draw_pixel(x: number, y: number, r: number, g: number, b: number): void;
  draw_screen(): void;
}
