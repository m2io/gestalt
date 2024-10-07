<script setup lang="ts">
const {
	variant = 'primary',
	disabled = false,
	to = null,
	iconName = null,
	iconSize = '28',
} = defineProps<{
	variant?: 'primary'
	disabled?: boolean
	to?: string
	iconName?: keyof typeof ICONS
	iconSize?: string
}>()

const isIconButton = computed(() => !!iconName)

const component = computed(() => {
	if (to) {
		return resolveComponent('NuxtLink')
	}

	return 'button'
})
</script>

<template>
	<component
		:is="component"
		:to="to"
		class="flex select-none items-center justify-center rounded-full font-semibold transition-colors duration-75"
		:class="{
			'bg-zinc-100 text-zinc-950 active:enabled:bg-zinc-200': variant === 'primary',
			'shrink-0 size-10': isIconButton,
			'h-12 px-6 text-lg': !isIconButton,
		}"
		:disabled="disabled"
	>
		<AppIcon
			v-if="iconName"
			:name="iconName"
			:size="iconSize"
		/>
		<slot></slot>
	</component>
</template>
