import { fireEvent, render, screen } from "@testing-library/react"
import { CartItemRow } from "../features/cart/components/CartItemRow"
import type { CartItem } from "../features/cart/types/cart"
import { useCartStore } from "../features/cart/stores/cart.store"

vi.mock("../features/cart/stores/cart.store")

vi.mock(
  "../features/cart/components/RemoveFromCartConfirmationDialog",
  () => ({
    RemoveFromCartConfirmationDialog: ({
      open,
      onConfirm,
    }: {
      open: boolean
      onConfirm: () => void
    }) =>
      open ? (
        <button onClick={onConfirm}>confirm-remove</button>
      ) : null,
  })
)

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
}

const mockItem = {
  id: "1",
  name: "Produk Tes",
  price: 10000,
  quantity: 2,
}

const mockUseCartStore = vi.mocked(useCartStore)
const updateQty = vi.fn()
const removeItem = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
 
  mockUseCartStore.mockImplementation(
    <T,>(selector: (state: CartStore) => T): T =>
      selector({
        items: [],
        addItem: vi.fn(),
        removeItem,
        updateQty,
        clear: vi.fn(),
      })
  )
})

describe("CartItemRow", () => {
  it("renders item name, price, and quantity", () => {
    render(<CartItemRow item={mockItem} />)
 
    expect(screen.getByText("Produk Tes")).toBeInTheDocument()
    expect(screen.getByText("10000")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })

   it("increments quantity when + is clicked", () => {
    render(<CartItemRow item={mockItem} />)
 
    fireEvent.click(screen.getByText("+"))
 
    expect(updateQty).toHaveBeenCalledWith("1", 3)
  })

  it("decrements quantity when - is clicked and quantity > 1", () => {
    render(<CartItemRow item={mockItem} />)
 
    fireEvent.click(screen.getByText("-"))
 
    expect(updateQty).toHaveBeenCalledWith("1", 1)
  })

  it("opens remove confirmation dialog when quantity is 1", () => {
    render(
      <CartItemRow
        item={{
          ...mockItem,
          quantity: 1,
        }}
      />
    )
 
    fireEvent.click(screen.getByText("-"))
 
    expect(screen.getByText("confirm-remove")).toBeInTheDocument()
  })
})
