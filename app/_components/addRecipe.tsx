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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  CATEGORIES_LABELS,
  INGREDIENTS,
  INGREDIENTS_LABELS,
  QUANTITY_TYPE,
  QUANTITY_TYPE_LABEL,
} from "../_utils/constants";
import { Button } from "@/components/ui/button";
import { PenIcon, PlusIcon, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formSchema } from "../_utils/zodConfig";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nome da receita..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Faça uma descrição da sua receita..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serving"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porções</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Quantidade de porções..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="ingredient"
                  render={() => (
                    <FormItem>
                      <FormLabel>Ingredient</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um Ingrediente" />
                          </SelectTrigger>
                          <SelectContent>
                            {INGREDIENTS.map((ingredient, index) => (
                              <SelectItem key={index} value={ingredient}>
                                {INGREDIENTS_LABELS[ingredient]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-4 gap-2">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input placeholder="1" {...field} required />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="quantityType"
                      render={() => (
                        <FormItem>
                          <FormLabel className="opacity-0">Unidade</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {QUANTITY_TYPE.map((quantity, index) => (
                                  <SelectItem key={index} value={quantity}>
                                    {QUANTITY_TYPE_LABEL[quantity]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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

              <FormField
                control={form.control}
                name="instruction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruções</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="De instruções sobre como fazer sua receita..."
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="prepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo de Preparo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Tempo de Preparo..."
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cookTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempo no Fogão</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Tempo no Fogão..."
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid items-end grid-cols-8 gap-3">
                <div className="col-span-7">
                  <FormField
                    control={form.control}
                    name="category"
                    render={() => (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                  {CATEGORIES_LABELS[category]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
