import { render, screen } from "@testing-library/react"
import { Pagination } from "../../../shared/components/Pagination"

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
})
