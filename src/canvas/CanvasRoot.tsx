import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { SceneObject } from "../domain/objects/objectTypes";
import { SceneObjectRenderer } from "./renderSceneObject";

type ArrowDragMode = "move" | "arrow-start" | "arrow-end";

interface CanvasRootProps {
  objects: SceneObject[];
  width: number;
  height: number;
  background: string;
  selectedObjectId: string | null;
  onSelectObject: (id: string | null) => void;
  onUpdateObject?: (objectId: string, patch: Partial<SceneObject>) => void;
  onBeginInteraction?: () => void;
  onCommitInteraction?: () => void;
}

type DragState = {
  objectId: string;
  pointerId: number;
  objectType: SceneObject["type"];
  dragMode: ArrowDragMode;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startX2?: number;
  startY2?: number;
  moved: boolean;
};

export function CanvasRoot({
  objects,
  width,
  height,
  background,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  onBeginInteraction,
  onCommitInteraction,
}: CanvasRootProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<DragState | null>(null);

  const sortedObjects = [...objects].sort(
    (a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0),
  );

  function handleDragStart(
    event: ReactPointerEvent<SVGElement>,
    objectId: string,
    dragMode: ArrowDragMode = "move",
  ) {
    const object = objects.find((item) => item.id === objectId);
    if (!object || object.locked) {
      return;
    }

    onBeginInteraction?.();

    dragRef.current = {
      objectId,
      pointerId: event.pointerId,
      objectType: object.type,
      dragMode,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: object.x,
      startY: object.y,
      startX2: object.type === "arrow" ? object.x2 : undefined,
      startY2: object.type === "arrow" ? object.y2 : undefined,
      moved: false,
    };

    svgRef.current?.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    if (!dragRef.current || !onUpdateObject) {
      return;
    }

    const dx = event.clientX - dragRef.current.startClientX;
    const dy = event.clientY - dragRef.current.startClientY;

    if (dx !== 0 || dy !== 0) {
      dragRef.current.moved = true;
    }

    if (dragRef.current.objectType === "arrow") {
      if (dragRef.current.dragMode === "arrow-start") {
        onUpdateObject(dragRef.current.objectId, {
          x: dragRef.current.startX + dx,
          y: dragRef.current.startY + dy,
        });
        return;
      }

      if (dragRef.current.dragMode === "arrow-end") {
        onUpdateObject(dragRef.current.objectId, {
          x2: (dragRef.current.startX2 ?? 0) + dx,
          y2: (dragRef.current.startY2 ?? 0) + dy,
        });
        return;
      }

      onUpdateObject(dragRef.current.objectId, {
        x: dragRef.current.startX + dx,
        y: dragRef.current.startY + dy,
        x2: (dragRef.current.startX2 ?? 0) + dx,
        y2: (dragRef.current.startY2 ?? 0) + dy,
      });
      return;
    }

    onUpdateObject(dragRef.current.objectId, {
      x: dragRef.current.startX + dx,
      y: dragRef.current.startY + dy,
    });
  }

  function handlePointerEnd() {
    if (!dragRef.current) {
      return;
    }

    if (svgRef.current?.hasPointerCapture?.(dragRef.current.pointerId)) {
      svgRef.current.releasePointerCapture(dragRef.current.pointerId);
    }

    dragRef.current = null;
    onCommitInteraction?.();
  }

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{
        display: "block",
        background,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onSelectObject(null);
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {sortedObjects.map((object) => (
        <SceneObjectRenderer
          key={object.id}
          object={object}
          selected={object.id === selectedObjectId}
          onSelect={onSelectObject}
          onDragStart={handleDragStart}
        />
      ))}
    </svg>
  );
}
