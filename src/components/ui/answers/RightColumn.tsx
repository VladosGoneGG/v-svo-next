import ArtemCard from '@/components/ui/answers/ArtemCard'
import NavButtons from '@/components/ui/answers/NavButtons'

import type { RightColumnProps } from './types'

export default function RightColumn({
	artemText,
	step,
	isContacts,
	canNextQuiz,
	canSubmit,
	isSubmitting,
	onBack,
	onNext,
}: RightColumnProps) {
	return (
		<div className='order-1 md:order-2 flex w-full flex-col gap-5 md:max-w-[405px]'>
			<ArtemCard text={artemText} />

			<NavButtons
				step={step}
				isContacts={isContacts}
				canNextQuiz={canNextQuiz}
				canSubmit={canSubmit}
				isSubmitting={isSubmitting}
				onBack={onBack}
				onNext={onNext}
			/>
		</div>
	)
}
