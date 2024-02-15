import { yupResolver } from "@hookform/resolvers/yup";
import { type ReactNode } from "react";
import {
  FormProvider,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

import { UserFormBody } from "./UserFormBody";

export type UserRole =
  | "AIRDROP MANAGER"
  | "BANNER MANAGER"
  | "REWARD MANAGER"
  | "SESSION MANAGER"
  | "USER MANAGER"
  | "ADMIN";
export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  roleId: number;
}
export interface FormValues extends Omit<User, "roleId"> {
  roleId: string | number;
}

export interface ValidatedFormValues {
  id: string;
  email: string;
  roleId: number;
}

interface UserFormProps {
  form: UseFormReturn<FormValues>;
  onFinish: (dataForAPI: ValidatedFormValues) => void;
  children: ReactNode;
}

export const UserForm = ({ form, onFinish, children }: UserFormProps) => {
  const onBeforeFinish = (formValues: FormValues) => {
    const { email, roleId, id} = formValues;

    if (email == null || roleId == null || typeof roleId !== "number") {
      return;
    }

    onFinish({
      id,
      email,
      roleId,
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onBeforeFinish)}>
        <UserFormBody />
        {children}
      </form>
    </FormProvider>
  );
};

const schema = yup.object({
  email: yup
    .string()
    .email("Please input the valid email")
    .required("Email is required")
    .matches(
      /@(krungthai.com|arise.tech|infinitaskt.com)$/i,
      "Only krungthai.com, infinitaskt.com, or arise.tech emails are allowed"
    ),
  roleId: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required("User role is required"),
});

export const useUserForm = (
  options?: Omit<UseFormProps<FormValues>, "resolver">
) =>
  useForm<FormValues>({
    defaultValues: {
      email: "",
      roleId: "",
    },
    mode: "onTouched",
    ...options,
    resolver: yupResolver(schema),
  });
