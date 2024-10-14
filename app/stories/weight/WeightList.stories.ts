import type { Meta, StoryObj } from '@storybook/vue3'
import WeightList from '@/components/weight/WeightList.vue'
import { fn } from '@storybook/test'
import dayjs from 'dayjs'

const meta = {
	title: 'Weight / List',
	component: WeightList,
	parameters: {
		layout: 'centered',
	},
	args: {
		onSelectWeight: fn(),
		onDeleteWeight: fn(),
	},
} as Meta<typeof WeightList> // Typecast with "as" to avoid issue with generic vue component - https://github.com/storybookjs/storybook/issues/24238

export default meta

type Story = StoryObj<typeof WeightList>

export const Default: Story = {
	render: (args) => ({
		components: { WeightList },
		setup() {
			const weightStore = useWeightStore()
			const weights = []
			const baseWeight = 127.5
			const fluctuationRange = 7.5
			let currentWeight = baseWeight
			let daysUnchanged = 0

			for (let i = 0; i < 25; i++) {
				if (daysUnchanged >= 2 || Math.random() > 0.3) { // 70% chance to change weight if unchanged for less than 2 days
					const fluctuation = (Math.random() * 2 - 1) * fluctuationRange
					currentWeight = Math.round((currentWeight + fluctuation) * 10) / 10
					currentWeight = Math.max(120, Math.min(135, currentWeight))
					daysUnchanged = 0
				} else {
					daysUnchanged++
				}

				weights.push({
					id: i,
					weight: currentWeight,
					date: dayjs().subtract(i, 'day').format('YYYY-MM-DD'),
				})
			}
			weightStore.weightEntries = weights

			return { args, weightStore }
		},
		template: `<WeightList v-bind="args" :items="weightStore.parsedWeightHistory" />`,
	}),
}
