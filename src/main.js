import Vue from 'vue'
import App from '@/App.vue'
import './registerServiceWorker'
import router from '@core/routes'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import store from '@core/stores'
import Icons from '@cmp/utils/icons.vue'
import i18n from '@core/i18n'


console.log('%c Hydre', 'color: #FF8F00;font-weight:bold;font-size:30px;')
console.log("%c Don't bother, we are open-source!", 'color: #FF8F00;font-size:18px;')
console.log('%c https://github.com/HydreIO/hydre.io', 'font-size:15px;')

Vue.config.productionTip = false

Vue.directive('rp', Ripple)
Vue.component('fa', Icons)
Vue.use(FlatSurfaceShader)
Vue.use(VueMq, {
	breakpoints: {
		sm: 813, // iphoneX max
		lg: Infinity,
	},
})

new Vue({
	router,
	i18n,
	methods: {
		// litle npm script to disable body scroll on all devices (because those IOS suckers think different)
		lockScroll: el => disableBodyScroll(el),
		unlockScroll: el => enableBodyScroll(el),
	},
	store,
	mounted() {
		SmoothScroll({
			animationTime: 700,
			accelerationDelta: 30,
			accelerationMax: 3,
		})
	},
	render: h => h(App),
}).$mount('#app')
