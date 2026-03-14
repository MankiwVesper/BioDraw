import type { ActionDefinition, StepDefinition } from '../animation/animationTypes'
import type { SceneObject } from '../objects/objectTypes'

export type ThemeType =
  | 'membrane_transport'
  | 'mitosis'
  | 'meiosis'
  | 'dna_replication'
  | 'protein_synthesis'

export interface ProjectMetadata {
  id: string
  title: string
  description?: string
  themeType: ThemeType
  contentVersion: number
  createdAt?: string
  updatedAt?: string
  ownerId?: string
}

export interface CanvasState {
  width: number
  height: number
  background: string
  zoom: number
  panX: number
  panY: number
  showGrid?: boolean
}

export interface PlaybackConfig {
  loop: boolean
  speed: number
  autoPlay?: boolean
}

export interface TemplateInfo {
  sourceTemplateId?: string
  sourceTemplateName?: string
}

export interface ProjectDocument {
  metadata: ProjectMetadata
  canvas: CanvasState
  objects: SceneObject[]
  steps: StepDefinition[]
  actions: ActionDefinition[]
  playback: PlaybackConfig
  templateInfo?: TemplateInfo
}