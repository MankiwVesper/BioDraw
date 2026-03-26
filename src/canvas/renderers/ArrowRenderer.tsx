import type { PointerEvent as ReactPointerEvent } from "react";
import type { ArrowObject } from "../../domain/objects/objectTypes";

type ArrowDragMode = "move" | "arrow-start" | "arrow-end";

interface ArrowRendererProps {
  object: ArrowObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGElement>,
    objectId: string,
    dragMode?: ArrowDragMode,
  ) => void;
}

function getArrowHeadPoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  size = 12,
) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const backX = x2 - Math.cos(angle) * size;
  const backY = y2 - Math.sin(angle) * size;
  const leftX = backX + Math.cos(angle + Math.PI / 2) * (size * 0.5);
  const leftY = backY + Math.sin(angle + Math.PI / 2) * (size * 0.5);
  const rightX = backX + Math.cos(angle - Math.PI / 2) * (size * 0.5);
  const rightY = backY + Math.sin(angle - Math.PI / 2) * (size * 0.5);

  return `${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`;
}

export function ArrowRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: ArrowRendererProps) {
  if (!object.visible) return null;

  const stroke = selected ? "#2563eb" : object.color;
  const strokeWidth = selected
    ? (object.lineWidth ?? 2) + 1
    : (object.lineWidth ?? 2);
  const dashArray = object.arrowStyle === "dashed" ? "8 6" : undefined;
  const headPoints = getArrowHeadPoints(
    object.x,
    object.y,
    object.x2,
    object.y2,
    14,
  );

  const labelX = (object.x + object.x2) / 2;
  const labelY = (object.y + object.y2) / 2 - 8;
  const handleRadius = 6;

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
      <line
        x1={object.x}
        y1={object.y}
        x2={object.x2}
        y2={object.y2}
        stroke="transparent"
        strokeWidth={Math.max(14, strokeWidth + 10)}
        strokeLinecap="round"
      />

      <line
        x1={object.x}
        y1={object.y}
        x2={object.x2}
        y2={object.y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
      />

      <polygon points={headPoints} fill={stroke} />

      {object.label ? (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          fontSize={14}
          fill="#1f2937"
          fontWeight="600"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            pointerEvents: "none",
          }}
        >
          {object.label}
        </text>
      ) : null}

      {selected ? (
        <>
          <circle
            cx={object.x}
            cy={object.y}
            r={handleRadius}
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth={2}
            style={{ cursor: object.locked ? "default" : "grab" }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSelect(object.id);
              onDragStart?.(event, object.id, "arrow-start");
            }}
          />
          <circle
            cx={object.x2}
            cy={object.y2}
            r={handleRadius}
            fill="#ffffff"
            stroke="#2563eb"
            strokeWidth={2}
            style={{ cursor: object.locked ? "default" : "grab" }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSelect(object.id);
              onDragStart?.(event, object.id, "arrow-end");
            }}
          />
        </>
      ) : null}
    </g>
  );
}
