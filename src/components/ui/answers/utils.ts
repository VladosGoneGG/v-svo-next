import type { QuizStep, QuizStepField } from './steps'

export type OptionsLabelMap = Record<QuizStepField, Record<string, string>>

export function makeOptionsLabelMap(
	steps: readonly QuizStep[],
): OptionsLabelMap {
	const map = {} as OptionsLabelMap

	for (const step of steps) {
		const perStep: Record<string, string> = {}
		for (const opt of step.options) {
			perStep[opt.id] = opt.label
		}
		map[step.field] = perStep
	}

	return map
}
