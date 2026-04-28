import React from 'react'
import {
  fonts,
  getButtonStyle,
  sampleCards,
  shapes,
} from '../config/lookAndFeel'

const storedCardOptions = sampleCards.slice(0, 2)

const workflowStages = [
  { id: 1, label: 'Widget' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Select payment' },
  { id: 4, label: 'Manual entry' },
  { id: 5, label: 'Review' },
]

const initialContactDetails = {
  email: 'example@example.com',
  mobile: '+1 (413) 555-1234',
}

const initialManualPayment = {
  cardNumber: '4111 1111 1111 5678',
  expiry: '12/28',
  cvv: '123',
  firstName: 'Alex',
  lastName: 'Miller',
}

const initialShipTo = {
  firstName: 'Alex',
  lastName: 'Miller',
  addressLine1: '1000 Main Street',
  city: 'San Francisco',
  state: 'CA',
  zipCode: '94105',
  country: 'United States',
}

export function FlowPreview({ config }) {
  const [stage, setStage] = React.useState(1)
  const [contactDetails, setContactDetails] = React.useState(initialContactDetails)
  const [selectedCardId, setSelectedCardId] = React.useState(storedCardOptions[0].last4)
  const [paymentMode, setPaymentMode] = React.useState('stored')
  const [manualPayment, setManualPayment] = React.useState(initialManualPayment)
  const [linkCardToClickToPay, setLinkCardToClickToPay] = React.useState(true)
  const [shipTo, setShipTo] = React.useState(initialShipTo)
  const [isShipToEditing, setIsShipToEditing] = React.useState(false)

  const buttonClass = shapes[config.shape]
  const buttonStyle = getButtonStyle(config)
  const panelStyle = { fontFamily: fonts[config.font] }

  const selectedStoredCard =
    storedCardOptions.find((card) => card.last4 === selectedCardId) ?? storedCardOptions[0]

  const paymentSummary =
    paymentMode === 'manual'
      ? `Manual card ending in ${manualPayment.cardNumber.slice(-4)}`
      : `${selectedStoredCard.brand} ending in ${selectedStoredCard.last4}`

  function goToContactStage() {
    setStage(2)
  }

  function goToStoredPaymentStage() {
    setPaymentMode('stored')
    setStage(3)
  }

  function goToManualPaymentStage() {
    setPaymentMode('manual')
    setStage(4)
  }

  function goBack() {
    if (stage === 1) {
      return
    }

    if (stage === 2) {
      setStage(1)
      return
    }

    if (stage === 3) {
      setStage(2)
      return
    }

    if (stage === 4) {
      setStage(3)
      return
    }

    if (stage === 5) {
      setStage(paymentMode === 'manual' ? 4 : 3)
    }
  }

  function renderStage() {
    switch (stage) {
      case 1:
        return (
          <StageCard config={config}>
            <div className="space-y-5">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-sm font-medium text-slate-500">Web widget example</p>
                <div className="mt-5">
                  <button
                    className={`w-full border px-5 py-4 text-left text-sm font-semibold ${buttonClass}`}
                    onClick={() => setStage(2)}
                    style={buttonStyle}
                    type="button"
                  >
                    <ClickToPayButtonContent label={config.label} />
                  </button>
                </div>
              </div>
            </div>
          </StageCard>
        )
      case 2:
        return (
          <StageCard config={config}>
            <CardHeader config={config} onBack={goBack} title="CHECKOUT" />
            <div className="mt-4 w-full rounded-md border border-transparent bg-transparent">
              <SummaryCard>
                <SectionTitle title="CONTACT DETAILS" />
                <div className="mt-4 grid gap-3">
                  <InputField
                    label="Email address"
                    onChange={(value) =>
                      setContactDetails((current) => ({ ...current, email: value }))
                    }
                    value={contactDetails.email}
                  />
                  <InputField
                    label="Mobile number"
                    onChange={(value) =>
                      setContactDetails((current) => ({ ...current, mobile: value }))
                    }
                    value={contactDetails.mobile}
                  />
                </div>
              </SummaryCard>
            </div>
            <PrimaryAction
              buttonClass={buttonClass}
              buttonStyle={buttonStyle}
              className="mt-4"
              onClick={() => setStage(3)}
            >
              Continue
            </PrimaryAction>
          </StageCard>
        )
      case 3:
        return (
          <StageCard config={config}>
            <CardHeader config={config} onBack={goBack} title="CHECKOUT" />
            <div className="mt-4 w-full rounded-md border border-transparent bg-transparent">
              <SummaryCard>
                <EditableSummaryCard
                  onEdit={goToContactStage}
                  title="CONTACT DETAILS"
                >
                  <p className="text-base text-slate-900">{contactDetails.email}</p>
                  <p className="mt-2 text-sm text-slate-500">{contactDetails.mobile}</p>
                </EditableSummaryCard>
              </SummaryCard>

              <SummaryCard className="mt-3">
                <MergedSection title="PAYMENT DETAILS">
                  <div className="space-y-4">
                    <div className="border-b border-slate-200 pb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Email
                      </p>
                      <p className="mt-1 text-sm text-slate-900">{contactDetails.email}</p>
                    </div>

                    <div className="space-y-3">
                      {storedCardOptions.map((card) => (
                        <SelectableCard
                          card={card}
                          key={card.last4}
                          onClick={() => setSelectedCardId(card.last4)}
                          selected={selectedCardId === card.last4}
                        />
                      ))}
                    </div>
                  </div>
                </MergedSection>
              </SummaryCard>
            </div>
            <button
              className="mt-4 w-full text-center text-sm font-semibold text-blue-700 underline underline-offset-4"
              onClick={goToManualPaymentStage}
              type="button"
            >
              Enter card manually
            </button>
            <PrimaryAction
              buttonClass={buttonClass}
              buttonStyle={buttonStyle}
              className="mt-4"
              onClick={() => setStage(5)}
            >
              Continue
            </PrimaryAction>
          </StageCard>
        )
      case 4:
        return (
          <StageCard config={config}>
            <CardHeader config={config} onBack={goBack} title="CHECKOUT" />
            <div className="mt-4 w-full rounded-md border border-transparent bg-transparent">
              <SummaryCard>
                <EditableSummaryCard
                  onEdit={goToContactStage}
                  title="CONTACT DETAILS"
                >
                  <p className="text-base text-slate-900">{contactDetails.email}</p>
                  <p className="mt-2 text-sm text-slate-500">{contactDetails.mobile}</p>
                </EditableSummaryCard>
              </SummaryCard>

              <SummaryCard className="mt-3">
                <MergedSection title="PAYMENT DETAILS">
                  <div className="space-y-3">
                    <InputField
                      label="Card number"
                      onChange={(value) =>
                        setManualPayment((current) => ({ ...current, cardNumber: value }))
                      }
                      value={manualPayment.cardNumber}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        label="Expiry MM/YY"
                        onChange={(value) =>
                          setManualPayment((current) => ({ ...current, expiry: value }))
                        }
                        value={manualPayment.expiry}
                      />
                      <InputField
                        label="CVV"
                        onChange={(value) =>
                          setManualPayment((current) => ({ ...current, cvv: value }))
                        }
                        value={manualPayment.cvv}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        label="First name"
                        onChange={(value) =>
                          setManualPayment((current) => ({ ...current, firstName: value }))
                        }
                        value={manualPayment.firstName}
                      />
                      <InputField
                        label="Last name"
                        onChange={(value) =>
                          setManualPayment((current) => ({ ...current, lastName: value }))
                        }
                        value={manualPayment.lastName}
                      />
                    </div>
                  </div>
                </MergedSection>
              </SummaryCard>
            </div>
            <CheckboxCard
              checked={linkCardToClickToPay}
              className="mt-4"
              onToggle={() => setLinkCardToClickToPay((current) => !current)}
            >
              Link this card to <span className="font-semibold text-blue-700">Click to Pay</span>
            </CheckboxCard>
            <PrimaryAction
              buttonClass={buttonClass}
              buttonStyle={buttonStyle}
              className="mt-4"
              onClick={() => setStage(5)}
            >
              Continue
            </PrimaryAction>
          </StageCard>
        )
      case 5:
        return (
          <StageCard config={config}>
            <CardHeader config={config} onBack={goBack} title="CHECKOUT" />
            <div className="mt-4 w-full rounded-md border border-transparent bg-transparent">
              <div className="grid gap-3">
                <SummaryCard>
                  <EditableSummaryCard
                    onEdit={goToContactStage}
                    title="CONTACT DETAILS"
                  >
                    <p className="text-base text-slate-900">{contactDetails.email}</p>
                    <p className="mt-2 text-sm text-slate-500">{contactDetails.mobile}</p>
                  </EditableSummaryCard>
                </SummaryCard>

                <SummaryCard>
                  <EditableSummaryCard
                    onEdit={paymentMode === 'manual' ? goToManualPaymentStage : goToStoredPaymentStage}
                    title="PAYMENT DETAILS"
                  >
                    <p className="text-base text-slate-900">{paymentSummary}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {paymentMode === 'manual'
                        ? `${manualPayment.firstName} ${manualPayment.lastName}`
                        : 'Stored for fast Click to Pay checkout'}
                    </p>
                  </EditableSummaryCard>
                </SummaryCard>

                <SummaryCard>
                  <EditableSummaryCard
                    onEdit={() => setIsShipToEditing((current) => !current)}
                    title="SHIP TO"
                  >
                    {isShipToEditing ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <InputField
                            label="First name"
                            onChange={(value) =>
                              setShipTo((current) => ({ ...current, firstName: value }))
                            }
                            value={shipTo.firstName}
                          />
                          <InputField
                            label="Last name"
                            onChange={(value) =>
                              setShipTo((current) => ({ ...current, lastName: value }))
                            }
                            value={shipTo.lastName}
                          />
                        </div>
                        <InputField
                          label="Address line 1"
                          onChange={(value) =>
                            setShipTo((current) => ({ ...current, addressLine1: value }))
                          }
                          value={shipTo.addressLine1}
                        />
                        <div className="grid grid-cols-3 gap-3">
                          <InputField
                            label="City"
                            onChange={(value) =>
                              setShipTo((current) => ({ ...current, city: value }))
                            }
                            value={shipTo.city}
                          />
                          <InputField
                            label="State"
                            onChange={(value) =>
                              setShipTo((current) => ({ ...current, state: value }))
                            }
                            value={shipTo.state}
                          />
                          <InputField
                            label="Zip"
                            onChange={(value) =>
                              setShipTo((current) => ({ ...current, zipCode: value }))
                            }
                            value={shipTo.zipCode}
                          />
                        </div>
                        <InputField
                          label="Country"
                          onChange={(value) =>
                            setShipTo((current) => ({ ...current, country: value }))
                          }
                          value={shipTo.country}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-base text-slate-900">
                          {shipTo.firstName} {shipTo.lastName}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {shipTo.addressLine1}, {shipTo.city}, {shipTo.state} {shipTo.zipCode}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{shipTo.country}</p>
                      </>
                    )}
                  </EditableSummaryCard>
                </SummaryCard>
              </div>
            </div>

            <PrimaryAction
              buttonClass={buttonClass}
              buttonStyle={buttonStyle}
              className="mt-4"
              onClick={() => setStage(1)}
            >
              Continue
            </PrimaryAction>
          </StageCard>
        )
      default:
        return null
    }
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-5">
      <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 md:p-6">
        <div className="grid gap-5">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              How does Click to Pay work?
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Interactive workflow preview</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              This preview now behaves as a single workflow. Use the Click to Pay button to enter
              the flow, then move through contact details, stored-card selection, manual entry, and
              the final review state with edit paths.
            </p>
          </div>

          <WorkflowRail currentStage={stage} onSelectStage={setStage} />

          <div style={panelStyle}>{renderStage()}</div>
        </div>
      </div>
    </section>
  )
}

function WorkflowRail({ currentStage, onSelectStage }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-4 py-4">
      <div className="grid gap-3 md:grid-cols-5">
        {workflowStages.map((stage) => {
          const active = currentStage === stage.id
          const complete = currentStage > stage.id

          return (
            <button
              className={`rounded-md border px-4 py-3 text-left transition ${
                active
                  ? 'border-blue-600 bg-blue-50'
                  : complete
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-slate-200 bg-white'
              }`}
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              type="button"
            >
              <div
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  active ? 'text-blue-700' : complete ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                Step {stage.id}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{stage.label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StageCard({ children, config }) {
  return (
    <article
      className="w-full overflow-hidden rounded-md border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
      style={{ backgroundColor: config.checkoutBackground }}
    >
      {children}
    </article>
  )
}

function CardHeader({ config, onBack, title }) {
  return (
    <div
      className="-mx-4 -mt-4 mb-4 px-4 py-4"
      style={{
        backgroundColor: config.headerBackground,
        color: config.headerTextColor,
      }}
    >
      <div className="flex items-center justify-between">
        <button
          className="text-xl"
          onClick={onBack}
          type="button"
        >
          ←
        </button>
        <span className="text-2xl font-semibold tracking-wide">{title}</span>
        <span className="opacity-0">←</span>
      </div>
    </div>
  )
}

function SectionTitle({ title }) {
  return <p className="text-sm font-semibold text-slate-900">{title}</p>
}

function MergedSection({ children, title }) {
  return (
    <section className="rounded-md border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
      <SectionTitle title={title} />
      <div className="mt-3">{children}</div>
    </section>
  )
}

function EditableSummaryCard({ children, onEdit, title }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <SectionTitle title={title} />
        <button
          className="text-sm font-semibold text-blue-700 underline underline-offset-4"
          onClick={onEdit}
          type="button"
        >
          Edit
        </button>
      </div>
      {children}
    </section>
  )
}

function SummaryCard({ children, className = '' }) {
  return <div className={`rounded-md border border-slate-200 bg-white p-4 ${className}`}>{children}</div>
}

function SelectableCard({ card, onClick, selected }) {
  return (
    <button
      className={`w-full rounded-md border p-3 text-left transition ${
        selected ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-white'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone} text-sm font-semibold ${card.text}`}
        >
          {card.brand}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">•••• {card.last4}</p>
          <p className="text-sm text-slate-500">Stored for Click to Pay</p>
        </div>
      </div>
    </button>
  )
}

function InputField({ label, onChange, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      <input
        className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  )
}

function CheckboxCard({ checked, children, className = '', onToggle }) {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-4 text-left text-sm text-slate-700 ${className}`}
      onClick={onToggle}
      type="button"
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded border ${
          checked ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
        }`}
      >
        {checked ? '✓' : ''}
      </span>
      <span>{children}</span>
    </button>
  )
}

function PrimaryAction({ buttonClass, buttonStyle, children, className = '', onClick }) {
  return (
    <button
      className={`w-full border px-5 py-4 text-sm font-semibold ${buttonClass} ${className}`}
      onClick={onClick}
      style={buttonStyle}
      type="button"
    >
      {children}
    </button>
  )
}

function ClickToPayButtonContent({ label }) {
  return (
    <span className="flex items-center justify-between gap-4">
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/25 bg-white/30">
          <CardGlyph />
        </span>
        <span className="truncate">{label}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
          Click to Pay
        </span>
        <NetworkDots />
      </span>
    </span>
  )
}

function CardGlyph() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9.5H21" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 14.5H10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function NetworkDots() {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </span>
  )
}
