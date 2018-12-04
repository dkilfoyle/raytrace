<template>
  <canvas id="canvas" ref="canvas" :height="h" :width="w"></canvas>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import PixelDrawer from "../RayTrace/PixelDrawer";

@Component
export default class ImageCanvas extends Vue implements PixelDrawer {
  w: number = 200;
  h: number = 200;
  screen!: ImageData;
  ctx!: CanvasRenderingContext2D;

  $refs!: {
    canvas: HTMLCanvasElement;
  };

  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.screen = this.ctx.createImageData(this.w, this.h);
  }

  myrender(num: number) {}

  drawBuffer(buffer: ArrayBuffer): void {
    var buf8 = new Uint8ClampedArray(buffer);
    this.screen = this.ctx.getImageData(0, 0, this.w, this.h);
    this.screen.data.set(buf8);
    this.ctx.putImageData(this.screen, 0, 0);
  }

  draw_pixel(x: number, y: number, r: number, g: number, b: number): void {
    let index = (x + y * this.screen.width) * 4;
    if (x < 10 && y < 10) {
      this.screen.data[index + 0] = 200;
      this.screen.data[index + 1] = 0;
      this.screen.data[index + 2] = 0;
      this.screen.data[index + 3] = 255;
    } else {
      this.screen.data[index + 0] = r * 255;
      this.screen.data[index + 1] = g * 255;
      this.screen.data[index + 2] = b * 255;
      this.screen.data[index + 3] = 255;
    }
    this.ctx.putImageData(this.screen, 0, 0);
  }
}
</script>

<style scoped>
#canvas {
  border: 1px solid #d3d3d3;
}
</style>
