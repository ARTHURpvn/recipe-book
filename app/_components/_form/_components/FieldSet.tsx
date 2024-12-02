"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputType, { FormFields } from "./InputType";
import { Control, UseFormReturn } from "react-hook-form";
import { formField } from "../addRecipe";


type FieldSetProps = {
  name: keyof FormFields;
  label: string;
  input: string;
  placeholder: string;
  control: Control<FormFields>;
  form: UseFormReturn<formField>;
};

const FieldSet = ({
  name,
  label,
  input,
  placeholder,
  control,
  form
}: FieldSetProps) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${name === "quantityType" && "opacity-0"}`}>
            {label}
          </FormLabel>
          <FormControl>
            <InputType
              input={input}
              name={name}
              field={field}
              placeholder={placeholder}
              form={form}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldSet;
