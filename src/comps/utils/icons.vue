<template lang="pug">
	//- wrapping in a icon so i can use font-size to scale 
	i 
		ic(:icon="icon" :size="size")
</template>

<script>
	import { library } from '@fortawesome/fontawesome-svg-core'
	import { faBomb, faCat, faLongArrowAltLeft, faLongArrowAltUp, faLongArrowAltDown, faFeatherAlt, faCog, faUserTie, faMoneyCheckAlt, faChartPie, faDolly, faAddressCard, faTv, faTimes, faAngleUp, faPenNib, faEnvelope, faLock, faShieldAlt, faSignOutAlt, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
	import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
	import { faGithub, faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
	import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
	import { Vue, Component, Prop } from 'vue-property-decorator'

	library.add(
		faBomb,
		faTimes,
		faAngleUp,
		faPenNib,
		faGithub,
		faGoogle,
		faFacebookF,
		faTwitter,
		faEnvelope,
		faLock,
		faEye,
		faEyeSlash,
		faShieldAlt,
		faSignOutAlt,
		faAngleDoubleLeft,
		faAngleDoubleRight,
		faChartPie,
		faDolly,
		faAddressCard,
		faTv,
		faCog,
		faMoneyCheckAlt,
		faUserTie,
		faFeatherAlt,
		faLongArrowAltUp,
		faLongArrowAltLeft,
		faLongArrowAltDown,
		faCat)

	@Component({
		components: {
			ic: FontAwesomeIcon,
		}
	})
	export default class Icons extends Vue {
		@Prop(String) fas
		@Prop(String) fab
		@Prop(String) far
		@Prop({ default: 'sm' }) size

		get icon() {
			return ['fas', 'far', 'fab'].map(e => [e, this[e]]).find(e => e[1])
		}
	}
</script>