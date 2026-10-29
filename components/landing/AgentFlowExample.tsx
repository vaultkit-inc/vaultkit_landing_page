import { agentFlow as flow } from "@/content/landing"

function WindowDots() {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-2.5 rounded-full bg-night-border" />
      ))}
    </span>
  )
}

/** The illustrative terminal: an agent asks, a reviewer approves, rows come back masked. */
export function AgentFlowExample() {
  const { table } = flow
  return (
    <figure aria-label={flow.label} className="m-0 flex min-w-0 flex-[1_1_460px] flex-col gap-3">
      <div className="overflow-hidden rounded-panel border border-night-line bg-night-deep shadow-terminal">
        <div className="flex items-center gap-2 border-b border-night-line px-3.5 py-2.5 text-xs text-night-subtle">
          <WindowDots />
          <span className="pl-1.5">{flow.windowTitle}</span>
        </div>
        <div className="flex flex-col gap-3.5 px-[18px] pt-[18px] pb-5 font-mono text-code text-night-text">
          <p className="m-0">
            <span className="text-accent-glow">{flow.prompt.speaker}</span>
            {"  "}
            {flow.prompt.text}
          </p>
          <p className="m-0 border-l-2 border-night-border pl-3 text-night-subtle">{flow.toolCall}</p>
          <p className="m-0">
            <span className="text-warn-glow">{flow.approval.status}</span>
            <span className="text-night-subtle">
              {"  "}
              {flow.approval.detail}
            </span>
          </p>
          <div className="flex items-center gap-2.5 rounded-button bg-paper px-3 py-2.5 font-sans text-ink">
            <span aria-hidden="true" className="flex size-[22px] flex-none items-center justify-center rounded-full bg-allow-strong text-paper">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="flex-1">
              <strong className="font-semibold">{flow.approvedBy.name}</strong> {flow.approvedBy.action}
            </span>
            <span className="text-xs text-ink-subtle">{flow.approvedBy.expiry}</span>
          </div>
          <p className="m-0">
            <span className="text-allow-glow">{flow.result.status}</span>
            <span className="text-night-subtle">
              {"  "}
              {flow.result.detail}
            </span>
          </p>
          <div className="overflow-x-auto rounded-control bg-night px-3 py-2.5 text-xs" tabIndex={0} role="region" aria-label="Query result">
            <table className="w-full min-w-[300px] border-collapse text-left">
              <thead>
                <tr>
                  {table.columns.map((c) => (
                    <th key={c} scope="col" className="pr-4 font-normal text-night-subtle">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i} className="pr-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <figcaption className="text-center text-xs text-night-subtle">{flow.caption}</figcaption>
    </figure>
  )
}
