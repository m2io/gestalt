import type { Meta, StoryObj } from '@storybook/vue3'
import WeightForm from '@/components/weight/WeightForm.vue'
import { fn } from '@storybook/test'
import dayjs from 'dayjs'

const meta = {
	title: 'Weight / Form',
	component: WeightForm,
	parameters: {
		layout: 'centered',
	},
	args: {
		onSubmit: fn(),
	},
} satisfies Meta<typeof WeightForm>

export default meta

type Story = StoryObj<typeof WeightForm>

const Template: Story = {
	render: (args) => ({
		components: { WeightForm },
		setup() {
			return { args }
		},
		template: `<WeightForm v-bind="args" />`,
	}),
}

export const Default: Story = {
	...Template,
	args: {
		selectedWeightEntry: null,
		weightEntryDatesSet: new Set<string>(),
	},
}

export const Overwrite: Story = {
	...Template,
	args: {
		selectedWeightEntry: null,
		weightEntryDatesSet: new Set<string>([dayjs().format('YYYY-MM-DD')]),
	},
}

export const OverwriteWithEntry: Story = {
	...Template,
	args: {
		selectedWeightEntry: {
			weight: 120,
			date: dayjs().format('YYYY-MM-DD'),
		},
		weightEntryDatesSet: new Set<string>([dayjs().format('YYYY-MM-DD')]),
	},
}
