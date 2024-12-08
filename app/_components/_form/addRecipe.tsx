"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  CATEGORIES_LABELS,
  INGREDIENTS_LABELS,
  QUANTITY_TYPE_LABELS,
} from "../../_utils/constants";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formSchema } from "./_utils/zodConfig";
import FieldSet from "./_components/FieldSet";
import {
  handleAddCategory,
  handleAddIngredient,
  handleDeleteCategory,
  handleDeleteIngredient,
} from "@/app/_components/_form/_utils/handleClicks";
import { useAuth } from "@clerk/nextjs";
import { createRecipe } from "@/app/_data/createRecipe";
import { CategoryEnum, IngredientEnum, QuantityEnum } from "@prisma/client";
import { uploadImage } from "./_utils/uploadImage";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { FormFields } from "./_utils/constantes";

export type formField = z.infer<typeof formSchema>;

const AddRecipe = () => {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [ingredients, setIngredients] = useState<
    {
      ingredient: IngredientEnum;
      quantity: string;
      quantity_type: QuantityEnum;
    }[]
  >([]);
  const [categories, setCategories] = useState<{ name: CategoryEnum }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const form = useForm<formField>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      serving: "",
      ingredient: "",
      quantity: "",
      quantityType: "",
      instruction: "",
      prepTime: "",
      cookTime: "",
      category: "",
      photo: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let photoUrl = "";

      const file = values.photo;

      if (file) {
        photoUrl = await uploadImage(file);
      }
      if (ingredients.length === 0) {
        setError("Por favor, adicione pelo menos um ingrediente.");
        return;
      }

      if (categories.length === 0) {
        setError("Por favor, adicione pelo menos uma categoria.");
        return;
      }

      setLoading(true);

      const data = {
        title: values.name,
        description: values.description,
        servings: Number(values.serving),
        prepTime: Number(values.prepTime),
        cookTime: Number(values.cookTime),
        instructions: values.instruction,
        photo: photoUrl,
        ingredients,
        categories,
        authorId: userId as string,
      };

      console.log("Dados enviados:", data);

      await createRecipe(data);

      setLoading(false);
      setError("");
      setCategories([]);
      setIngredients([]);
      setIsOpen(false);
      form.reset();

      toast({
        title: "Sucesso",
        description: "Receita adicionada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setError("Erro ao salvar a receita.");
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          form.reset();
          if (!open) {
            form.reset();
          }
        }}
      >
        <DialogTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full text-lg font-semibold">
          Adicionar Receita
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              Adicionar Receita
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <ScrollArea className="h-[48rem]">
                <div className="mx-2 space-y-1 w-[95%]">
                  {/* NOME DA RECEITA */}
                  <FieldSet
                    control={form.control as Control<FormFields>}
                    name="name"
                    label="Nome"
                    input="text"
                    placeholder="Digite o nome da sua receita..."
                    form={form}
                  />

                  {/* DESCRICAO DA RECEITA */}
                  <FieldSet
                    control={form.control as Control<FormFields>}
                    name="description"
                    label="Descrição"
                    input="textArea"
                    placeholder="Digite a descrição da sua receita..."
                    form={form}
                  />

                  {/* PORÇÕES */}
                  <FieldSet
                    control={form.control as Control<FormFields>}
                    name="serving"
                    label="Porções"
                    input="number"
                    placeholder="Quantidade de porções..."
                    form={form}
                  />

                  {/* INGREDIENTES */}
                  <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-2">
                      <FieldSet
                        control={form.control as Control<FormFields>}
                        name="ingredient"
                        label="Ingrediente"
                        input="select"
                        placeholder="Ingrediente"
                        form={form}
                      />
                    </div>

                    <div className="col-span-3 grid grid-cols-6 gap-2">
                      {/* QUANTIDADE DO INGREDIENTE */}
                      <div className="col-span-2">
                        <FieldSet
                          control={form.control as Control<FormFields>}
                          name="quantity"
                          label="Quantidade"
                          input="number"
                          placeholder="1"
                          form={form}
                        />
                      </div>
                      <div className="col-span-3">
                        {/* TIPO DE QUANTIDADE DO INGREDIENTE */}
                        <FieldSet
                          control={form.control as Control<FormFields>}
                          name="quantityType"
                          label="Unidade"
                          input="select"
                          placeholder="Tipo"
                          form={form}
                        />
                      </div>

                      {/* ADICIONAR INGREDIENTE */}
                      <Button
                        type="button"
                        variant={"white"}
                        className="self-end"
                        onClick={() => {
                          const array = {
                            ingredient: form.getValues(
                              "ingredient",
                            ) as IngredientEnum,
                            quantity: String(form.getValues("quantity")),
                            quantity_type: form.getValues(
                              "quantityType",
                            ) as QuantityEnum,
                          };
                          handleAddIngredient(
                            ingredients,
                            setIngredients,
                            array,
                            setError,
                          );
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>

                  {/* LISTA DE INGREDIENTES */}
                  {ingredients.length >= 1 && (
                    <ScrollArea className="resize-y max-h-[10rem]  min-h-24 border rounded-md">
                      <ul className=" px-4 pt-2 divide-y space-y-2">
                        {ingredients.map((ingredient, index) => (
                          <li
                            key={index}
                            className="flex items-center pt-2 justify-between"
                          >
                            <div className="flex gap-2">
                              <p>{ingredient.quantity}</p>
                              <p>
                                {QUANTITY_TYPE_LABELS[ingredient.quantity_type]}
                              </p>
                              <p>de</p>
                              <p>{INGREDIENTS_LABELS[ingredient.ingredient]}</p>
                            </div>

                            <div className="flex items-center gap-2 justify-center">
                              {/* BOTAO EXCLUIR */}
                              <Button
                                type="button"
                                variant={"white"}
                                size={"sm"}
                                onClick={() =>
                                  handleDeleteIngredient(
                                    ingredients,
                                    setIngredients,
                                    ingredient,
                                  )
                                }
                              >
                                <X />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  )}

                  <FieldSet
                    control={form.control as Control<FormFields>}
                    name="instruction"
                    label="Instruções"
                    input="textArea"
                    placeholder="Digite as instruções da sua receita..."
                    form={form}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FieldSet
                      control={form.control as Control<FormFields>}
                      name="prepTime"
                      label="Tempo de Preparo"
                      input="number"
                      placeholder="Tempo de Preparo..."
                      form={form}
                    />

                    <FieldSet
                      control={form.control as Control<FormFields>}
                      name="cookTime"
                      label="Tempo no Fogão"
                      input="number"
                      placeholder="Tempo no Fogão..."
                      form={form}
                    />
                  </div>

                  <div className="grid items-end grid-cols-8 gap-3">
                    <div className="col-span-7">
                      <FieldSet
                        control={form.control as Control<FormFields>}
                        name="category"
                        label="Categoria"
                        input="select"
                        placeholder="Selecione uma categoria"
                        form={form}
                      />
                    </div>
                    <Button
                      type="button"
                      variant={"white"}
                      onClick={() => {
                        handleAddCategory(
                          categories,
                          setCategories,
                          form.getValues("category") as CategoryEnum,
                          setError,
                        );
                      }}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category, index) => (
                      <Badge
                        key={index}
                        className="bg-white/70 text-black gap-2 py-2"
                      >
                        {CATEGORIES_LABELS[category.name]}
                        <Button
                          type="button"
                          variant={"ghost"}
                          className="w-4 h-4"
                          onClick={() => {
                            handleDeleteCategory(
                              categories,
                              setCategories,
                              category.name,
                            );
                          }}
                        >
                          <X />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <FieldSet
                    control={form.control as Control<FormFields>}
                    name="photo"
                    label="Foto"
                    input="file"
                    placeholder="Selecione uma foto..."
                    form={form}
                  />
                </div>
              </ScrollArea>

              {/* Exibir erros */}
              {error && <p className="text-red-500">{error}</p>}

              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Cancelar
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={loading}>
                  {loading && <Loader2Icon className="animate-spin" />}
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
};

export default AddRecipe;
