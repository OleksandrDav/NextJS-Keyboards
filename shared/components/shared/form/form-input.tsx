import { X } from "lucide-react";
import React from "react";
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

  const value = watch(name);
  const errorMessage = errors[name]?.message as string | undefined;

  const handleClear = () => {
    setValue(name, "", { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Input 
          className="h-12 text-md" 
          {...register(name)} 
          {...props} 
        />

        {value && (
          <button 
            type="button"
            onClick={handleClear} 
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer transition-opacity"
            aria-label="Clear input"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-red-500 ml-2 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};