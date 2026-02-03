import { fireEvent, render, screen } from "@testing-library/react"
import Search from "../../../shared/components/Search"

describe("Search", () => {
  it("renders input with value and placeholder", () => {
    render(<Search value="initial" onChange={() => {}} />)

    const input = screen.getByPlaceholderText("Cari...")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("initial")
  })

  it("calls onChange with the next value", () => {
    const handleChange = vi.fn()
    render(<Search value="" onChange={handleChange} />)

    fireEvent.change(screen.getByPlaceholderText("Cari..."), {
      target: { value: "produk" },
    })

    expect(handleChange).toHaveBeenCalledWith("produk")
  })
})
