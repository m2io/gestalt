import type { Meta, StoryObj } from '@storybook/vue3'
import AppGenericList from '@/components/app/AppGenericList.vue'

export default {
	title: 'App / GenericList',
	component: AppGenericList,
	parameters: {
		layout: 'centered',
	},
} as Meta<typeof AppGenericList> // Typecast with "as" to avoid issue with generic vue component

type Story = StoryObj<typeof AppGenericList>

interface TestItem {
	id: number
	name: string
	description: string
}

const testItems: TestItem[] = [
	{ id: 1, name: 'Item 1', description: 'Description for Item 1' },
	{ id: 2, name: 'Item 2', description: 'Description for Item 2' },
	{ id: 3, name: 'Item 3', description: 'Description for Item 3' },
]

const Template: Story = {
	render: (args) => ({
		components: { AppGenericList },
		setup() {
			return { args }
		},
		template: `
      <div class="w-80">
        <AppGenericList v-bind="args">
          <template #content="{ item }">
            <div>
              <h3 class="font-bold">{{ item.name }}</h3>
              <p class="text-sm text-zinc-400">{{ item.description }}</p>
            </div>
          </template>
        </AppGenericList>
      </div>
    `,
	}),
}

export const Default: Story = {
	...Template,
	args: {
		items: testItems,
	},
}

export const Sortable: Story = {
	...Template,
	args: {
		items: testItems,
		sortable: true,
	},
}

export const DisabledDelete: Story = {
	...Template,
	args: {
		items: testItems,
		disableDelete: true,
	},
}
