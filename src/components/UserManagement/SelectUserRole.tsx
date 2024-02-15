import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";
import { useController } from "react-hook-form";

interface Option {
  label: string;
  value: number;
}

interface SelectUserRoleProps extends Omit<SelectProps<string>, "name"> {
  name: string;
}

export const SelectUserRole = (props: SelectUserRoleProps) => {
  const { fieldState } = useController({
    name: props.name,
  });

  const listUserRoles = [
    { roleName: "admin", roleId: 3 },
    { roleName: "PX", roleId: 6 },
  ];

  const options: Option[] = listUserRoles.map((role) => ({
    label: role.roleName,
    value: role.roleId,
  }));

  return (
    <FormControl error={fieldState.error != null}>
      <InputLabel id="select-user-role-label">Select Role</InputLabel>

      <Select
        {...props}
        labelId="select-user-role-label"
        id="select-user-role"
        label="Select Role"
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
};
