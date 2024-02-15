import { LoadingButton } from '@mui/lab'
import { Box, Button, Drawer } from '@mui/material'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'react-toastify'

import { DrawerFooter } from '../DrawerFooter'
import { DrawerTitle } from '../DrawerTitle'

// import { type UpdateUserInput, type User, updateExistingUserByUserID } from '@/services/api'

import { User, UserForm, useUserForm } from './UserForm'

interface EditUserDrawerProps {
	open: boolean
	user: User
	onClose: VoidFunction
	handleSubmit: (value: any) => void
}

export const EditUserDrawer = ({ open, user, onClose, handleSubmit }: EditUserDrawerProps) => {
	const form = useUserForm({
		defaultValues: user,
	})

	// const queryClient = useQueryClient()

	const handleCloseAndResetForm = () => {
		onClose()

		form.reset()
	}

	// const updateUserMutation = useMutation({
	// 	mutationFn: (input: UpdateUserInput) => updateExistingUserByUserID(input),
	// 	onSuccess() {
	// 		toast.success('Updated successfully')

	// 		queryClient.refetchQueries({
	// 			queryKey: ['list-users'],
	// 		})
	// 	},
	// 	onError() {
	// 		toast.error('Failed to update')
	// 	},
	// 	onSettled() {
	// 		handleCloseAndResetForm()
	// 	},
	// })

	return (
		<Drawer
			open={open}
			anchor="right"
			variant="temporary"
			sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
			ModalProps={{ keepMounted: true }}
			onClose={handleCloseAndResetForm}
		>
			<DrawerTitle onClose={handleCloseAndResetForm}>{user.name}</DrawerTitle>

			<Box p={4}>
				<UserForm
					form={form}
					onFinish={(values) => {
						handleSubmit(values)
					}}
				>
					<DrawerFooter>
						<Button color="primary" variant="outlined" onClick={handleCloseAndResetForm}>
							Cancel
						</Button>
						<LoadingButton
							loading={false}
							type="submit"
							color="primary"
							variant="contained"
							// disabled={!form.formState.isDirty}
						>
							Submit
						</LoadingButton>
					</DrawerFooter>
				</UserForm>
			</Box>
		</Drawer>
	)
}
