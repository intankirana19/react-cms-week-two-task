import { render, screen } from "@testing-library/react"
import { CartItemRow } from "../components/CartItemRow"

const mockItem = {
  id: "1",
  name: "Produk Tes",
  price: 10000,
  quantity: 2,
}

describe("CartItemRow", () => {
  it("render item title & quantity", () => {
    render(<CartItemRow item={mockItem} />)

    expect(screen.getByText("Produk Tes")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })
})
