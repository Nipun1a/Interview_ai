"use client";

import React from "react";
// react-hook-form utilities
import { Controller, Control, FieldValues, Path } from "react-hook-form";
// UI components from your shadcn/ui setup
import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// ✅ Generic props for FormField
interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;                // form control from useForm
  name: Path<T>;                      // field name (must exist in schema)
  label: string;                      // input label
  placeholder?: string;               // optional placeholder
  type?: "text" | "email" | "password" | "file"; // input type
}

// ✅ Reusable FormField component
function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text", // default is "text"
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control} // connects with react-hook-form
      name={name}       // field name (from schema)
      render={({ field }) => ( // react-hook-form gives us field props
        <FormItem>
          {/* Label */}
          <FormLabel>{label}</FormLabel>

          {/* Input with form binding */}
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>

          {/* Optional description (empty by default) */}
          <FormDescription />

          {/* Displays validation errors from Zod */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
