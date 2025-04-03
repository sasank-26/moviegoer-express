import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navItems = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movies" },
  { title: "Theaters", path: "/theaters" },
  { title: "My Tickets", path: "/my-tickets" },
  { title: "Admin", path: "/admin" }, // Added admin link
];
