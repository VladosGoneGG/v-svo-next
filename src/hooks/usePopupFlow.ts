'use client'

import { useCallback, useState } from 'react'

export const usePopupFlow = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const open = useCallback(() => {
		setIsSuccess(false)
		setIsOpen(true)
	}, [])

	const close = useCallback(() => {
		setIsOpen(false)
		setIsSuccess(false)
	}, [])

	const success = useCallback(() => {
		setIsSuccess(true)
	}, [])

	return { isOpen, isSuccess, open, close, success }
}
