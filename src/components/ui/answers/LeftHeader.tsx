type LeftHeaderProps = {
	counter?: string
	title: string
}

export default function LeftHeader({ counter, title }: LeftHeaderProps) {
	return (
		<div className='flex items-center gap-5 pl-7.5 pt-2 font-semibold text-white'>
			{counter ? (
				<>
					<p className='text-[14px]'>{counter}</p>
					<span className='h-[5px] w-[5px] rounded-full bg-checkbox-dot' />
				</>
			) : null}

			<p className='text-[18px]'>{title}</p>
		</div>
	)
}
