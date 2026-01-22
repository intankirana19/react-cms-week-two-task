// https://ayberkyavas.com/blogs/wtf-is-clsx-twmerge-cn-in-tailwindcss
import { clsx, type ClassValue } from 'clsx'; // conditionally applying class names
import { twMerge } from 'tailwind-merge'; // ensures that the last defined class wins

// cn -> class name
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
