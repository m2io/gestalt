import type { Meta, StoryObj } from '@storybook/vue3'
import AppNumericStepper from '@/components/app/AppNumericStepper.vue'

const meta = {
	title: 'App / Stepper',
	component: AppNumericStepper,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof AppNumericStepper>

export default meta

type Story = StoryObj<typeof meta>

export const NumericStepper: Story = {
	render: (args) => ({
		components: { AppNumericStepper },
		setup() {
			const value = ref(80)
			return { args, value }
		},
		template: `<div class="w-64"><AppNumericStepper v-bind="args" v-model="value" /></div>`,
	}),
	args: {
		modelValue: 80,
		label: 'Weight',
		min: 40,
		max: 200,
		steps: 1,
		valueUnit: 'kg',
	},
}
