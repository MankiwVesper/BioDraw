import { CanvasRoot } from "../../canvas/CanvasRoot";
import type { SceneObject } from "../../domain/objects/objectTypes";
import type { ProjectDocument } from "../../domain/project/projectTypes";

interface CanvasPanelProps {
  project: ProjectDocument;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
  onBeginInteraction: () => void;
  onCommitInteraction: () => void;
}

export function CanvasPanel({
  project,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  onBeginInteraction,
  onCommitInteraction,
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
            onUpdateObject={onUpdateObject}
            onBeginInteraction={onBeginInteraction}
            onCommitInteraction={onCommitInteraction}
          />
        </div>
      </div>
    </div>
  );
}
