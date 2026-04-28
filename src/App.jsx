import React from 'react'
import { initialState } from './config/lookAndFeel'
import { ControlsPanel } from './components/ControlsPanel'
import { FlowPreview } from './components/FlowPreview'

function App() {
  const [config, setConfig] = React.useState(initialState)

  return (
    <main className="h-screen overflow-hidden p-4 text-slate-900 md:p-6">
      <div className="mx-auto grid h-full max-w-7xl gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="min-h-0 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="h-full overflow-y-auto pr-1">
            <ControlsPanel config={config} setConfig={setConfig} />
          </div>
        </div>
        <div className="min-h-0 overflow-y-auto pr-1">
          <FlowPreview config={config} />
        </div>
      </div>
    </main>
  )
}

export default App
