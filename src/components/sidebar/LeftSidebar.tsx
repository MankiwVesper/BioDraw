import type { SceneObject } from "../../domain/objects/objectTypes";
import { ObjectListPanel } from "./ObjectListPanel";

interface LeftSidebarProps {
  objects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onToggleObjectVisible: (objectId: string, visible: boolean) => void;
  onToggleObjectLocked: (objectId: string, locked: boolean) => void;
}

export function LeftSidebar({
  objects,
  selectedObjectId,
  onSelectObject,
  onToggleObjectVisible,
  onToggleObjectLocked,
}: LeftSidebarProps) {
  return (
    <ObjectListPanel
      objects={objects}
      selectedObjectId={selectedObjectId}
      onSelectObject={onSelectObject}
      onToggleObjectVisible={onToggleObjectVisible}
      onToggleObjectLocked={onToggleObjectLocked}
    />
  );
}
