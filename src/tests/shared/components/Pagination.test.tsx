import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { Pagination } from "../../../shared/components/Pagination"

vi.mock("../../../shared/components/Select", () => {
  const Select = ({
    value,
    onValueChange,
    children,
  }: {
    value?: string
    onValueChange?: (value: string) => void
    children: React.ReactNode
  }) => (
    <select
      aria-label="Rows per page"
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
    >
      {children}
    </select>
  )

  const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
  const SelectValue = () => null
  const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
  const SelectItem = ({
    value,
    children,
  }: {
    value: string
    children: React.ReactNode
  }) => <option value={value}>{children}</option>

  return {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  }
})

describe("Pagination", () => {
  it("renders rows per page selector when handler is provided", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        itemsPerPage={10}
        totalItems={50}
        onPageChange={() => {}}
        onItemsPerPageChange={() => {}}
      />
    )

    expect(screen.getByText("Rows per page")).toBeInTheDocument()
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  it("does not render rows per page selector when handler is missing", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        itemsPerPage={10}
        totalItems={50}
        onPageChange={() => {}}
      />
    )

    expect(screen.queryByText("Rows per page")).not.toBeInTheDocument()
  })

  it("disables previous and next buttons at the boundaries", () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        itemsPerPage={10}
        totalItems={30}
        onPageChange={() => {}}
      />
    )

    const buttonsPage1 = screen.getAllByRole("button")
    expect(buttonsPage1[0]).toBeDisabled()
    expect(buttonsPage1[buttonsPage1.length - 1]).not.toBeDisabled()

    rerender(
      <Pagination
        currentPage={3}
        totalPages={3}
        itemsPerPage={10}
        totalItems={30}
        onPageChange={() => {}}
      />
    )

    const buttonsPage3 = screen.getAllByRole("button")
    expect(buttonsPage3[0]).not.toBeDisabled()
    expect(buttonsPage3[buttonsPage3.length - 1]).toBeDisabled()
  })

  it("calls onPageChange when a page number is clicked", () => {
    const handlePageChange = vi.fn()

    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        itemsPerPage={10}
        totalItems={50}
        onPageChange={handlePageChange}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "4" }))
    expect(handlePageChange).toHaveBeenCalledWith(4)
  })

  it("renders disabled ellipsis for large page counts", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={() => {}}
      />
    )

    expect(screen.getByRole("button", { name: "..." })).toBeDisabled()
  })

  it("calls onItemsPerPageChange with selected value", () => {
    const handleItemsPerPageChange = vi.fn()

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        itemsPerPage={10}
        totalItems={50}
        onPageChange={() => {}}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    )

    fireEvent.change(screen.getByRole("combobox", { name: "Rows per page" }), {
      target: { value: "20" },
    })

    expect(handleItemsPerPageChange).toHaveBeenCalledWith(20)
  })
})
