import { requiredErrorMessage } from "@/lib/utils";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const newCompanySchema = z.object({
  name: z
    .string({
      required_error: requiredErrorMessage,
    })
    .min(6, "Coloque o nome da empresa"),
  cnpj: z
    .string({
      required_error: requiredErrorMessage,
    })
    .min(14, "Digite um CNPJ válido"),

  cep: z
    .string({
      required_error: requiredErrorMessage,
    })
    .length(8, "O CEP precisa ter 8 dígitos"),
  number: z.string({
    required_error: requiredErrorMessage,
  }),
  country: z.string({
    required_error: requiredErrorMessage,
  }),
  state: z.string({
    required_error: requiredErrorMessage,
  }),
  city: z.string({
    required_error: requiredErrorMessage,
  }),
  neighborhood: z.string({
    required_error: requiredErrorMessage,
  }),
  street: z.string({
    required_error: requiredErrorMessage,
  }),
  complement: z.string().optional(),
  image: z
    .any()
    .refine((file) => {
      return file instanceof File || file instanceof FileList;
    }, "Logo é obrigatória.")
    .refine((file) => {
      if (file instanceof File) return file.size <= MAX_FILE_SIZE;
      return true;
    }, `Tamanho máximo de arquivos é de 50mb.`)
    .refine((file) => {
      if (file instanceof File) return ACCEPTED_IMAGE_TYPES.includes(file.type);
      return true;
    }, "Somente arquivos .jpg, .jpeg, .png and .webp são aceitos."),
});
