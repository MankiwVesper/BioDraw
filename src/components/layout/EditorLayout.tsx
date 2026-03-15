import type { KeyboardEvent } from "react";

import type { SceneObject } from "../../domain/objects/objectTypes";
import type { ProjectDocument } from "../../domain/project/projectTypes";
import { CanvasPanel } from "../canvas/CanvasPanel";
import { RightInspector } from "../inspector/RightInspector";
import { LeftSidebar } from "../sidebar/LeftSidebar";
import { BottomStepBar } from "../stepbar/BottomStepBar";
import { TopToolbar } from "../toolbar/TopToolbar";

interface EditorLayoutProps {
  project: ProjectDocument;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onUpdateObject: (objectId: string, patch: Partial<SceneObject>) => void;
  onDeleteObject: (objectId: string) => void;
  onDuplicateObject: (objectId: string) => void;
  onDeleteSelected: () => void;
  onDuplicateSelected: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function EditorLayout({
  project,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  onDeleteObject,
  onDuplicateObject,
  onDeleteSelected,
  onDuplicateSelected,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: EditorLayoutProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement | null;
    const tagName = target?.tagName?.toLowerCase();

    const isTypingTarget =
      tagName === "input" ||
      tagName === "textarea" ||
      tagName === "select" ||
      target?.isContentEditable;

    if (isTypingTarget) {
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();

      if (event.shiftKey) {
        onRedo();
      } else {
        onUndo();
      }
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
      event.preventDefault();
      onRedo();
      return;
    }

    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      onDeleteSelected();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
      event.preventDefault();
      onDuplicateSelected();
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        display: "grid",
        gridTemplateColumns: "220px minmax(0, 1fr) 220px",
        gridTemplateRows: "56px minmax(0, 1fr) 88px",
        height: "100vh",
        background: "#e5e7eb",
        outline: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "1 / 2",
          minHeight: 0,
          borderBottom: "1px solid #d1d5db",
          background: "#ffffff",
        }}
      >
        <TopToolbar
          onUndo={onUndo}
          onRedo={onRedo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
      </div>

      <div
        style={{
          gridColumn: "1 / 2",
          gridRow: "2 / 3",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <LeftSidebar
          objects={project.objects}
          selectedObjectId={selectedObjectId}
          onSelectObject={onSelectObject}
          onToggleObjectVisible={(objectId, visible) =>
            onUpdateObject(objectId, { visible })
          }
          onToggleObjectLocked={(objectId, locked) =>
            onUpdateObject(objectId, { locked })
          }
        />
      </div>

      <div
        style={{
          gridColumn: "2 / 3",
          gridRow: "2 / 3",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          background: "#f3f4f6",
          padding: 10,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            height: "100%",
            minHeight: 0,
            border: "1px solid #d1d5db",
            borderRadius: 10,
            overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <CanvasPanel
            project={project}
            selectedObjectId={selectedObjectId}
            onSelectObject={onSelectObject}
          />
        </div>
      </div>

      <div
        style={{
          gridColumn: "3 / 4",
          gridRow: "2 / 3",
          minWidth: 0,
          minHeight: 0,
          overflow: "hidden",
          background: "#ffffff",
        }}
      >
        <RightInspector
          project={project}
          selectedObjectId={selectedObjectId}
          onUpdateObject={onUpdateObject}
          onDeleteObject={onDeleteObject}
          onDuplicateObject={onDuplicateObject}
        />
      </div>

      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "3 / 4",
          minHeight: 0,
          borderTop: "1px solid #d1d5db",
          background: "#ffffff",
        }}
      >
        <BottomStepBar steps={project.steps} />
      </div>
    </div>
  );
}
