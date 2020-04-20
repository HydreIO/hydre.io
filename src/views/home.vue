<i18n>
en:
    hello: "Hello World"
fr:
    hello: "Bonjour Morray"
</i18n>

<template lang="pug">
  main
    flat-surface-shader.shader(type="webgl" :light="light" :mesh="mesh")
    audio(ref="audio" src="@rs/guetta.mp3" type="audio/mpeg" loop)
    .texture
    a(href="https://github.com/HydreIO" target="_blank")
      fa.topr(fab="github" size="lg")
    .arrow(:class="{seek: !bounce }")
      span Click me
      fa(fas="long-arrow-alt-down" size="lg" )
    .text(:class="{bounce}" @click="resume()")
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
  bounce = false;

  mounted() {
    setTimeout(() => {
      this.$toasted.show(
        "Hey! if you doesn't see a purple background then Webgl is not enabled in your browser, if you use safari then deal with it 🐕"
      );
    }, 1000);
  }

  resume() {
    this.bounce = true;
    const self = this;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const audioElement = self.$refs.audio;
      audioElement.play();
      const track = audioContext.createMediaElementSource(audioElement);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1;
      track.connect(gainNode);
      gainNode.connect(audioContext.destination);
      audioContext.resume();
    } catch (error) {}
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
  flex-flow column nowrap
  align-items center
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

  .arrow
    position relative
    transition opacity 500ms
    opacity 0
    display flex
    flex-flow column nowrap
    justify-content center
    align-items center
    padding-bottom 1em

    span
      font-family 'sweet-retro'
      font-weight 300
      font-size 1.5em

  .text
    position relative
    display flex
    justify-content center
    align-items center
    flex-flow column nowrap
    height max-content
    cursor pointer
    z-index 1
    opacity .7

    &.bounce
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

@keyframes seek
  from, 20%, 53%, 80%, to
    animation-timing-function cubic-bezier(.215, .61, .355, 1)
    transform translate3d(0, 0, 0)

  40%, 43%
    animation-timing-function cubic-bezier(.755, .05, .855, .06)
    transform translate3d(0, -30px, 0)

  70%
    animation-timing-function cubic-bezier(.755, .05, .855, .06)
    transform translate3d(0, -15px, 0)

  90%
    transform translate3d(0, -4px, 0)

.seek
  animation seek 5s infinite
  transform-origin center bottom
  opacity .7 !important
</style>

