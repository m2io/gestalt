export interface WeightEntry {
	weight: number
	date: string
	date_display?: string
	weight_display?: string
	progress?: 'increase' | 'decrease' | 'same'
}

export type WeightProgress = 'increase' | 'decrease' | 'same'
