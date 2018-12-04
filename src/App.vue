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
          <image-canvas ref="imageCanvas"></image-canvas>
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
import MyWorld from "./Raytrace/MyWorldOrtho";

@Component({
  components: {
    ImageCanvas
  }
})
export default class App extends Vue {
  $refs!: {
    imageCanvas: ImageCanvas;
  };
  onRayTraceButton() {
    let myWorld = new MyWorld();
    myWorld.build();
    myWorld.render_scene(this.$refs.imageCanvas);

    // create ray tracer
    // var rayTracer = new RayTracer(backgroundColor, scene);
    // let buffer = rayTracer.render(200, 200, 0, 200);

    // this.$refs.imageCanvas.drawBuffer(buffer);
    // (<ImageCanvas>this.$refs.imageCanvas)
    // .drawBuffer(buffer);
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
