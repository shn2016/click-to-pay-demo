export const fonts = {
  'Roboto Slab': "'Roboto Slab', serif",
  Montserrat: "'Montserrat', sans-serif",
  Inter: "'Inter', sans-serif",
  Raleway: "'Raleway', sans-serif",
  'Open Sans': "'Open Sans', sans-serif",
}

export const buttonLabels = [
  'Add card',
  'Card payment',
  'Checkout with card',
  'Debit/Credit payment',
  'Donate with card',
  'Pay with card',
  'Save card',
  'Subscribe with card',
]

export const shapes = {
  'Rounded Corner': 'rounded-2xl',
  'Sharp Corner': 'rounded-md',
  Pill: 'rounded-full',
}

export const styleNotes = {
  Outlined: 'Outline colour + text colour',
  Filled: 'Fill colour + text colour',
}

export const controlGroups = [
  {
    title: 'Button',
    fields: ['shape', 'label', 'style', 'buttonStyleColor', 'buttonTextColor'],
  },
  {
    title: 'Checkout',
    fields: ['font', 'checkoutBackground', 'headerTextColor', 'headerBackground'],
  },
]

export const initialState = {
  shape: 'Rounded Corner',
  label: 'Pay with card',
  style: 'Filled',
  font: 'Inter',
  filledButtonColor: '#ffffff',
  outlinedButtonColor: '#cbd5e1',
  buttonTextColor: '#0f172a',
  checkoutBackground: '#ffffff',
  headerTextColor: '#0f172a',
  headerBackground: '#ffffff',
}

export const sampleCards = [
  { brand: 'Visa', last4: '4242', tone: 'from-sky-100 to-blue-100', text: 'text-blue-700' },
  { brand: 'Visa', last4: '5555', tone: 'from-indigo-100 to-slate-100', text: 'text-indigo-700' },
  { brand: 'Amex', last4: '1008', tone: 'from-cyan-100 to-teal-100', text: 'text-cyan-700' },
  { brand: 'Visa', last4: '5678', tone: 'from-emerald-100 to-teal-100', text: 'text-emerald-700' },
]

export const fieldMeta = {
  shape: { label: 'Button shape' },
  label: { label: 'Button label' },
  style: { label: 'Button style' },
  buttonStyleColor: { label: 'Button colour' },
  buttonTextColor: { label: 'Button text colour' },
  font: { label: 'Checkout font' },
  checkoutBackground: { label: 'Checkout background colour' },
  headerTextColor: { label: 'Header font colour' },
  headerBackground: { label: 'Header background' },
}

export function getActiveButtonStyleColor(config) {
  return config.style === 'Outlined' ? config.outlinedButtonColor : config.filledButtonColor
}

export function getButtonStyle(config) {
  const activeButtonColor = getActiveButtonStyleColor(config)
  const safeBorderColor = activeButtonColor === '#ffffff' ? '#cbd5e1' : activeButtonColor

  if (config.style === 'Filled') {
    return {
      backgroundColor: activeButtonColor,
      color: config.buttonTextColor,
      borderColor: safeBorderColor,
    }
  }

  return {
    backgroundColor: '#ffffff',
    color: config.buttonTextColor,
    borderColor: safeBorderColor,
  }
}

export function getFieldLabel(field, config) {
  if (field === 'buttonStyleColor') {
    return config.style === 'Outlined' ? 'Outline colour' : 'Fill colour'
  }

  if (field === 'buttonTextColor') {
    return 'Text colour'
  }

  return fieldMeta[field].label
}

export function createStyleColorUpdate(config, value) {
  return config.style === 'Outlined'
    ? { outlinedButtonColor: value }
    : { filledButtonColor: value }
}
