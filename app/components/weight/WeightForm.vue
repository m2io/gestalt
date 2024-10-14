<script setup lang="ts">
import dayjs from 'dayjs'
import type { WeightEntry } from '~/types/weight'

const { selectedWeightEntry, weightEntryDatesSet = new Set<string>() } = defineProps<{
	selectedWeightEntry?: WeightEntry | null
	weightEntryDatesSet: Set<string>
}>()

const emits = defineEmits<{
	submit: [WeightEntry]
}>()

const weightEntry = ref<WeightEntry>({
	weight: 80,
	date: dayjs().format('YYYY-MM-DD'),
})

watch(
	() => selectedWeightEntry,
	(selectedEntry) => {
		if (selectedEntry) {
			weightEntry.value = { ...selectedEntry }
		}
	},
	{
		immediate: true,
	},
)

const showConfirmOverwrite = ref(false)
function onSubmit(overwrite: boolean) {
	if (weightEntryDatesSet.has(weightEntry.value.date) && !overwrite) {
		showConfirmOverwrite.value = true
		return
	}
	showConfirmOverwrite.value = false
	emits('submit', weightEntry.value)
}
</script>

<template>
	<form
		class="flex flex-col space-y-4"
		@submit.prevent="onSubmit(false)"
	>
		<AppNumericStepper
			v-model="weightEntry.weight"
			label="Weight"
			:display-value="weightEntry.weight % 1 === 0 ? `${weightEntry.weight}.0` : weightEntry.weight"
		/>

		<AppDatepickerInput
			v-model="weightEntry.date"
			:highlighted-dates="weightEntryDatesSet"
			:disabled="!!selectedWeightEntry?.date"
		/>
		<AppButton
			type="submit"
			class="!mt-12 w-full"
		>
			{{ selectedWeightEntry ? "Update your weight" : "Add new entry" }}
		</AppButton>

		<AppDrawer v-model="showConfirmOverwrite">
			<h1 class="mb-1 text-2xl font-semibold">
				Update existing entry?
			</h1>
			<p class="text-lg">
				You are about to change your weight entry on
				<span class="font-semibold">{{ dayjs(weightEntry.date).format("ddd, DD.MM.YYYY") }}</span>.
			</p>
			<p class="text-lg">
				From
				<span class="font-semibold">{{
					selectedWeightEntry?.weight_display
				}}</span>
				to <span class="font-semibold">{{ weightEntry.weight }}kg</span>
			</p>

			<div class="mt-8 flex flex-col gap-y-4">
				<AppButton
					type="button"
					class="w-full"
					@click="onSubmit(true)"
				>
					Yes, overwrite
				</AppButton>
				<AppButton
					type="button"
					class="w-full"
					@click="showConfirmOverwrite = false"
				>
					No, cancel
				</AppButton>
			</div>
		</AppDrawer>
	</form>
</template>
