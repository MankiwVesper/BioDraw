import { useCallback, useState } from 'react'

import { EditorLayout } from '../../components/layout/EditorLayout'
import { mockProject } from '../../domain/project/mockProject'
import type { SceneObject } from '../../domain/objects/objectTypes'
import type { ProjectDocument } from '../../domain/project/projectTypes'

export function EditorPage() {
  const [project, setProject] = useState<ProjectDocument>(mockProject)
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)

  const handleUpdateObject = useCallback(
    (objectId: string, patch: Partial<SceneObject>) => {
      setProject((prev) => ({
        ...prev,
        objects: prev.objects.map((object) =>
          object.id === objectId
            ? ({ ...object, ...patch } as SceneObject)
            : object,
        ),
      }))
    },
    [],
  )

  return (
    <EditorLayout
      project={project}
      selectedObjectId={selectedObjectId}
      onSelectObject={setSelectedObjectId}
      onUpdateObject={handleUpdateObject}
    />
  )
}