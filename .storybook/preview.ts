import AppSvgSprite from '../app/components/app/AppIconSprite.vue'
import '../app/assets/styles/app.css'

export default {
	decorators: [
		(story) => ({
			components: { story, AppSvgSprite },
			template: '<div class="p-4"><AppSvgSprite /><story /></div>',
		}),
	],
}
