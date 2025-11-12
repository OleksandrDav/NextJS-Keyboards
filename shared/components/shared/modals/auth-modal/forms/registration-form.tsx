import { Button } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "../../../form/form-input";
import { Title } from "../../../title";
import { formRegistrationSchema, RegistrationFormValues } from "./schema";
import { createUser } from "@/app/actions";

interface Props {
  onClose?: () => void;
}

export const RegistrationForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formRegistrationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      await createUser({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      toast.success("Registered successfully! Verify your email.", {
        style: {
          fontSize: "14px",
        },
      });

      onClose?.();
    } catch (error) {
      console.error("Error [RegistrationForm onSubmit]", error);
      
      let errorMessage = "An error occurred while registering. Please try again.";
      
      if (error instanceof Error) {
        const errorLower = error.message.toLowerCase();
        
        if (errorLower.includes("already exists") || errorLower.includes("email")) {
          errorMessage = "An account with this email already exists. Please try logging in.";
        }
      }

      toast.error(errorMessage, {
        style: {
          fontSize: "14px",
        },
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2 ">
            <Title text="Registration" size="md" className="font-bold" />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <FormInput name="email" label="Email" type="email" required />
          <FormInput name="firstName" label="First Name" type="text" required />
          <FormInput name="lastName" label="Last Name" type="text" required />
          <FormInput name="password" label="Password" type="password" required />
          <FormInput name="confirmPassword" label="Confirm Password" type="password" required />
        </div>

        <Button loading={form.formState.isSubmitting} type="submit" className="text-base h-12 mt-4">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
};
