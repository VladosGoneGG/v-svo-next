export const SITE_CONFIG = {
	domain: 'https://v-svo.ru',
	brandName: 'В СВО',
	organizationName: 'В СВО',
	locale: 'ru_RU',
	brandSuffix: ' — В СВО',
	// лучше хранить как путь, а не абсолют — меньше шансов на рассинхрон окружений
	logoPath: '/logo.png',
	sameAs: [] as string[],
} as const
