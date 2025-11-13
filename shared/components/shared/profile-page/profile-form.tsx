"use client";

import { updateUserInfo } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { Check, Pencil, X } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../ui";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { FormInput } from "../form/form-input";
import { formProfileUpdateSchema, ProfileUpdateFormValues } from "../modals/auth-modal/forms/schema";

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const onSubmit = async (formData: ProfileUpdateFormValues) => {
    try {
      const updateData: {
        email: string;
        firstName: string;
        lastName: string;
        password?: string;
      } = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      if (formData.password && formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      await updateUserInfo(updateData);

      toast.success("Profile updated successfully! 📝", {
        style: {
          fontSize: "14px",
        },
      });

      // Reset password fields and exit edit mode
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating profile", {
        style: {
          fontSize: "14px",
        },
      });
    }
  };

  const handleCancelEdit = () => {
    form.reset({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

  const onClickSignOut = () => {
    document.cookie = "cartToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Account Information</CardTitle>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {/* Account Details Display */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Account Created</p>
                <p className="font-medium">{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Account Type</p>
                <p className="font-medium">{data.role}</p>
              </div>
              {data.provider && (
                <div>
                  <p className="text-gray-500">Login Method</p>
                  <p className="font-medium capitalize">{data.provider}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500">Verification Status</p>
                <p className="font-medium">{data.verified ? "✓ Verified" : "Not verified"}</p>
              </div>
            </div>
          </div>

          {/* User Information Display */}
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">First Name</p>
                  <p className="font-medium text-lg">{data.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Last Name</p>
                  <p className="font-medium text-lg">{data.lastName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-medium text-lg">{data.email}</p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 mb-2">Password</p>
                <p className="font-medium">••••••••</p>
                <p className="text-xs text-gray-400 mt-1">
                  Last changed: {new Date(data.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <FormProvider {...form}>
              <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput name="firstName" label="First Name" required />
                  <FormInput name="lastName" label="Last Name" required />
                </div>

                <FormInput name="email" label="E-Mail" required />

                <div className="border-t pt-5 mt-2">
                  <p className="text-sm text-gray-600 mb-4">Change Password (optional)</p>
                  <div className="space-y-5">
                    <FormInput
                      type="password"
                      name="password"
                      label="New Password"
                      placeholder="Leave blank to keep current password"
                    />
                    <FormInput type="password" name="confirmPassword" label="Confirm New Password" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button
                    disabled={form.formState.isSubmitting}
                    className="text-base flex-1 flex items-center gap-2"
                    type="submit"
                  >
                    <Check className="h-4 w-4" />
                    {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    disabled={form.formState.isSubmitting}
                    className="text-base flex-1 flex items-center gap-2"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Always visible Sign Out button */}
          <div className="border-t mt-6 pt-6">
            <Button onClick={onClickSignOut} variant="outline" className="w-full text-base" type="button">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
