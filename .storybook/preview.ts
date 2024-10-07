import type { Preview } from '@storybook/vue3'
import AppSvgSprite from '../app/components/app/AppIconSprite.vue'
import '../app/assets/styles/app.css'

export default {
	parameters: {
		backgrounds: {
			default: 'Dark',
			values: [
				{
					name: 'Light',
					value: 'var(--color-zinc-50)',
				},
				{
					name: 'Dark',
					value: 'var(--color-zinc-900)',
				},
			],
		},
	},
	decorators: [
		(story) => ({
			components: { story, AppSvgSprite },
			template: '<div><AppSvgSprite /><story /></div>',
		}),
	],
	tags: ['autodocs'],
} satisfies Preview
