<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <h2>Ray Tracer</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <image-canvas ref="imageCanvas" @onImageClick="onImageClick"></image-canvas>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button type="button" @click="onRayTraceButton">Ray Trace</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ImageCanvas from "./components/ImageCanvas.vue";
import MyWorldOrtho from "./Raytrace/MyWorldOrtho";
import MyWorldPerspective from "./Raytrace/MyWorldPerspective";

@Component({
  components: {
    ImageCanvas
  }
})
export default class App extends Vue {
  myWorld = new MyWorldPerspective();
  $refs!: {
    imageCanvas: ImageCanvas;
  };
  onRayTraceButton() {
    this.$refs.imageCanvas.clearScreen();
    this.myWorld.build();
    this.myWorld.render_scene(this.$refs.imageCanvas);
  }
  onImageClick(e: MouseEvent) {
    this.myWorld.render_pixel(
      this.$refs.imageCanvas,
      e.offsetX,
      this.$refs.imageCanvas.h - e.offsetY - 1
    );
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
