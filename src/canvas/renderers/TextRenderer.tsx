import type { PointerEvent as ReactPointerEvent } from "react";
import type { TextObject } from "../../domain/objects/objectTypes";

interface TextRendererProps {
  object: TextObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGGElement>,
    objectId: string,
  ) => void;
}

export function TextRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: TextRendererProps) {
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
      <text
        x={object.x}
        y={object.y}
        fontSize={object.fontSize}
        fill={object.color}
        fontWeight={object.fontWeight ?? "normal"}
        textAnchor={
          object.align === "center"
            ? "middle"
            : object.align === "right"
              ? "end"
              : "start"
        }
        stroke={selected ? "#2563eb" : "none"}
        strokeWidth={selected ? 1 : 0}
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {object.text}
      </text>
    </g>
  );
}
