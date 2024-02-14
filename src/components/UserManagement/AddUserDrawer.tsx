import { LoadingButton } from "@mui/lab";
import { Box, Button, Drawer } from "@mui/material";
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'react-toastify'

import { DrawerFooter } from "@/src/components/DrawerFooter";
import { DrawerTitle } from "@/src/components/DrawerTitle";

// import { type APIErrorResponse, type CreateUserInput, createNewUser } from '@/services/api'
// import { createNewUserAPIError } from '@/services/error'

import { UserForm, useUserForm } from "./UserForm";

interface AddUserDrawerProps {
  open: boolean;
  onClose: VoidFunction;
  handleSubmit: (values: any) => void;
}

export const AddUserDrawer = ({
  open,
  onClose,
  handleSubmit,
}: AddUserDrawerProps) => {
  const form = useUserForm();

  // const queryClient = useQueryClient()

  const handleCloseAndResetForm = () => {
    onClose();

    form.reset();
  };

  // const createUserMutation = useMutation({
  // 	mutationFn: (input: CreateUserInput) => createNewUser(input),
  // 	onSuccess() {
  // 		toast.success('User added successfully.')

  // 		queryClient.refetchQueries({
  // 			queryKey: ['list-users'],
  // 		})
  // 	},
  // 	onError(error: APIErrorResponse) {
  // 		const errorMessage = createNewUserAPIError[error.code] || 'Failed to add user.'

  // 		toast.error(errorMessage)
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
      sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
      ModalProps={{ keepMounted: true }}
      onClose={handleCloseAndResetForm}
    >
      <DrawerTitle onClose={handleCloseAndResetForm}>Add User</DrawerTitle>

      <Box p={4}>
        <UserForm form={form} onFinish={(values) => handleSubmit(values)}>
          <DrawerFooter>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleCloseAndResetForm}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={false}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!form.formState.isValid}
            >
              Submit
            </LoadingButton>
          </DrawerFooter>
        </UserForm>
      </Box>
    </Drawer>
  );
};
