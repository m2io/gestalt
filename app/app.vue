<script setup lang="ts">
window.addEventListener('contextmenu', (event) => {
	if ((event as PointerEvent).pointerType === 'touch') {
		event.preventDefault()
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
