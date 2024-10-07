import type { Meta, StoryObj } from '@storybook/vue3'
import AppInput from '@/components/app/AppInput.vue'

const meta = {
	title: 'App / Input',
	component: AppInput,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'password', 'email', 'number'],
		},
	},
} satisfies Meta<typeof AppInput>

export default meta

type Story = StoryObj<typeof meta>

const Template: Story = {
	render: (args) => ({
		components: { AppInput },
		setup() {
			return { args }
		},
		template: '<AppInput v-bind="args" />',
	}),
}

export const Default: Story = {
	...Template,
	args: {
		placeholder: 'Enter text...',
	},
}

export const WithLabel: Story = {
	...Template,
	args: {
		label: 'Username',
		placeholder: 'Enter your username',
	},
}

export const Password: Story = {
	...Template,
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
	},
}

export const Disabled: Story = {
	...Template,
	args: {
		label: 'Disabled Input',
		placeholder: 'This input is disabled',
		disabled: true,
	},
}

export const ReadOnly: Story = {
	...Template,
	args: {
		label: 'Read-only Input',
		modelValue: 'This is read-only text',
		readonly: true,
	},
}
