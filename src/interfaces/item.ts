export interface Appearance {
  id: number
  name?: string | null
  description?: string | null
}

export const defaultAppearance: Appearance = {
  id: 0,
  name: '',
  description: ''
}