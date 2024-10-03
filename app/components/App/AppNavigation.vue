<script setup lang="ts">
interface IMenuItem {
	title: string
	link: string
	iconBase: keyof typeof ICONS
	iconActive: keyof typeof ICONS
}

const menuItems: IMenuItem[] = [
	{
		title: 'Home',
		link: '/',
		iconBase: 'material-symbols-home-outline-rounded',
		iconActive: 'material-symbols-home-rounded',
	},
	{
		title: 'Workouts',
		link: '/workouts',
		iconBase: 'material-symbols-exercise-outline',
		iconActive: 'material-symbols-exercise',
	},
	{
		title: 'Weight',
		link: '/weight',
		iconBase: 'material-symbols-monitor-weight-outline',
		iconActive: 'material-symbols-monitor-weight',
	},
]
</script>

<template>
	<nav
		class="fixed inset-x-0 bottom-0 z-50 grid h-[64px] items-center justify-center bg-zinc-900 px-4"
		:style="{
			gridTemplateColumns: `repeat(${menuItems.length}, 1fr)`,
		}"
	>
		<NuxtLink
			v-for="item in menuItems"
			:key="item.link"
			v-slot="{ isExactActive }"
			:to="item.link"
			class="relative flex flex-col items-center justify-center active:scale-90 transition-transform duration-150 ease-out"
		>
			<AppIcon
				:name="isExactActive ? item.iconActive : item.iconBase"
				size="26"
			/>
		</NuxtLink>
	</nav>
</template>
