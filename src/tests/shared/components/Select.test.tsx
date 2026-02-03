import { render, screen } from "@testing-library/react"
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/Select"

describe("Select", () => {
  it("renders trigger with default variant and size classes", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
      </Select>
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveClass("border-primary-200")
    expect(trigger).toHaveClass("text-primary-200")
    expect(trigger).toHaveClass("h-11")
    expect(trigger).toHaveClass("px-4")
  })

  it("applies variant and size classes", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Fruit" variant="error" size="sm">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
      </Select>
    )

    const trigger = screen.getByRole("combobox", { name: "Fruit" })
    expect(trigger).toHaveClass("border-danger-500")
    expect(trigger).toHaveClass("text-danger-900")
    expect(trigger).toHaveClass("h-9")
    expect(trigger).toHaveClass("px-3")
  })

  it("renders items when opened", () => {
    render(
      <Select defaultOpen>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    )

    expect(screen.getByText("Apple")).toBeInTheDocument()
    expect(screen.getByText("Banana")).toBeInTheDocument()
  })
})

describe("SelectField", () => {
  it("renders label and required indicator", () => {
    render(
      <SelectField label="Category" required>
        <div>child</div>
      </SelectField>
    )

    expect(screen.getByText("Category")).toBeInTheDocument()
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("renders helper text when no error", () => {
    render(
      <SelectField helperText="Optional">
        <div>child</div>
      </SelectField>
    )

    expect(screen.getByText("Optional")).toBeInTheDocument()
  })

  it("renders error text when provided", () => {
    render(
      <SelectField error="Required">
        <div>child</div>
      </SelectField>
    )

    expect(screen.getByText("Required")).toBeInTheDocument()
  })
})
