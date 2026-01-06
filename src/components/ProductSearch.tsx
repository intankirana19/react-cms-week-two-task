type Props = {
  value: string
  onChange: (value: string) => void
}

export default function ProductSearch({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Cari..."
      className="border p-2 w-64 rounded"
    />
  )
}
