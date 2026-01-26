import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
    }).format(new Date(date))
}
