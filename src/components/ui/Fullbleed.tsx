const Fullbleed = ({ className = '' }) => {
	return (
		<div
			aria-hidden='true'
			className={[
				'pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2',

				'w-[100dvw] -z-10',
				className,
			].join(' ')}
		/>
	)
}

export default Fullbleed
