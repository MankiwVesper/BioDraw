import type { PointerEvent as ReactPointerEvent } from "react";
import type { ParticleObject } from "../../domain/objects/objectTypes";

interface ParticleRendererProps {
  object: ParticleObject;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onDragStart?: (
    event: ReactPointerEvent<SVGGElement>,
    objectId: string,
  ) => void;
}

export function ParticleRenderer({
  object,
  selected,
  onSelect,
  onDragStart,
}: ParticleRendererProps) {
  if (!object.visible) return null;

  const circles = [];
  const count = Math.max(1, object.count);
  const gap = 24;

  for (let i = 0; i < count; i += 1) {
    const cx = object.x + (i % 3) * gap + 16;
    const cy = object.y + Math.floor(i / 3) * gap + 16;

    circles.push(
      <circle
        key={`${object.id}-${i}`}
        cx={cx}
        cy={cy}
        r={object.size / 2}
        fill={object.color}
        stroke={selected ? "#2563eb" : "#1e3a8a"}
        strokeWidth={selected ? 3 : 1}
      />,
    );
  }

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
      {circles}
      <text
        x={object.x}
        y={object.y - 10}
        fontSize={18}
        fill="#1f2937"
        fontWeight="600"
        style={{
          userSelect: "none",
          WebkitUserSelect: "none",
          pointerEvents: "none",
        }}
      >
        {object.label ?? object.particleName}
      </text>
    </g>
  );
}
