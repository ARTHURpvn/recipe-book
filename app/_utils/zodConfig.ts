'use client';
import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(5, {
      message: "O nome da receita deve contem pelo menos 5 caracteres.",
    }),
    description: z.string().min(15, {
      message: "A descrição da receita deve contem pelo menos 15 caracteres.",
    }),
    serving: z.number().min(1, {
      message: "O numero de porção deve ser maior que 0.",
    }),
    ingredient: z.string(),
    quantity: z.number().min(1, {
      message: "A quantidade deve ser maior que 0.",
    }),
    quantityType: z.string(),
    instruction: z.string().min(30, {
      message: "A descrição da receita deve contem pelo menos 30 caracteres.",
    }),
    prepTime: z.number().min(5, {
      message: "O tempo de preparo deve ser maior que 4 minutos",
    }),
    cookTime: z.number().min(5, {
      message: "O tempo no fogão deve ser maior que 4 minutos",
    }),
    category: z.string(),
    photo: z.string(),
  });
