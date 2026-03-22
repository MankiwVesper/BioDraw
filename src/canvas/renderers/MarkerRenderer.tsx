import type { PointerEvent as ReactPointerEvent } from "react";
import type { MarkerObject } from "../../domain/objects/objectTypes";

interface MarkerRendererProps {
  object: MarkerObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGGElement>,
    objectId: string,
  ) => void;
}

export function MarkerRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: MarkerRendererProps) {
  if (!object.visible) return null;

  const width = object.width ?? 80;
  const height = object.height ?? 32;

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
        onDragStart?.(event, object.id);
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
        rx={8}
        fill={object.color ?? "#fbbf24"}
        stroke={selected ? "#2563eb" : "#b45309"}
        strokeWidth={selected ? 4 : 2}
      />
      <text
        x={object.x + width / 2}
        y={object.y + height / 2 + 5}
        textAnchor="middle"
        fontSize={16}
        fill="#111827"
        fontWeight="700"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: "none",
        }}
      >
        {object.text ?? object.markerType}
      </text>
    </g>
  );
}
