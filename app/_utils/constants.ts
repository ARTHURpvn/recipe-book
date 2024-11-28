import { QuantityEnum } from "@prisma/client"

export const INGREDIENTS_BY_ID : Record<number, string> = {
    [1]: "Açúcar",
    [2]: "Farínha",
    [3]: "Leite",
    [4]: "Ovo",
    [5]: "Manteíga",
    [6]: "Sal",
    [7]: "Chocolate",
    [8]: "Creme",
    [9]: "Chocolate em pó",
    [10]: "Óleo",
    [11]: "Creme de Leite",
    [12]: "Fermento",
}

export const CATEGORY_BY_ID : Record<number, string> = {
    [1]: "Lanche",
    [2]: "Sobremesa",
    [3]: "Almoco",
}

export const QUANTITY_TYPE_LABEL : Record<string, string> = {
    [QuantityEnum.UNIT]: "Unidade",
    [QuantityEnum.LITRE]: "Litro",
    [QuantityEnum.CUP]: "Xícara",
    [QuantityEnum.BAR]: "Barra",
}