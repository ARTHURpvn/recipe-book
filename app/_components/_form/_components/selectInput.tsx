"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CATEGORIES,
  CATEGORIES_LABELS,
  INGREDIENTS,
  INGREDIENTS_LABELS,
  QUANTITY_TYPE,
  QUANTITY_TYPE_LABELS,
} from "@/app/_utils/constants";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { formField } from "../addRecipe";

export function Combobox({
  type,
  placeholder,
  form,
}: {
  type: string;
  placeholder: string;
  form: UseFormReturn<formField>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  let values: { value: string; label: string }[] = [];

  switch (type) {
    case "ingredient":
      values = INGREDIENTS.map((ingredient) => ({
        value: ingredient,
        label: INGREDIENTS_LABELS[ingredient],
      }));
      break;

    case "category":
      values = CATEGORIES.map((category) => ({
        value: category,
        label: CATEGORIES_LABELS[category],
      }));
      break;

    case "quantityType":
      values = QUANTITY_TYPE.map((quantityType) => ({
        value: quantityType,
        label: QUANTITY_TYPE_LABELS[quantityType],
      }));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? values.find((values) => values.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty> Nenhum Resultado Encontrado. </CommandEmpty>
            <CommandGroup>
              {values.map((values) => (
                <CommandItem
                  key={values.value}
                  value={values.value}
                  onSelect={() => {
                    // Atualiza o valor diretamente no formulário
                    form.setValue(type as keyof formField, values.value);
                    setValue(values.value);
                  }}
                >
                  {values.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === values.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

