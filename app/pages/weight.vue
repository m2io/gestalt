<script setup lang="ts">
const weightStore = useWeightStore()
</script>

<template>
	<article>
		<h1>Weight</h1>
		<ul>
			<li
				v-for="weight in weightStore.weightEntries"
				:key="weight.id"
			>
				{{ weight.date }} - {{ weight.weight }}
			</li>
		</ul>
	</article>
</template>
