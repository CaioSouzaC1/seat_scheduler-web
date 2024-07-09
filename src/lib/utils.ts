import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const requiredErrorMessage = "Campo obrigatório";  


export const formatDate = (date: string): string => {
  return dayjs(date).format("DD/MM/YYYY");
};
