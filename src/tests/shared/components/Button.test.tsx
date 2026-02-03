import { render, screen } from "@testing-library/react"
import React from "react"
import { Button } from "../../../shared/components/Button"

describe("Button", () => {
  it("renders a button with default variant and size classes", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("inline-flex")
    expect(button).toHaveClass("bg-primary-200")
    expect(button).toHaveClass("text-white")
    expect(button).toHaveClass("h-10")
    expect(button).toHaveClass("px-4")
  })

  it("applies variant and size classes", () => {
    render(
      <Button variant="secondary" size="sm">
        Secondary
      </Button>
    )

    const button = screen.getByRole("button", { name: "Secondary" })
    expect(button).toHaveClass("border")
    expect(button).toHaveClass("border-primary-200")
    expect(button).toHaveClass("text-primary-200")
    expect(button).toHaveClass("h-8")
    expect(button).toHaveClass("px-3")
  })

  it("supports icon-only layout", () => {
    render(
      <Button aria-label="Icon button" isIconOnly>
        x
      </Button>
    )

    const button = screen.getByRole("button", { name: "Icon button" })
    expect(button).toHaveClass("px-0")
    expect(button).toHaveClass("aspect-square")
  })

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: "Docs" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass("inline-flex")
  })

  it("forwards refs to the underlying button element", () => {
    const ref = React.createRef<HTMLButtonElement>()

    render(<Button ref={ref}>Ref</Button>)

    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
