import Database from '@tauri-apps/plugin-sql'

const dbInstance = shallowRef<Database | null>(null)
const error = shallowRef<Error | null>(null)
const dbIsLoading = ref(false)

export function useDatabase() {
	async function loadDatabase() {
		if (dbInstance.value) {
			return dbInstance.value
		}

		dbIsLoading.value = true
		try {
			dbInstance.value = await Database.load(`sqlite:gestalt.db`)
			return dbInstance.value
		} catch (err) {
			console.error('Failed to load database:', err)
			error.value = err instanceof Error ? err : new Error(String(err))
			throw error.value
		} finally {
			dbIsLoading.value = false
		}
	}

	function getConnection() {
		if (!dbInstance.value) {
			throw new Error('Database not initialized. Call loadDatabase first.')
		}
		return dbInstance.value
	}

	return { loadDatabase, getConnection, dbIsLoading, error }
}
