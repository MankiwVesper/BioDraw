import type { SceneObject } from '../../domain/objects/objectTypes'
import type { ProjectDocument } from '../../domain/project/projectTypes'
import { InspectorPanel } from '../../features/inspector/InspectorPanel'

interface RightInspectorProps {
  project: ProjectDocument
  selectedObjectId: string | null
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void
}

export function RightInspector({
  project,
  selectedObjectId,
  onUpdateObject,
}: RightInspectorProps) {
  const selectedObject =
    project.objects.find((object) => object.id === selectedObjectId) ?? null

  return (
    <InspectorPanel
      selectedObject={selectedObject}
      onUpdateObject={onUpdateObject}
    />
  )
}