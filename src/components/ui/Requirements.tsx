import RequirementsClient from '@/components/ui/RequirementsClient'

const DEFAULT_TITLE = 'Требования и условия для службы по контракту'
const DEFAULT_INTRO_TEXT =
	'Мы заранее проверим вашу годность, условия ВВК и подскажем, какие документы нужны для допуска к контракту. Консультация бесплатная'

export type RequirementsProps = {
	title?: string
	text?: string
}

export default function Requirements(props: RequirementsProps) {
	const finalTitle = props.title ?? DEFAULT_TITLE
	const finalText = props.text ?? DEFAULT_INTRO_TEXT

	return <RequirementsClient title={finalTitle} text={finalText} />
}
