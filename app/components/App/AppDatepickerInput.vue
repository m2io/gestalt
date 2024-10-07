<script setup lang="ts">
import dayjs from 'dayjs'

const { highlightedDates = new Set(), disabled = false, disableFutureDates = false, disablePastDates = false } = defineProps<{
	highlightedDates?: Set<string>
	disabled?: boolean
	disableFutureDates?: boolean
	disablePastDates?: boolean
}>()

const modelValue = defineModel<string>()
const showDatepicker = ref(false)

function openDatepicker() {
	if (disabled) {
		return
	}
	showDatepicker.value = true
}

function onSetDate() {
	showDatepicker.value = false
}

const displayValue = computed(() => {
	return dayjs(modelValue.value).format('DD.MM.YYYY')
})
</script>

<template>
	<AppInput
		v-model="displayValue"
		type="text"
		label="Date"
		readonly
		:disabled="disabled"
		@click="openDatepicker"
	/>

	<AppDrawer
		v-model="showDatepicker"
	>
		<AppDatepicker
			v-model="modelValue"
			:highlighted-dates="highlightedDates"
			:disable-future-dates="disableFutureDates"
			:disable-past-dates="disablePastDates"
			@set-date="onSetDate"
		/>
	</AppDrawer>
</template>
