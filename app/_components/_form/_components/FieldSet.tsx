"use client";

import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputType from "./InputType";
import { Control } from "react-hook-form";
type FieldSetProps = {
  name:
    | "name"
    | "description"
    | "serving"
    | "ingredient"
    | "quantity"
    | "quantityType"
    | "instruction"
    | "prepTime"
    | "cookTime"
    | "category"
    | "photo";
  label: string;
  input: string;
  placeholder: string;
  control: Control<{
    name: string;
    ingredient: string;
    category: string;
    quantityType: string;
    description: string;
    serving: string;
    quantity: string;
    instruction: string;
    prepTime: string;
    cookTime: string;
    photo: string;
  }>;
};

const FieldSet = ({
  name,
  label,
  input,
  placeholder,
  control,
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
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FieldSet;
