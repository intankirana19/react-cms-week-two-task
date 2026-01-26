type Props = {
  value: string
  onChange: (value: string) => void
}

export default function Search({ value, onChange }: Readonly<Props>) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Cari..."
      className="border p-2 w-64 rounded"
    />
  )
}
