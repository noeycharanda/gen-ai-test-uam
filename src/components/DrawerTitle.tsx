import { Icon } from '@iconify/react'
import { Box, type BoxProps, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { type ReactNode } from 'react'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(3, 4),
	justifyContent: 'space-between',
	backgroundColor: theme.palette.background.default,
	textTransform: 'capitalize',
}))

interface DrawerTitleProps {
	onClose?: VoidFunction
	children: ReactNode
}

export const DrawerTitle = ({ onClose, children }: DrawerTitleProps) => {
	return (
		<Header>
			<Typography variant="h6">{children}</Typography>

			<IconButton size="small" onClick={onClose} sx={{ color: 'text.primary' }}>
				<Icon icon="mdi:close" fontSize={20} />
			</IconButton>
		</Header>
	)
}
