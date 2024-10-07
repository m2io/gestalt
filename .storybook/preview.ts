import AppSvgSprite from '../app/components/app/AppIconSprite.vue'
import '../app/assets/styles/app.css'

export default {
	decorators: [
		(story) => ({
			components: { story, AppSvgSprite },
			template: '<div><AppSvgSprite /><story /></div>',
		}),
	],
}
