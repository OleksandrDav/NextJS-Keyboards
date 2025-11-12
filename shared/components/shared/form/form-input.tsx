'use client'

import { X, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const { 
    register, 
    formState: { errors }, 
    watch, 
    setValue 
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  
  const value = watch(name);
  const errorMessage = errors[name]?.message as string | undefined;
  const isPasswordField = props.type === 'password';

  const handleClear = () => {
    setValue(name, "", { shouldValidate: true, shouldDirty: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Input 
          className="h-12 text-md" 
          {...register(name)} 
          {...props}
          type={isPasswordField && showPassword ? 'text' : props.type}
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isPasswordField && (
            <button 
              type="button"
              onClick={togglePasswordVisibility} 
              className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}

          {value && (
            <button 
              type="button"
              onClick={handleClear} 
              className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity"
              aria-label="Clear input"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500 ml-2 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};