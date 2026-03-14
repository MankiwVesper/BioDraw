import { CanvasRoot } from '../../canvas/CanvasRoot'
import type { ProjectDocument } from '../../domain/project/projectTypes'

interface CanvasPanelProps {
  project: ProjectDocument
  selectedObjectId: string | null
  onSelectObject: (id: string | null) => void
}

export function CanvasPanel({
  project,
  selectedObjectId,
  onSelectObject,
}: CanvasPanelProps) {
  return (
    <div className="canvas-panel">
      <div className="canvas-panel-header">{project.metadata.title}</div>
      <div className="canvas-panel-body">
        <div className="canvas-stage">
          <CanvasRoot
            objects={project.objects}
            width={project.canvas.width}
            height={project.canvas.height}
            background={project.canvas.background}
            selectedObjectId={selectedObjectId}
            onSelectObject={onSelectObject}
          />
        </div>
      </div>
    </div>
  )
}