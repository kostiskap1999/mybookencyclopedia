export interface Appearance {
  id: number
  attribute?: string | null
  value?: string | null
}

export const defaultAppearance: Appearance = {
  id: 0,
  attribute: '',
  value: ''
}