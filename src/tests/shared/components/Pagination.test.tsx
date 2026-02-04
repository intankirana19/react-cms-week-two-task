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
})
