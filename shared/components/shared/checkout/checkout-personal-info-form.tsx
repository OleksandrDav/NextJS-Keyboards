import React from "react";
import { WhiteBlock } from "./white-block";
import { FormInput } from "../form/form-input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const CheckoutPersonalInfoForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="Personal Information">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
        <FormInput name="firstName" placeholder="Enter your first name" className="text-base" />
        <FormInput name="lastName" placeholder="Enter your last name" className="text-base" />
        <FormInput name="email" placeholder="Enter your email address" className="text-base" />
        <FormInput name="phone" placeholder="Enter your phone number" className="text-base" type="tel" autoComplete="tel" />
      </div>
    </WhiteBlock>
  );
};
