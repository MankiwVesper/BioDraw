import type { ProjectDocument } from '../../domain/project/projectTypes'
import type { SceneObject } from '../../domain/objects/objectTypes'
import { CanvasPanel } from '../canvas/CanvasPanel'
import { RightInspector } from '../inspector/RightInspector'
import { LeftSidebar } from '../sidebar/LeftSidebar'
import { BottomStepBar } from '../stepbar/BottomStepBar'
import { TopToolbar } from '../toolbar/TopToolbar'

interface EditorLayoutProps {
  project: ProjectDocument
  selectedObjectId: string | null
  onSelectObject: (id: string | null) => void
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void
}

export function EditorLayout({
  project,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
}: EditorLayoutProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr 320px',
        gridTemplateRows: '56px 1fr 96px',
        height: '100vh',
        background: '#f3f4f6',
      }}
    >
      <div style={{ gridColumn: '1 / 4', gridRow: '1 / 2' }}>
        <TopToolbar />
      </div>

      <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
        <LeftSidebar />
      </div>

      <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3', minWidth: 0 }}>
        <CanvasPanel
          project={project}
          selectedObjectId={selectedObjectId}
          onSelectObject={onSelectObject}
        />
      </div>

      <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3', minWidth: 0 }}>
        <RightInspector
          project={project}
          selectedObjectId={selectedObjectId}
          onUpdateObject={onUpdateObject}
        />
      </div>

      <div style={{ gridColumn: '1 / 4', gridRow: '3 / 4' }}>
        <BottomStepBar steps={project.steps} />
      </div>
    </div>
  )
}