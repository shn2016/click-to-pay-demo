import { controlGroups, initialState } from '../config/lookAndFeel'
import { FieldControl } from './FieldControl'

export function ControlsPanel({ config, setConfig }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-700">
          Quest Click to Pay
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Look and Feel Playground
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Based on the Quest docs options for button shape, label, style, checkout font,
          checkout background, header font colour, and header background.
        </p>
      </div>

      <div className="mt-6 space-y-6">
        {controlGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {group.title}
              </h2>
              {group.title === 'Button' ? (
                <button
                  className="text-xs font-medium text-slate-500 transition hover:text-slate-900"
                  onClick={() => setConfig(initialState)}
                  type="button"
                >
                  Reset defaults
                </button>
              ) : null}
            </div>

            {group.fields.map((field) => (
              <FieldControl
                key={field}
                config={config}
                field={field}
                setConfig={setConfig}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Current config
        </p>
        <pre className="mt-3 overflow-auto text-xs leading-6 text-slate-600">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </section>
  )
}
