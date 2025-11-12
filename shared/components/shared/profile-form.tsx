"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formProfileUpdateSchema, ProfileUpdateFormValues } from "./modals/auth-modal/forms/schema";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { Button } from "../ui";
import { FormInput } from "./form/form-input";
import { updateUserInfo } from "@/app/actions";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formProfileUpdateSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ProfileUpdateFormValues) => {
    try {
      const updateData: {
        email: string;
        firstName: string;
        lastName: string;
        password?: string;
      } = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      if (data.password && data.password.trim() !== "") {
        updateData.password = data.password;
      }

      await updateUserInfo(updateData);

      toast.success("Data Updated 📝", {
        style: {
          fontSize: "14px",
        },
      });
    } catch (error) {
      return toast.error("Error updating data", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };

  const onClickSignOut = () => {
    document.cookie = "cartToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container>
      <Title text="Profile data" size="md" className="font-bold" />
      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="firstName" label="First Name" required />
          <FormInput name="lastName" label="Last Name" required />

          <FormInput type="password" name="password" label="New Password (leave blank to keep current)" />
          <FormInput type="password" name="confirmPassword" label="Confirm Password" />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Save
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Sign Out
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
