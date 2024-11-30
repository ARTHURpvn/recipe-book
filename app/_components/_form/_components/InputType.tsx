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

type InputTypeProps = {
  input: string;
  name: string;
  field: any;
  placeholder: string;
};

const InputType = ({ input, name, field, placeholder }: InputTypeProps) => {
  const setInputType = () => {
    let inputType: JSX.Element;

    switch (input) {
      case "textArea":
        inputType = <Textarea placeholder={placeholder} {...field} required />;
        break;

      case "select":
        inputType = (
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
            required
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
      default:
        inputType = (
          <Input placeholder={placeholder} type={input} {...field} required />
        );
    }

    return inputType;
  };

  return setInputType();
};

export default InputType;
