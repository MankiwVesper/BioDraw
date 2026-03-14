export interface Point {
  x: number
  y: number
}

export type ActionType =
  | 'show'
  | 'hide'
  | 'move'
  | 'change_property'

export interface BaseAction {
  id: string
  type: ActionType
  targetId: string
  stepId: string
  duration?: number
  delay?: number
}

export interface ShowAction extends BaseAction {
  type: 'show'
}

export interface HideAction extends BaseAction {
  type: 'hide'
}

export interface MoveAction extends BaseAction {
  type: 'move'
  from: Point
  to: Point
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
}

export interface ChangePropertyAction extends BaseAction {
  type: 'change_property'
  changes: Record<string, unknown>
}

export type ActionDefinition =
  | ShowAction
  | HideAction
  | MoveAction
  | ChangePropertyAction

export interface StepDefinition {
  id: string
  name: string
  description?: string
  actionIds: string[]
  order: number
}