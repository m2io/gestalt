export const useAppStore = defineStore(
	'App Store',
	() => {
		const currentOpenItem = ref<string | null>(null)
		const dropdownCounter = ref(0)

		return {
			dropdownCounter,
			currentOpenItem,
		}
	},
)
