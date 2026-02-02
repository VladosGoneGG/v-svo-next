import { HashScroll } from '@/components/HashScroll'
import Answers from '@/components/ui/Answers'
import Benefits from '@/components/ui/Benefits'
import Compensations from '@/components/ui/Compensations'
import Consultation from '@/components/ui/Consultation'
import Equipment from '@/components/ui/Equipment'
import Feedback from '@/components/ui/Feedback'
import Foreigners from '@/components/ui/Foreigners'
import Hero from '@/components/ui/Hero'
import Papers from '@/components/ui/Papers'
import Possibilities from '@/components/ui/Possibilities'
import Questions from '@/components/ui/Questions'
import Requirements from '@/components/ui/Requirements'
import Specialties from '@/components/ui/Specialties'
import Stages from '@/components/ui/Stages'
import Vacancies from '@/components/ui/Vacancies'

export default function HomePage() {
	return (
		<>
			<HashScroll />
			<Hero />
			<Compensations />
			<Benefits />
			<Vacancies />
			<Answers />
			<Equipment />
			<Requirements />
			<Specialties />
			<Stages />
			<Possibilities />
			<Papers />
			<Foreigners />
			<Feedback />
			<Questions />
			<Consultation />
		</>
	)
}
