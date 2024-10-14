import type { WeightEntry, WeightProgress } from '@/types/weight'
import dayjs from 'dayjs'

export const useWeightStore = defineStore('weightStore', () => {
	const { getConnection } = useDatabase()
	const weightStoreIsLoading = ref(false)
	const weightEntries = ref<WeightEntry[]>([])

	const parsedWeightHistory = computed<WeightEntry[]>(() => {
		return weightEntries.value.map((entry, index) => ({
			...entry,
			weight_display: `${entry.weight} kg`,
			date_display: dayjs(entry.date).format('MMM D, YYYY'),
			progress: determineProgress(entry, index),
		}))
	})

	const mappedEntryDates = computed(() => {
		const dates = {} as Record<string, WeightEntry>

		for (const entry of weightEntries.value) {
			dates[entry.date] = entry
		}

		return dates
	})

	const entryDates = computed(() => Object.keys(mappedEntryDates.value))

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

	function determineProgress(entry: WeightEntry, index: number): WeightProgress {
		if (index === 0) {
			return 'same'
		}
		const lastEntry = weightEntries.value[index - 1]

		if (!lastEntry) {
			return 'same'
		}

		if (entry.weight > lastEntry.weight) {
			return 'increase'
		}

		if (entry.weight < lastEntry.weight) {
			return 'decrease'
		}

		return 'same'
	}

	async function upsertWeight(weightEntry: WeightEntry) {
		weightStoreIsLoading.value = true

		try {
			const db = getConnection()
			const result = await db.execute('INSERT INTO weights (weight, date) VALUES (?, ?) ON CONFLICT(date) DO UPDATE SET weight = excluded.weight', [weightEntry.weight, weightEntry.date])

			const newWeight: WeightEntry = {
				id: result.lastInsertId,
				weight: weightEntry.weight,
				date: weightEntry.date,
			}

			weightEntries.value.unshift(newWeight)

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

	return {
		weightStoreIsLoading,
		weightEntries,
		parsedWeightHistory,
		mappedEntryDates,
		entryDates,
		getWeights,
		upsertWeight,
	}
})
