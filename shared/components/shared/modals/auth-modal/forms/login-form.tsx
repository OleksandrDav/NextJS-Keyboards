import { Button } from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput } from "../../../form/form-input";
import { Title } from "../../../title";
import { formLoginSchema, LoginFormValues } from "./schema";

interface Props {
  onClose?: () => void;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        let errorMessage = "An error occurred while logging in. Please try again.";
        
        if (resp?.error) {
          const errorLower = resp.error.toLowerCase();
          
          if (errorLower.includes("no user found") || errorLower.includes("email")) {
            errorMessage = "No account found with this email address.";
          } else if (errorLower.includes("incorrect password") || errorLower.includes("password")) {
            errorMessage = "Incorrect password. Please try again.";
          } else if (errorLower.includes("verify") || errorLower.includes("verified")) {
            errorMessage = "Please verify your email address before logging in.";
          }
        }

        toast.error(errorMessage, {
          style: {
            fontSize: "14px",
          },
        });
        return;
      }

      toast.success("Logged in successfully!", {
        style: {
          fontSize: "14px",
        },
      });
      onClose?.();
    } catch (error) {
      console.error("Error [LoginForm onSubmit]", error);
      toast.error("An unexpected error occurred. Please try again.", {
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
            <Title text="Login" size="md" className="font-bold" />
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <FormInput name="email" label="Email" type="email" required />
          <FormInput name="password" label="Password" type="password" required />
        </div>

        <Button loading={form.formState.isSubmitting} type="submit" className="text-base h-12 mt-4">
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};