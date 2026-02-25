export type StepOption = {
	id: string
	label: string
}

export const STEP1_OPTIONS = [
	{ id: 'army', label: 'Срочная служба' },
	{ id: 'contract_before', label: 'Контрактная служба (до СВО)' },
	{ id: 'contract_after', label: 'Контрактная служба (был на СВО)' },
	{ id: 'none', label: 'Не служил' },
] as const satisfies readonly StepOption[]

export const STEP2_OPTIONS = [
	{ id: 'fit', label: 'Годен, без ограничений' },
	{ id: 'minor_limits', label: 'Есть незначительные ограничения (ВС/ВУСН)' },
	{ id: 'chronic', label: 'Есть хронические заболевания' },
	{ id: 'dont_know', label: 'Затрудняюсь ответить' },
] as const satisfies readonly StepOption[]

export const STEP3_OPTIONS = [
	{ id: 'drive', label: 'Водительские права' },
	{ id: 'radio', label: 'Радиотехника' },
	{ id: 'tractor', label: 'Управление спецтехникой / трактором' },
	{ id: 'none', label: 'Нет специальной подготовки' },
] as const satisfies readonly StepOption[]

export const STEP4_OPTIONS = [
	{ id: 'vdv', label: 'ВДВ' },
	{ id: 'artillery', label: 'Артиллерия' },
	{ id: 'marines', label: 'Морская пехота' },
	{ id: 'motor', label: 'Мотострелковый полк' },
	{ id: 'uav', label: 'БПЛА' },
	{ id: 'logistics', label: 'Вождение / логистика' },
	{ id: 'recommend', label: 'Не знаю — нужны рекомендации' },
] as const satisfies readonly StepOption[]

export const STEP5_OPTIONS = [
	{ id: 'money', label: 'Максимальные выплаты и надбавки' },
	{ id: 'fast', label: 'Быстрое оформление и выезд' },
	{ id: 'unit', label: 'Поступление в конкретную часть' },
	{ id: 'training', label: 'Обучение перед службой' },
	{ id: 'home', label: 'Служба рядом с домом (если возможно)' },
] as const satisfies readonly StepOption[]

/**
 * Поля формы, которые используются в шагах квиза.
 */
export type QuizStepField =
	| 'military'
	| 'health'
	| 'spec'
	| 'interest'
	| 'priority'

export type QuizStep = {
	id: 1 | 2 | 3 | 4 | 5
	counter: string
	title: string
	artemText: string
	field: QuizStepField
	options: readonly StepOption[]
}

export const STEPS = [
	{
		id: 1,
		counter: '1/5',
		title: 'Ваш военный опыт',
		artemText: 'Этот вопрос помогает нам понять ваш опыт и подготовку',
		field: 'military',
		options: STEP1_OPTIONS,
	},
	{
		id: 2,
		counter: '2/5',
		title: 'Состояние здоровья',
		artemText:
			'В зависимости от состояния здоровья могут быть разные условия и требования',
		field: 'health',
		options: STEP2_OPTIONS,
	},
	{
		id: 3,
		counter: '3/5',
		title: 'Есть ли у вас специальности пригодные для службы?',
		artemText: 'Наличие водительских прав и спецподготовки будет преимуществом',
		field: 'spec',
		options: STEP3_OPTIONS,
	},
	{
		id: 4,
		counter: '4/5',
		title: 'Какие войска вам наиболее интересны?',
		artemText:
			'Нам важно учесть ваши желания. Если есть предпочтения — мы их учтем',
		field: 'interest',
		options: STEP4_OPTIONS,
	},
	{
		id: 5,
		counter: '5/5',
		title: 'Какие условия для вас наиболее важны?',
		artemText:
			'Мы поможем с выбором части, которая соответствует вашим ожиданиям',
		field: 'priority',
		options: STEP5_OPTIONS,
	},
] as const satisfies readonly QuizStep[]
