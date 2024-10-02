export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
			title: 'Gestalt',
		},
	},
	compatibilityDate: '2024-08-12',
	css: [
		'@/assets/styles/fonts/geist.css',
		'@/assets/styles/app.css',
	],
	devtools: { enabled: false },
	eslint: {
		config: {
			standalone: false,
		},
	},
	experimental: {
		typedPages: true,
	},
	future: {
		compatibilityVersion: 4,
	},
	modules: ['@nuxt/eslint'],
	postcss: {
		plugins: {
			'@tailwindcss/postcss': {},
		},
	},
	typescript: {
		strict: true,
	},

	// Tauri related config
	ssr: false,
	vite: {
		clearScreen: false,
		envPrefix: ['VITE_', 'TAURI_'],
		server: {
			strictPort: true,
			watch: {
				ignored: ['**/src-tauri/**'],
			},
		},
	},
})
