<i18n>
en:
    text: "Clic the logo! Use chrome if you see a grey background!"
    ok: "Got it!"
    infos: "Fuck off"
fr:
    text: "Clic the logo! Use chrome if you see a grey background!"
    ok: "Got it!"
    infos: "Fuck off"
</i18n>

<template lang="pug">
    toast.cookies(v-if="show" pos="top-full")
        p(v-t="'text'")
        span(@click="accept()" v-t="'ok'")
        router-link(to="legal" v-t="'infos'" aria-label="Legal")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

const key = 'donuts'

@Component({
  components: {
    toast: () => import('@cmp/modals/toast.vue')
  }
})
export default class Cookies extends Vue {
  show = false
  mounted() {
    this.show = !localStorage.getItem(key)
  }

  accept() {
    localStorage.setItem(key, 'true')
    this.show = false
  }
}
</script>

<style lang="stylus" scoped>
.cookies
  p
    font-weight 600
    font-size .875em
    color silver
    padding-right 1em

  span, a
    text-transform uppercase
    font-weight 800
    color #1976D2
    padding 0 .5em
    cursor pointer
    transition all 200ms

    &:hover
      color #2196F3

  a
    opacity .7
</style>
