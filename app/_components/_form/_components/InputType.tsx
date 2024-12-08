"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Combobox } from "./selectInput";
import { formField } from "../addRecipe";
import { FormFields } from "../_utils/constantes";

type InputTypeProps = {
  input: string;
  name: string;
  field: ControllerRenderProps<FormFields, keyof FormFields>;
  placeholder: string;
  form: UseFormReturn<formField>;
};

const InputType = ({
  input,
  name,
  field,
  placeholder,
  form,
}: InputTypeProps) => {
  const setInputType = () => {
    let inputType: JSX.Element;

    switch (input) {
      case "textArea":
        inputType = (
          <Textarea
            placeholder={placeholder}
            {...field}
            value={field.value as string}
            className="max-h-[15rem]"
            required
          />
        );
        break;

      case "select":
        inputType = (
          <Combobox placeholder={placeholder} type={name} form={form} />
        );
        break;

      case "file":
        inputType = (
          <div className="flex items-center gap-2 file-input-wrapper">
            <Button variant={"white"} asChild>
              <label htmlFor={`file-upload-${field.name}`}>
                Escolher arquivo
              </label>
            </Button>
            <Input
              id={`file-upload-${field.name}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  field.onChange(e.target.files[0]);
                } else {
                  field.onChange(null);
                }
              }}
            />
            {field.value && field.value instanceof File && (
              <p className="text-sm w-full border rounded-md p-[.55rem]">
                {field.value.name}
              </p>
            )}
          </div>
        );
        break;

      default:
        inputType = (
          <Input
            placeholder={placeholder}
            type={input}
            {...field}
            value={field.value as string}
            required
          />
        );
    }

    return inputType;
  };

  return setInputType();
};

export default InputType;
