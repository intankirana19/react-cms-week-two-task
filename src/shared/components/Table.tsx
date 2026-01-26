import { type ReactNode } from "react"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
 
export type SortDirection = "asc" | "desc" | null
 
export type Column<T> = {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (row: T) => ReactNode
  className?: string
}
 
type Props<T> = {
  columns: Column<T>[]
  data: T[]
  sortKey: keyof T | null
  sortDirection: SortDirection
  onSortChange: (key: keyof T) => void
  rowKey: (row: T) => string
}
 
export function Table<T>({
  columns,
  data,
  sortKey,
  sortDirection,
  onSortChange,
  rowKey,
}: Readonly<Props<T>>) {
  const renderSortIcon = (colKey: keyof T) => {
    if (sortKey !== colKey) return <ArrowUpDown size={14} className="opacity-40" />
    if (sortDirection === "asc") return <ArrowUp size={14} />
    if (sortDirection === "desc") return <ArrowDown size={14} />
    return <ArrowUpDown size={14} />
  }
 
  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr className="border-b">
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className={`p-2 text-left cursor-pointer select-none ${col.className ?? ""}`}
              onClick={() => col.sortable && onSortChange(col.key)}
            >
              <div className="flex items-center gap-1">
                {col.label}
                {col.sortable && renderSortIcon(col.key)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
 
      <tbody>
        {data.map((row) => (
          <tr key={rowKey(row)} className="border-b">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2">
                {col.render ? col.render(row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}