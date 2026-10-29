import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Hero } from "./Hero"
import { Nav } from "./Nav"
import { PartnerCta } from "./PartnerCta"
import { PartnerDialogProvider } from "./PartnerButton"

function renderPage() {
  return render(
    <PartnerDialogProvider>
      <Nav />
      <Hero />
      <PartnerCta />
    </PartnerDialogProvider>,
  )
}

const ctas = () => screen.getAllByRole("button", { name: "Become a design partner" })

async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  const dialog = screen.getByRole("dialog")
  await user.type(within(dialog).getByLabelText("Work email"), "ada@example.com")
  await user.type(within(dialog).getByLabelText("Company"), "Acme")
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("DesignPartnerDialog", () => {
  it("opens from each CTA: nav, hero and bottom section", async () => {
    const user = userEvent.setup()
    renderPage()
    expect(ctas()).toHaveLength(3)
    for (let i = 0; i < 3; i++) {
      await user.click(ctas()[i])
      expect(screen.getByRole("dialog", { name: "Become a design partner" })).toBeInTheDocument()
      await user.keyboard("{Escape}")
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    }
  })

  it("validates required fields before sending", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const user = userEvent.setup()
    renderPage()
    await user.click(ctas()[0])

    await user.click(screen.getByRole("button", { name: "Send" }))
    expect(screen.getByText("Enter your work email.")).toBeInTheDocument()
    expect(screen.getByText("Enter your company.")).toBeInTheDocument()
    expect(screen.getByLabelText("Work email")).toHaveFocus()

    await user.type(screen.getByLabelText("Work email"), "not-an-email{Enter}")
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("shows the success state after a successful submit", async () => {
    let resolve: (res: Response) => void = () => {}
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)))
    vi.stubGlobal("fetch", fetchMock)
    const user = userEvent.setup()
    renderPage()
    await user.click(ctas()[1])
    await fillRequired(user)
    await user.click(screen.getByRole("button", { name: "Incident response" }))
    await user.click(screen.getByRole("button", { name: "Send" }))

    expect(screen.getByRole("button", { name: /Sending/ })).toBeDisabled()
    const body = JSON.parse((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body as string)
    expect(body).toMatchObject({ email: "ada@example.com", company: "Acme", useCases: ["incident_response"], website: "" })

    resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    expect(await screen.findByRole("heading", { name: "Thanks, it's on its way" })).toBeInTheDocument()
    // The corner X and the footer button.
    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(2)
  })

  it("shows the error state with the founder's email when the submit fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 500 })))
    const user = userEvent.setup()
    renderPage()
    await user.click(ctas()[2])
    await fillRequired(user)
    await user.keyboard("{Enter}")

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent("Something went wrong")
    expect(within(alert).getByRole("link", { name: "founders@vaultkit.io" })).toHaveAttribute("href", "mailto:founders@vaultkit.io")
    expect(screen.getByRole("button", { name: "Send" })).toBeEnabled()
  })

  it("closes on Esc and returns focus to the CTA that opened it", async () => {
    const user = userEvent.setup()
    renderPage()
    const opener = ctas()[1]
    await user.click(opener)
    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())
    expect(opener).toHaveFocus()
  })
})
