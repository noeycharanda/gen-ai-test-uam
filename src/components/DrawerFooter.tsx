import { Stack } from '@mui/material'
import { type ReactNode } from 'react'

interface DrawerFooterProps {
	children: ReactNode
}

export const DrawerFooter = ({ children }: DrawerFooterProps) => {
	return (
		<div className="absolute bottom-0 left-0 w-full border-t border-t-gray-200 py-3 px-4">
			<Stack flexDirection="row" alignItems="center" gap={3} justifyContent="flex-end">
				{children}
			</Stack>
		</div>
	)
}
