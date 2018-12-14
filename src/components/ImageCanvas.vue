<template>
  <canvas id="canvas" ref="canvas" :height="h" :width="w" @click="onClick"></canvas>
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

  clearScreen() {
    this.screen = this.ctx.createImageData(this.w, this.h);
    this.screen.data.fill(0);
  }

  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.clearScreen();
  }

  onClick(e: MouseEvent) {
    // pass offsetX and offsetY as event to App.vue for sending to world
    this.$emit("onImageClick", e);
  }

  draw_pixel(x: number, y: number, r: number, g: number, b: number): void {
    // apply gamma correction for linear brightness
    let gamma = 2.2;
    let invGamma = 1 / 2.2;

    let index = (x + y * this.screen.width) * 4;
    if (x < 5 && y < 5) {
      this.screen.data[index + 0] = 200;
      this.screen.data[index + 1] = 0;
      this.screen.data[index + 2] = 0;
      this.screen.data[index + 3] = 255;
    } else {
      this.screen.data[index + 0] = Math.pow(r, invGamma) * 255;
      this.screen.data[index + 1] = Math.pow(g, invGamma) * 255;
      this.screen.data[index + 2] = Math.pow(b, invGamma) * 255;
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
