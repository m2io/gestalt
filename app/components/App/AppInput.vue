<script setup lang="ts">
const { placeholder, type = 'text', readonly = false, disabled = false } = defineProps<{
	label?: string
	placeholder?: string
	type?: string
	readonly?: boolean
	disabled?: boolean
	id?: string
	minlength?: string
}>()

const modelValue = defineModel<string>()
const hasFocus = ref(false)

function onFocusIn() {
	if (readonly) {
		return
	}
	hasFocus.value = true
}

function onFocusOut() {
	if (readonly) {
		return
	}
	hasFocus.value = false
}
</script>

<template>
	<label
		:for="id"
		class="inline-block"
		:class="{
			'opacity-50': disabled,
		}"
	>
		<span
			class="mb-1 inline-block w-full text-[11px] font-semibold uppercase tracking-wide text-zinc-500 empty:hidden"
		>
			{{ label }}
		</span>
		<input
			:id="id"
			v-model="modelValue"
			class="
				h-12
				w-full
				rounded-md
				border
				border-zinc-200
				bg-transparent
				px-4
				py-2
				text-lg
				text-zinc-50
				caret-zinc-200
				placeholder:text-zinc-500
				read-only:outline-none
			"
			:class="{
				'border-zinc-50': !hasFocus,
				'outline-2 outline-zinc-400 outline-offset-2': hasFocus,
			}"
			:type="type"
			:placeholder="placeholder"
			:readonly="readonly"
			:disabled="disabled"
			:minlength="minlength"
			@focusin="onFocusIn"
			@focusout="onFocusOut"
		>
	</label>
</template>
