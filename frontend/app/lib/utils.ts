import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TsDate } from "~/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number) {
  return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function wipMessage() {
  alert('FUNCIÓN NO DISPONIBLE DE MOMENTO');
}

export function formatDate(dateValue: TsDate) {
  const newDate = new Date(dateValue!);
  if (isNaN(newDate.getTime())) return "Invalid date";
  let [date, time] = newDate.toISOString().slice(0, 16).split('T');
  date = date.split('-').reverse().join('/')
  return `${date} ${time}`;
}