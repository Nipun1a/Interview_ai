import React from 'react'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Controller, FieldValue, Path } from 'react-hook-form'

interface FormFieldProps <T extends FieldValue>{
    control: Control<T>;
    name: Path <T>;
    label: string;
    placeholder: string;
    type?: "text";
}{

const FormField = ({control, name, label, placeholder, type = "text"}) => {
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
            This is your public display name.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField

    <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
}

export default FormField


