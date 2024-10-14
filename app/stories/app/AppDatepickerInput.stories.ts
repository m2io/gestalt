import type { Meta, StoryObj } from '@storybook/vue3'
import AppDatepickerInput from '@/components/app/AppDatepickerInput.vue'
import dayjs from 'dayjs'

export default {
	title: 'App/DatepickerInput',
	component: AppDatepickerInput,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof AppDatepickerInput>

type Story = StoryObj<typeof AppDatepickerInput>

const Template: Story = {
	render: (args) => ({
		components: { AppDatepickerInput },
		setup() {
			return { args }
		},
		template: '<AppDatepickerInput v-bind="args" />',
	}),
}

export const Default: Story = {
	...Template,
	args: {
		modelValue: dayjs().format('YYYY-MM-DD'),
	},
}
