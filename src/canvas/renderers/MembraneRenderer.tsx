import type { PointerEvent as ReactPointerEvent } from "react";
import type { MembraneObject } from "../../domain/objects/objectTypes";

interface MembraneRendererProps {
  object: MembraneObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGElement>,
    objectId: string,
    dragMode?: "move" | "arrow-start" | "arrow-end",
  ) => void;
}

export function MembraneRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: MembraneRendererProps) {
  if (!object.visible) return null;

  const width = object.width ?? 240;
  const height = object.height ?? 64;

  return (
    <g
      onClick={(event) => {
        event.stopPropagation();
        onSelect(object.id);
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(object.id);
        onDragStart?.(event, object.id, "move");
      }}
      style={{
        cursor: object.locked ? "default" : "move",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <rect
        x={object.x}
        y={object.y}
        width={width}
        height={height}
        fill="#fef3c7"
        stroke={selected ? "#2563eb" : "#eab308"}
        strokeWidth={selected ? 4 : 2}
        rx="12"
      />

      {object.showBilayerDetail && (
        <>
          <line
            x1={object.x}
            y1={object.y + 18}
            x2={object.x + width}
            y2={object.y + 18}
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <line
            x1={object.x}
            y1={object.y + height - 18}
            x2={object.x + width}
            y2={object.y + height - 18}
            stroke="#f59e0b"
            strokeWidth="3"
          />
        </>
      )}

      {object.label && (
        <text
          x={object.x + width / 2}
          y={object.y + height / 2 + 6}
          textAnchor="middle"
          fontSize="20"
          fill="#92400e"
          fontWeight="700"
        >
          {object.label}
        </text>
      )}
    </g>
  );
}
