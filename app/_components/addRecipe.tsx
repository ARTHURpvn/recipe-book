"use client";
import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
} from "@/components/ui/form";
import {
  CATEGORIES_LABELS,
  INGREDIENTS_LABELS,
} from "../_utils/constants";
import { Button } from "@/components/ui/button";
import { PenIcon, PlusIcon, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formSchema } from "../_utils/zodConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldSet from "./FieldSet";

const AddRecipe = () => {
  const addedIngredients = [
    {
      name: "CHOCOLATE",
      quantity: 1,
      quantity_type: "Unidade",
    },
    {
      name: "SUGAR",
      quantity: 1,
      quantity_type: "Unidade",
    },
  ];

  const addedCategories = [{ name: "LUNCH" }, { name: "DESSERT" }];

  console.log("render");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      serving: 1,
      ingredient: "",
      quantity: 1,
      quantityType: "",
      instruction: "",
      prepTime: 5,
      cookTime: 5,
      category: "",
      photo: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-lg">
        Adicionar Receita
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Adicionar Receita
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <ScrollArea className="flex">
              <FieldSet
                control={form.control}
                name="name"
                label="Nome"
                input="text"
                placeholder="Digite o nome da sua receita..."
              />

              <FieldSet
                control={form.control}
                name="description"
                label="Descrição"
                input="textArea"
                placeholder="Digite a descrição da sua receita..."
              />

              <FieldSet
                control={form.control}
                name="serving"
                label="Porções"
                input="number"
                placeholder="Quantidade de porções..."
              />

              <div className="grid grid-cols-2 gap-3">
                <FieldSet
                  control={form.control}
                  name="ingredient"
                  label="Ingrediente"
                  input="select"
                  placeholder="Selecione um Ingrediente"
                />

                <div className="grid grid-cols-4 gap-2">
                  <FieldSet
                    control={form.control}
                    name="quantity"
                    label="Quantidade"
                    input="number"
                    placeholder="1"
                  />
                  <div className="col-span-2">
                    <FieldSet
                      control={form.control}
                      name="quantityType"
                      label="Unidade"
                      input="select"
                      placeholder="Tipo"
                    />
                  </div>
                  <Button type="button" variant={"white"} className="self-end">
                    <PlusIcon />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-24 border rounded-md">
                <ul className=" px-4 pt-2 divide-y space-y-2">
                  {addedIngredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-center pt-2 justify-between"
                    >
                      <div className="flex gap-2">
                        <p>{ingredient.quantity}</p>
                        <p>{ingredient.quantity_type}</p>
                        <p>de</p>
                        <p>{INGREDIENTS_LABELS[ingredient.name]}</p>
                      </div>

                      <div className="flex items-center gap-2 justify-center">
                        <Button type="button" variant={"white"} size={"sm"}>
                          <PenIcon />
                        </Button>

                        <Button type="button" variant={"ghost"} size={"sm"}>
                          <X />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>

              <FieldSet
                control={form.control}
                name="instruction"
                label="Instruções"
                input="textArea"
                placeholder="Digite as instruções da sua receita..."
              />

              <div className="grid grid-cols-2 gap-3">
                <FieldSet
                  control={form.control}
                  name="prepTime"
                  label="Tempo de Preparo"
                  input="number"
                  placeholder="Tempo de Preparo..."
                />

                <FieldSet
                  control={form.control}
                  name="cookTime"
                  label="Tempo no Fogão"
                  input="number"
                  placeholder="Tempo no Fogão..."
                />
              </div>

              <div className="grid items-end grid-cols-8 gap-3">
                <div className="col-span-7">
                  <FieldSet
                    control={form.control}
                    name="category"
                    label="Categoria"
                    input="select"
                    placeholder="Selecione uma categoria"
                  />
                </div>
                <Button variant={"white"}>
                  <PlusIcon />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {addedCategories.map((category, index) => (
                  <Badge key={index} className="bg-white text-black gap-2 py-2">
                    {CATEGORIES_LABELS[category.name]}
                    <Button variant={"white"} className="w-4 h-4">
                      <X />
                    </Button>
                  </Badge>
                ))}
              </div>

              <FieldSet
                control={form.control}
                name="photo"
                label="Foto"
                input="file"
                placeholder="Selecione uma foto..."
              />
            </ScrollArea>

            <div className="flex gap-2 justify-end">
              <DialogClose asChild>
                <Button variant={"outline"} type="button">
                  Cancelar
                </Button>
              </DialogClose>

              <Button variant={"white"} type="submit">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
