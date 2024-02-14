import { Stack, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { SelectUserRole } from './SelectUserRole'
import { type FormValues } from './UserForm'

export const UserFormBody = () => {
	const { watch } = useFormContext<FormValues>()

	const id = watch('userId') as string | null
	const disabled = id != null

	return (
		<Stack gap="24px">
			<Controller
				name="email"
				render={({ field, fieldState }) => (
					<TextField
						id="email"
						fullWidth
						label="Email"
						disabled={disabled}
						error={fieldState.error != null}
						helperText={fieldState.error?.message}
						{...field}
					/>
				)}
			/>

			<Controller
				name="roleId"
				render={({ field }) => {
					const { ref, ...restField } = field

					return <SelectUserRole {...restField} />
				}}
			/>
		</Stack>
	)
}