import { requiredErrorMessage } from "@/lib/utils";
import { z } from "zod";

export const registerFormSchema = z.object({
  email: z
    .string({
      required_error: requiredErrorMessage,
    })
    .email({
      message: "Este campo precisa ser um email.",
    }),
  password: z
    .string({
      required_error: requiredErrorMessage,
    })
    .min(6, {
      message: "A senha precisa ter pelo menos 6 caracteres",
    }),
  name: z
    .string({
      required_error: requiredErrorMessage,
    })
    .min(12, "Coloque seu nome completo"),
  phone: z.string({
    required_error: requiredErrorMessage,
  }),
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
});

export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: requiredErrorMessage,
    })
    .email({
      message: "Este campo precisa ser um email.",
    }),
  password: z
    .string({
      required_error: requiredErrorMessage,
    })
    .min(6, {
      message: "A senha precisa ter pelo menos 6 caracteres",
    }),
});
