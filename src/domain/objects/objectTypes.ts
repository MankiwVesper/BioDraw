export type ObjectType =
  | 'membrane'
  | 'region'
  | 'particle'
  | 'protein'
  | 'marker'
  | 'text'
  | 'arrow'

export interface BaseObject {
  id: string
  type: ObjectType
  name?: string
  x: number
  y: number
  width?: number
  height?: number
  rotation?: number
  visible: boolean
  locked?: boolean
  zIndex?: number
}

export interface MembraneObject extends BaseObject {
  type: 'membrane'
  label?: string
  showBilayerDetail: boolean
  styleVariant?: 'basic' | 'detailed'
}

export interface RegionObject extends BaseObject {
  type: 'region'
  label: string
  regionRole: 'inside' | 'outside' | 'custom'
  backgroundStyle?: string
}

export interface ParticleObject extends BaseObject {
  type: 'particle'
  label?: string
  particleName: string
  color: string
  size: number
  count: number
  shape?: 'circle' | 'square' | 'triangle'
  sourceRegionId?: string
  targetRegionId?: string
  movable: boolean
}

export interface ProteinObject extends BaseObject {
  type: 'protein'
  label?: string
  proteinType: 'channel' | 'carrier'
  active?: boolean
  requiresATP?: boolean
}

export interface MarkerObject extends BaseObject {
  type: 'marker'
  markerType: 'atp' | 'gradient' | 'energy' | 'custom'
  text?: string
  color?: string
}

export interface TextObject extends BaseObject {
  type: 'text'
  text: string
  fontSize: number
  color: string
  align?: 'left' | 'center' | 'right'
  fontWeight?: 'normal' | 'bold'
}

export interface ArrowObject extends BaseObject {
  type: 'arrow'
  x2: number
  y2: number
  color: string
  lineWidth?: number
  arrowStyle?: 'solid' | 'dashed'
  label?: string
}

export type SceneObject =
  | MembraneObject
  | RegionObject
  | ParticleObject
  | ProteinObject
  | MarkerObject
  | TextObject
  | ArrowObject