import type { PointerEvent as ReactPointerEvent } from "react";
import type { RegionObject } from "../../domain/objects/objectTypes";

interface RegionRendererProps {
  object: RegionObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGGElement>,
    objectId: string,
  ) => void;
}

export function RegionRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: RegionRendererProps) {
  if (!object.visible) return null;

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
        width={object.width ?? 0}
        height={object.height ?? 0}
        rx={12}
        ry={12}
        fill={object.backgroundStyle ?? "#E8F2FF"}
        stroke={selected ? "#2563eb" : "#94a3b8"}
        strokeWidth={selected ? 2.5 : 1.5}
        strokeDasharray={object.regionRole === "custom" ? "8 6" : undefined}
      />
      <text
        x={object.x + 12}
        y={object.y + 24}
        fontSize={14}
        fontWeight="600"
        fill="#1e293b"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: "none",
        }}
      >
        {object.label}
      </text>
    </g>
  );
}
