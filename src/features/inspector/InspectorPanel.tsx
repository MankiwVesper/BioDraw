import type { SceneObject } from '../../domain/objects/objectTypes'
import RenderInspector from './renderInspector'

export type InspectorObjectLike = SceneObject | null

type InspectorPanelProps = {
  selectedObject: InspectorObjectLike
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void
}

export function InspectorPanel({
  selectedObject,
  onUpdateObject,
}: InspectorPanelProps) {
  return (
    <aside
      style={{
        height: '100%',
        boxSizing: 'border-box',
        padding: 12,
        overflowY: 'auto',
        borderLeft: '1px solid #e5e7eb',
        background: '#ffffff',
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        属性面板
      </div>

      <RenderInspector
        selectedObject={selectedObject}
        onUpdateObject={onUpdateObject}
      />
    </aside>
  )
}