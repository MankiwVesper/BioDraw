import { useState } from 'react'
import { EditorLayout } from '../../components/layout/EditorLayout'
import { mockProject } from '../../domain/project/mockProject'

export function EditorPage() {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null)

  return (
    <EditorLayout
      project={mockProject}
      selectedObjectId={selectedObjectId}
      onSelectObject={setSelectedObjectId}
    />
  )
}