import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Placeholder for cn utility function - Assume this file exists
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}