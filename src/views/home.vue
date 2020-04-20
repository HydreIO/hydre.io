<i18n>
en:
    hello: "Hello World"
fr:
    hello: "Bonjour Morray"
</i18n>

<template lang="pug">
  main(@click="resume()")
    flat-surface-shader.shader(type="webgl" :light="light" :mesh="mesh")
    audio(ref="audio" src="@rs/guetta.mp3" type="audio/mpeg" autoplay loop)
    .texture
    a(href="https://github.com/HydreIO" target="_blank")
      fa.topr(fab="github" size="lg")
    .text
      hydre.svg
      span Hydre
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    loading: () => import("@cmp/utils/loading.vue"),
    hydre: () => import("@svg/hydre.svg")
  }
})
export default class Home extends Vue {
  AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();

  mounted() {
    const audioElement = this.$refs.audio;
    const track = this.audioContext.createMediaElementSource(audioElement);
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.1;
    track.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
  }

  resume() {
    const self = this;
    setTimeout(() => {
      self.audioContext.resume();
    }, 10);
  }

  light = {
    count: 2,
    xyScalar: 1,
    zOffset: 360,
    ambient: "#1976d2",
    diffuse: "#5e35b1",
    speed: 0.005,
    autopilot: true,
    draw: true
  };

  mesh = {
    width: 1.2,
    height: 1.2,
    depth: 0,
    segments: 20,
    slices: 10,
    xRange: 0.07,
    yRange: 0.13,
    ambient: "#212121",
    diffuse: "#ffffff",
    speed: 0.0022
  };
}
</script>


<style lang="stylus" scoped>
@font-face
  font-family 'sweet-retro'
  src url('~@rs/sweet-retro.ttf')

main
  width 100%
  height 100vh
  display flex
  justify-content center
  position relative
  user-select none
  overflow hidden

  a
    position absolute
    top 1em
    right 1em
    z-index 1
    opacity .4
    cursor pointer
    color inherit

  .shader
    position absolute
    width 100%
    height 100vh

  .texture
    position absolute
    z-index 1
    width 100%
    height 100vh
    background url('~@rs/broken-noise.png')

  .text
    position relative
    display flex
    justify-content center
    align-items center
    flex-flow column nowrap
    animation bounce .22s ease-in infinite alternate

    .svg
      width 80px
      height @width

    span
      font-size 5em
      transform rotate(-12deg)
      font-family 'sweet-retro'

@keyframes bounce
  from
    transform scale(1)

  to
    transform scale(1.05)
</style>

