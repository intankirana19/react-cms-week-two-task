export type SortDirection = "asc" | "desc" | null
 
export function sortByKey<T>(
  data: T[],
  key: keyof T | null,
  direction: SortDirection
): T[] {
  if (!key || !direction) return data
 
  return [...data].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
 
    // null/undefined
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1
 
    // number
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal
    }
 
    // tanggal
    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === "asc"
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime()
    }
 
    // fallback buat string?
    const result = String(aVal).localeCompare(String(bVal))
    return direction === "asc" ? result : -result
  })
}