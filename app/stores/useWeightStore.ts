import type { WeightEntry, WeightProgress } from '@/types/weight'
import dayjs from 'dayjs'

export const useWeightStore = defineStore('weightStore', () => {
	const { getConnection } = useDatabase()
	const weightStoreIsLoading = ref(false)
	const weightEntries = ref<WeightEntry[]>([])

	const parsedWeightHistory = computed<WeightEntry[]>(() => {
		const sortedEntries = [...weightEntries.value].sort((a, b) =>
			dayjs(b.date).diff(dayjs(a.date)),
		)

		return sortedEntries.map((entry, index) => {
			const weight_display = `${entry.weight} kg`
			const date_display = dayjs(entry.date).format('MMM D, YYYY')
			let progress: WeightProgress = 'same'

			if (index < sortedEntries.length - 1) {
				const nextEntry = sortedEntries[index + 1]
				if (nextEntry) {
					if (entry.weight > nextEntry.weight) {
						progress = 'decrease'
					} else if (entry.weight < nextEntry.weight) {
						progress = 'increase'
					}
				}
			}

			return {
				...entry,
				weight_display,
				date_display,
				progress,
			}
		})
	})

	const mappedEntryDates = computed(() => {
		const dates = {} as Record<string, WeightEntry>

		for (const entry of weightEntries.value) {
			dates[entry.date] = entry
		}

		return dates
	})

	const entryDates = computed(() => new Set(Object.keys(mappedEntryDates.value)))

	async function getWeights() {
		weightStoreIsLoading.value = true
		try {
			const db = getConnection()
			weightEntries.value = await db.select('SELECT * FROM weights')
		} catch (error) {
			console.error('Failed to fetch weights:', error)
			// TODO: Consider adding error handling or notification here
		} finally {
			weightStoreIsLoading.value = false
		}
	}

	async function upsertWeight(weightEntry: WeightEntry) {
		weightStoreIsLoading.value = true

		try {
			const db = getConnection()
			await db.execute('INSERT INTO weights (weight, date) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET weight = excluded.weight', [weightEntry.weight, weightEntry.date])

			const newWeight: WeightEntry = {
				weight: weightEntry.weight,
				date: weightEntry.date,
			}

			const index = weightEntries.value.findIndex((entry) => entry.date === newWeight.date)
			if (index !== -1) {
				weightEntries.value[index] = newWeight
			} else {
				weightEntries.value.push(newWeight)
			}

			return { data: newWeight, error: null }
		} catch (err) {
			console.error('Failed to create weight:', err)
			return {
				data: null,
				error: err instanceof Error ? err : new Error(String(err)),
			}
		} finally {
			weightStoreIsLoading.value = false
		}
	}

	async function deleteWeight(weightEntry: WeightEntry) {
		weightStoreIsLoading.value = true

		try {
			const db = getConnection()
			await db.execute('DELETE FROM weights WHERE date = ?', [weightEntry.date])
			weightEntries.value = weightEntries.value.filter((entry) => entry.date !== weightEntry.date)
		} catch (err) {
			console.error('Failed to delete weight:', err)
			return {
				data: null,
				error: err instanceof Error ? err : new Error(String(err)),
			}
		} finally {
			weightStoreIsLoading.value = false
		}
	}

	return {
		weightStoreIsLoading,
		weightEntries,
		parsedWeightHistory,
		mappedEntryDates,
		entryDates,
		getWeights,
		upsertWeight,
		deleteWeight,
	}
})
