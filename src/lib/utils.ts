import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FilterUndefined<T>(data: T | undefined): data is T {
  return data !== undefined;
}
