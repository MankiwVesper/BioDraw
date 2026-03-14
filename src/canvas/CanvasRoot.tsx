import type { SceneObject } from '../domain/objects/objectTypes'
import { renderSceneObject } from './renderSceneObject'

interface CanvasRootProps {
  objects: SceneObject[]
  width: number
  height: number
  background: string
  selectedObjectId: string | null
  onSelectObject: (id: string | null) => void
}

export function CanvasRoot({
  objects,
  width,
  height,
  background,
  selectedObjectId,
  onSelectObject,
}: CanvasRootProps) {
  const sortedObjects = [...objects].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', background }}
      onClick={() => onSelectObject(null)}
    >
      {sortedObjects.map((object) =>
        renderSceneObject(object, {
          selected: object.id === selectedObjectId,
          onSelect: onSelectObject,
        }),
      )}
    </svg>
  )
}