import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDatabase } from '../composables/useDatabase'

export interface WeightEntry {
	id: number
	weight: number
	date: string
}

export const useWeightStore = defineStore('weightStore', () => {
	const { getConnection } = useDatabase()
	const weightStoreIsLoading = ref(false)
	const weightEntries = ref<WeightEntry[]>([])

	async function getWeights() {
		const db = getConnection()
		const result = await db.select('SELECT * FROM weights') as WeightEntry[]
		weightEntries.value = result
	}

	async function createWeight(weight: number, date: string) {
		weightStoreIsLoading.value = true

		try {
			const db = getConnection()
			const result = await db.execute('INSERT INTO weights (weight, date) VALUES (?, ?)', [weight, date])

			const newWeight: WeightEntry = {
				id: result.lastInsertId,
				weight,
				date,
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
		getWeights,
		createWeight,
	}
})
