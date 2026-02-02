import HeroClient from '@/components/ui/HeroClient'
import type { HeroProps } from '@/types'

export default function Hero(props: HeroProps) {
	return <HeroClient {...props} />
}
