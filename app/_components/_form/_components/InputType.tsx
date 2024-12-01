"use client";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import {
  CATEGORIES,
  CATEGORIES_LABELS,
  INGREDIENTS,
  INGREDIENTS_LABELS,
  QUANTITY_TYPE,
  QUANTITY_TYPE_LABELS,
} from "../../../_utils/constants";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/components/ui/button";

export type FormFields = {
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
  photo:  File | undefined;
};

type InputTypeProps = {
  input: string;
  name: keyof FormFields;
  placeholder: string;
  field: ControllerRenderProps<FormFields, keyof FormFields>;
};

const InputType = ({ input, name, field, placeholder }: InputTypeProps) => {
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
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value as string}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {name === "ingredient"
                ? INGREDIENTS.map((ingredient, index) => (
                    <SelectItem key={index} value={ingredient}>
                      {INGREDIENTS_LABELS[ingredient]}
                    </SelectItem>
                  ))
                : name === "category"
                  ? CATEGORIES.map((category, index) => (
                      <SelectItem key={index} value={category}>
                        {CATEGORIES_LABELS[category]}
                      </SelectItem>
                    ))
                  : name === "quantityType" &&
                    QUANTITY_TYPE.map((quantityType, index) => (
                      <SelectItem key={index} value={quantityType}>
                        {QUANTITY_TYPE_LABELS[quantityType]}
                      </SelectItem>
                    ))}
            </SelectContent>
          </Select>
        );
        break;

      case "file":
        inputType = (
          <div className="flex items-center gap-2 file-input-wrapper">
            {/* Botão para abrir o seletor de arquivos */}
            <Button variant={"white"} asChild>
              <label htmlFor={`file-upload-${field.name}`}>
                Escolher arquivo
              </label>
            </Button>

            {/* Input de arquivo oculto */}
            <Input
              id={`file-upload-${field.name}`} 
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  field.onChange(e.target.files[0]);
                  console.log(e.target.files[0]);
                } else {
                  field.onChange(null);
                }
              }}
            />

            {/* Nome do arquivo selecionado */}
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
          <Input placeholder={placeholder} type={input} {...field} value={field.value as string} required />
        );
    }

    return inputType;
  };

  return setInputType();
};

export default InputType;
