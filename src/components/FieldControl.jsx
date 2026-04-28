import {
  buttonLabels,
  createStyleColorUpdate,
  fonts,
  getActiveButtonStyleColor,
  getFieldLabel,
  shapes,
  styleNotes,
} from '../config/lookAndFeel'

export function FieldControl({ config, field, setConfig }) {
  const id = `field-${field}`

  if (field === 'shape') {
    return (
      <FieldShell config={config} field={field} id={id}>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(shapes).map((shape) => (
            <button
              key={shape}
              className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                config.shape === shape
                  ? 'border-teal-700 bg-teal-50 text-teal-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
              onClick={() => setConfig((current) => ({ ...current, shape }))}
              type="button"
            >
              {shape}
            </button>
          ))}
        </div>
      </FieldShell>
    )
  }

  if (field === 'label') {
    return (
      <FieldShell config={config} field={field} id={id}>
        <select
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-600"
          id={id}
          onChange={(event) =>
            setConfig((current) => ({ ...current, label: event.target.value }))
          }
          value={config.label}
        >
          {buttonLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </FieldShell>
    )
  }

  if (field === 'style') {
    return (
      <FieldShell config={config} field={field} id={id}>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(styleNotes).map((style) => (
            <button
              key={style}
              className={`rounded-2xl border px-3 py-3 text-left transition ${
                config.style === style
                  ? 'border-teal-700 bg-teal-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              onClick={() => setConfig((current) => ({ ...current, style }))}
              type="button"
            >
              <div className="text-sm font-semibold text-slate-900">{style}</div>
              <div className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-500">
                {style === 'Outlined'
                  ? 'Outline colour\nText colour'
                  : 'Fill colour\nText colour'}
              </div>
            </button>
          ))}
        </div>
      </FieldShell>
    )
  }

  if (field === 'font') {
    return (
      <FieldShell config={config} field={field} id={id}>
        <select
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-600"
          id={id}
          onChange={(event) =>
            setConfig((current) => ({ ...current, font: event.target.value }))
          }
          value={config.font}
        >
          {Object.keys(fonts).map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </FieldShell>
    )
  }

  if (field === 'buttonStyleColor') {
    const value = getActiveButtonStyleColor(config)

    return (
      <FieldShell config={config} field={field} id={id}>
        <ColorField
          id={id}
          onChange={(nextValue) =>
            setConfig((current) => ({ ...current, ...createStyleColorUpdate(current, nextValue) }))
          }
          value={value}
        />
      </FieldShell>
    )
  }

  return (
    <FieldShell config={config} field={field} id={id}>
      <ColorField
        id={id}
        onChange={(value) =>
          setConfig((current) => ({ ...current, [field]: value }))
        }
        value={config[field]}
      />
    </FieldShell>
  )
}

function FieldShell({ children, config, field, id }) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{getFieldLabel(field, config)}</span>
      {children}
    </label>
  )
}

function ColorField({ id, onChange, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3">
      <input
        className="h-11 w-14 cursor-pointer rounded-xl border-0 bg-transparent p-0"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        type="color"
        value={value}
      />
      <input
        className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-teal-600"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </div>
  )
}
