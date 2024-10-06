<script setup lang="ts">
window.addEventListener('contextmenu', (event) => {
	if ((event as PointerEvent).pointerType === 'touch') {
		event.preventDefault()
	}
})

const { loadDatabase } = useDatabase()
const weightStore = useWeightStore()
onMounted(async () => {
	try {
		await loadDatabase()
		await weightStore.getWeights()
	} catch (err) {
		console.error('[App.vue] Failed to initialize:', err)
		// TODO: Implement proper error handling
	}
})
</script>

<template>
	<NuxtRouteAnnouncer />
	<AppIconSprite />
	<main class="flex-1 flex flex-col p-4">
		<NuxtPage />
	</main>
	<AppNavigation />
</template>
