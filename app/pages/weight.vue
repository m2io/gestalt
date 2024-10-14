<script setup lang="ts">
import type { WeightEntry } from '@/types/weight'

const weightStore = useWeightStore()

const selectedWeightEntry = ref<WeightEntry | null>(null)
const showWeightForm = ref(false)

function onOpenWeightForm() {
	selectedWeightEntry.value = null
	showWeightForm.value = true
}

async function onWeightFormSubmit(weightEntry: WeightEntry) {
	await weightStore.upsertWeight(weightEntry)
	showWeightForm.value = false
}

function onSelectEntry(weightEntry: WeightEntry) {
	selectedWeightEntry.value = weightEntry
	showWeightForm.value = true
}

async function onDeleteEntry(weightEntry: WeightEntry) {
	await weightStore.deleteWeight(weightEntry)
}
</script>

<template>
	<article class="relative">
		<AppButton @click="onOpenWeightForm">
			<AppIcon
				name="material-symbols-add-rounded"
				class="-ml-2 mr-2"
			/>
			Add weight entry
		</AppButton>

		<WeightList
			:items="weightStore.parsedWeightHistory"
			@select-weight="onSelectEntry"
			@delete-weight="onDeleteEntry"
		/>

		<LazyAppDrawer v-model="showWeightForm">
			<WeightForm
				:selected-weight-entry="selectedWeightEntry"
				:weight-entry-dates-set="weightStore.entryDates"
				@submit="onWeightFormSubmit"
			/>
		</LazyAppDrawer>
	</article>
</template>
