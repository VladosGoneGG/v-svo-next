import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Настройки для автоматических импортов
	{
		plugins: {
			import: importPlugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		rules: {
			// Автоматически сортировать импорты
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
						},
						{
							pattern: '@components/**',
							group: 'internal',
						},
						{
							pattern: '@ui/**',
							group: 'internal',
						},
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			// Автоматически исправлять пути
			'import/no-useless-path-segments': 'error',
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
])

export default eslintConfig
